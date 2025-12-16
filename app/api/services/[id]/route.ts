// app/api/services/[id]/route.ts

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const serviceId = Number(id);
  const { name } = await req.json();

  if (Number.isNaN(serviceId)) {
    return NextResponse.json({ error: "Invalid service id" }, { status: 400 });
  }

  if (!name?.trim()) {
    return NextResponse.json(
      { error: "Service name required" },
      { status: 400 }
    );
  }

  const updated = await prisma.service.update({
    where: { id: serviceId },
    data: { name: name.trim() },
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const serviceId = Number(id);

  if (Number.isNaN(serviceId)) {
    return NextResponse.json({ error: "Invalid service id" }, { status: 400 });
  }

  await prisma.service.delete({
    where: { id: serviceId },
  });

  return NextResponse.json({ success: true });
}
