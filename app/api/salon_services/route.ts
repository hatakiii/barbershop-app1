//api/services/route.ts
//Салонд зарагдаж буй үйлчилгээ + үнэ
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const salonId = Number(searchParams.get("salonId"));

  if (!salonId) return NextResponse.json([]);

  try {
    const salonServices = await prisma.salon_services.findMany({
      where: { salonid: salonId },
      include: { services: true }, // <-- services, service биш
    });
    return NextResponse.json(salonServices);
  } catch (err) {
    console.error("ERROR GET /api/salon_services:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json(); // { salonId, serviceId, price }

    const newSalonService = await prisma.salon_services.create({
      data: {
        salonid: Number(body.salonId),
        serviceid: Number(body.serviceId),
        price: Number(body.price),
      },
    });

    return NextResponse.json(newSalonService);
  } catch (err) {
    console.error("ERROR POST /api/salon_services:", err);
    return NextResponse.json(
      { error: "Failed to create salon service" },
      { status: 500 }
    );
  }
}
