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

    // Content-Type проверлэх
    const contentType = req.headers.get("content-type");
    let name, salonAddress, salonImage, lat, lng;

    if (contentType?.includes("multipart/form-data")) {
      // FormData хэлбэрээр ирсэн бол
      const formData = await req.formData();
      name = formData.get("name") as string;
      salonAddress = formData.get("salonAddress") as string;
      const salonImageFile = formData.get("salonImage") as File | null;
      lat = formData.get("lat") as string;
      lng = formData.get("lng") as string;

      // Хэрвээ шинэ зураг байвал upload хийнэ
      if (salonImageFile) {
        salonImage = await uploadImageToCloudinary(salonImageFile);
      }
    } else {
      // JSON хэлбэрээр ирсэн бол
      const body = await req.json();
      name = body.name;
      salonAddress = body.salonAddress;
      salonImage = body.salonImage;
      lat = body.lat;
      lng = body.lng;
    }

    if (!name && !salonAddress && !salonImage && !lat && !lng) {
      return NextResponse.json(
        { error: "At least one field is required to update" },
        { status: 400 }
      );
    }

    const updateData: any = {};
    if (name) updateData.name = name;
    if (salonAddress) updateData.salonAddress = salonAddress;
    if (salonImage) updateData.salonImage = salonImage;
    if (lat !== undefined) updateData.lat = parseFloat(lat);
    if (lng !== undefined) updateData.lng = parseFloat(lng);

    const updatedSalon = await prisma.salon.update({
      where: { id: salonId },
      data: updateData,
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
