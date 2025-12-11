import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// DELETE
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Next.js 14+ дээр params нь Promise байж болно
    const params = await context.params; // <--- await ашиглах
    const id = Number(params.id);

    if (isNaN(id)) {
      return NextResponse.json({ error: "ID буруу байна" }, { status: 400 });
    }

    const deleted = await prisma.salon_services.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, deleted });
  } catch (err) {
    console.error("ERROR DELETE /api/salon_services/[id]:", err);
    return NextResponse.json(
      { error: "Failed to delete salon service" },
      { status: 500 }
    );
  }
}

// PUT
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const id = Number(params.id);
    const body = await req.json();

    if (isNaN(id)) {
      return NextResponse.json({ error: "ID буруу байна" }, { status: 400 });
    }

    const updated = await prisma.salon_services.update({
      where: { id },
      data: { price: Number(body.price) },
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error("ERROR PUT /api/salon_services/[id]:", err);
    return NextResponse.json(
      { error: "Failed to update salon service" },
      { status: 500 }
    );
  }
}
