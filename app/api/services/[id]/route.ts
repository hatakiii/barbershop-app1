import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json(); // { price: number }

    const updated = await prisma.salon_services.update({
      where: { id: Number(id) },
      data: {
        price: Number(body.price),
      },
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error("ERROR /api/services/[id] PUT:", err);
    return NextResponse.json(
      { error: "Failed to update salon service" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.salon_services.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("ERROR /api/services/[id] DELETE:", err);
    return NextResponse.json(
      { error: "Failed to delete salon service" },
      { status: 500 }
    );
  }
}
