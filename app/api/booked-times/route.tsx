import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const barberId = Number(req.nextUrl.searchParams.get("barberId"));
    const date = req.nextUrl.searchParams.get("date"); // yyyy-MM-dd

    if (!barberId || !date) {
      return NextResponse.json({ error: "Missing params" }, { status: 400 });
    }

    const start = new Date(`${date}T00:00:00.000Z`);
    const end = new Date(`${date}T23:59:59.999Z`);

    const orders = await prisma.orders.findMany({
      where: {
        barberid: barberId,
        reserveddatetime: { gte: start, lte: end },
      },
    });

    const bookedTimes = orders.map((o) =>
      new Date(o.reserveddatetime).toISOString().slice(11, 16)
    ); // "HH:MM"

    return NextResponse.json({ bookedTimes });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
