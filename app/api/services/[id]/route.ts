import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const { name } = await req.json();

  if (!name?.trim()) {
    return NextResponse.json(
      { error: "Service name required" },
      { status: 400 }
    );
  }

  const updated = await prisma.service.update({
    where: { id },
    data: { name: name.trim() },
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);

  await prisma.service.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}
