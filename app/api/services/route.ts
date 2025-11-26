import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const salonId = Number(searchParams.get("salonId"));

  const services = await prisma.service.findMany({
    where: { salon_id: salonId },
  });

  return NextResponse.json(services);
}

export async function POST(req: Request) {
  const body = await req.json();

  const newService = await prisma.service.create({
    data: {
      name: body.name,
      price: body.price,
      salon_id: Number(body.salon_id),
    },
  });

  return NextResponse.json(newService);
}
