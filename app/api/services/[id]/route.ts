import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const updated = await prisma.service.update({
    where: { id: Number(params.id) },
    data: { name: body.name, price: body.price, salon_id: body.salon_id },
  });
  return NextResponse.json(updated);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const deleted = await prisma.service.delete({
    where: { id: Number(params.id) },
  });
  return NextResponse.json(deleted);
}
