import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(req: Request) {
  const serviceIdStr = req.url.split("/").pop();
  if (!serviceIdStr)
    return NextResponse.json({ error: "Service id хэрэгтэй" }, { status: 400 });
  const serviceId = Number(serviceIdStr);

  const body = await req.json();
  const updated = await prisma.service.update({
    where: { id: serviceId },
    data: {
      name: body.name,
      price: body.price,
      gender: body.gender,
      salon_id: body.salon_id,
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(req: Request) {
  const serviceIdStr = req.url.split("/").pop();
  if (!serviceIdStr)
    return NextResponse.json({ error: "Service id хэрэгтэй" }, { status: 400 });
  const serviceId = Number(serviceIdStr);

  await prisma.service.delete({ where: { id: serviceId } });
  return NextResponse.json({ message: "Амжилттай устлаа" });
}
