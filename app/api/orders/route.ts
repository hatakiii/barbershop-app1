import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { salonId, serviceId, barberId, time, total } = body;

    console.log(
      "Body dotorh ni zov irj bny",
      salonId,
      serviceId,
      barberId,
      time,
      total
    );

    if (!salonId || !serviceId || !barberId || !time || !total) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // const order = await prisma.orders.create({
    //   data: {
    //     salonId,
    //     serviceId,
    //     barberId,
    //     time,
    //     total,
    //   },
    // });

    // return NextResponse.json({ success: true, order });
  } catch (e) {
    console.log("ORDER ERROR", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const barberId = searchParams.get("barberId");

  if (!barberId) return NextResponse.json({ orders: [] });

  //   const orders = await prisma.orders.findMany({
  //     where: { barberId },
  //     orderBy: { time: "asc" },
  //   });

  //   return NextResponse.json({ orders });
}
