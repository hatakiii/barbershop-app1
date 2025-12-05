import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { uploadImageToCloudinary } from "@/lib/utils/uploadImage";

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
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const salonId = Number(id);

    if (!salonId) {
      return NextResponse.json({ error: "Invalid salon ID" }, { status: 400 });
    }

    const formData = await req.formData();
    const name = formData.get("name")?.toString();
    const salonAddress = formData.get("salonAddress")?.toString();
    const salonImageFile = formData.get("salonImage") as File | null;

    let salonImageUrl: string | undefined;
    if (salonImageFile && salonImageFile.size > 0) {
      salonImageUrl = await uploadImageToCloudinary(salonImageFile);
      console.log("Cloudinary link:", salonImageUrl);
    }

    const updatedSalon = await prisma.salon.update({
      where: { id: salonId },
      data: {
        ...(name ? { name } : {}),
        ...(salonAddress ? { salonAddress } : {}),
        ...(salonImageUrl ? { salonImage: salonImageUrl } : {}),
      },
    });

    return NextResponse.json(updatedSalon);
  } catch (err) {
    console.error("PUT /api/salons/[id] ERROR:", err);
    return NextResponse.json(
      { error: "Салон шинэчлэхэд алдаа гарлаа!" },
      { status: 500 }
    );
  }
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  console.log({ id });

  if (!id || isNaN(Number(id))) {
    return NextResponse.json({ error: "Invalid salon id" }, { status: 400 });
  }

  try {
    const salon = await prisma.salon.findUnique({
      where: { id: Number(id) },
      include: { services: true, barbers: true },
    });

    if (!salon) {
      return NextResponse.json({ error: "Salon not found" }, { status: 404 });
    }

    return NextResponse.json(salon);
  } catch (err) {
    console.error("Fetch salon error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
