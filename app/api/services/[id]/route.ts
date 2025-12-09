import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface Params {
  params: { id: string };
}

export async function PUT(req: Request, { params }: Params) {
  try {
    const id = Number(params.id);
    const body = await req.json(); // { price: number }

    const updated = await prisma.salon_services.update({
      where: { id },
      data: {
        price: Number(body.price),
      },
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error("ERROR /api/salons/services/[id] PUT:", err);
    return NextResponse.json(
      { error: "Failed to update salon service" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, { params }: Params) {
  try {
    const id = Number(params.id);
    await prisma.salon_services.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("ERROR /api/salons/services/[id] DELETE:", err);
    return NextResponse.json(
      { error: "Failed to delete salon service" },
      { status: 500 }
    );
  }
}
