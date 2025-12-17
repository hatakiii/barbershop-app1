import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const barberId = Number(searchParams.get("barberId"));
  const date = searchParams.get("date"); // yyyy-MM-dd

  if (!barberId || !date) {
    return NextResponse.json({ bookedTimes: [] });
  }

  // UTC day range
  const startUTC = new Date(`${date}T00:00:00+08:00`).toISOString();
  const endUTC = new Date(`${date}T23:59:59+08:00`).toISOString();

  const orders = await prisma.orders.findMany({
    where: {
      barberid: barberId,
      reserveddatetime: {
        gte: startUTC,
        lte: endUTC,
      },
    },
  });

  // 👉 UTC → LOCAL (Asia/Ulaanbaatar)
  const bookedTimes = orders.map((order) =>
    new Date(order.reserveddatetime).toLocaleTimeString("en-GB", {
      timeZone: "Asia/Ulaanbaatar",
      hour: "2-digit",
      minute: "2-digit",
    })
  );

  return NextResponse.json({ bookedTimes });
}
