
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const barberId = Number(url.searchParams.get("barberId"));
    const dateStr = url.searchParams.get("date"); // YYYY-MM-DD

    if (!barberId || !dateStr) {
      return NextResponse.json({ error: "Барбер болон өдөр заавал хэрэгтэй" }, { status: 400 });
    }

    const startOfDay = new Date(dateStr + "T00:00:00.000Z");
    const endOfDay = new Date(dateStr + "T23:59:59.999Z");

    const orders = await prisma.orders.findMany({
      where: {
        barberid: barberId,
        reserveddatetime: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      include: {
        services: true, // service-ийн нэр авах
      },
    });

    const busyTimes = orders.map((o) => ({
      time: o.reserveddatetime.toISOString().slice(11, 16), // HH:MM
      serviceName: o.services.name,
      phonenumber: o.phonenumber,
      totalprice: o.totalprice,
    }));

   
    const allTimes = [
      "09:00","09:30","10:00","10:30","11:00","11:30",
      "12:00","12:30","13:00","13:30","14:00","14:30",
      "15:00","15:30","16:00","16:30","17:00","17:30"
    ];
    const freeTimes = allTimes.filter(t => !busyTimes.find(b => b.time === t));

    return NextResponse.json({ busyTimes, freeTimes });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Алдаа гарлаа" }, { status: 500 });
  }
}
