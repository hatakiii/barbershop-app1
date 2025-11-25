import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface Params {
  id: string;
}

export async function DELETE(
  req: Request,
  { params }: { params: Params | Promise<Params> }
) {
  try {
    // params нь promise байж магадгүй тул await хийх
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    await prisma.salon.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Category deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("DELETE /categories/:id ERROR:", err);
    return NextResponse.json(
      { error: "Failed to delete category" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Params | Promise<Params> }
) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    const body = await req.json();
    const { name, salonAddress, salonImage } = body;

    if (!name && !salonAddress && !salonImage) {
      return NextResponse.json(
        { error: "At least one field is required to update" },
        { status: 400 }
      );
    }

    const updatedSalon = await prisma.salon.update({
      where: { id },
      data: {
        name,
        salonAddress,
        salonImage,
      },
    });

    return NextResponse.json(updatedSalon, { status: 200 });
  } catch (err) {
    console.error("PUT /categories/:id ERROR:", err);
    return NextResponse.json(
      { error: "Failed to update category" },
      { status: 500 }
    );
  }
}
