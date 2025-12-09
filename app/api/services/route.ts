import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const salonid = Number(searchParams.get("salonId"));

  if (!salonid) return NextResponse.json([]);

  const salonServices = await prisma.salon_services.findMany({
    where: { salonid },
    include: { service: true },
  });

  return NextResponse.json(salonServices);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const newSalonService = await prisma.salon_services.create({
      data: {
        salonid: Number(body.salonId),
        serviceid: Number(body.serviceId),
        price: Number(body.price),
      },
    });

    return NextResponse.json(newSalonService);
  } catch (err) {
    console.error("ERROR /api/salons/services POST:", err);
    return NextResponse.json(
      { error: "Failed to create salon service" },
      { status: 500 }
    );
  }
}
