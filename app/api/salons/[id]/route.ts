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
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    // 1️⃣ Холбоотой өгөгдөл шалгах
    // const relatedUsers = await prisma.user.findMany({
    //   where: { salon_id: id },
    //   select: { id: true, name: true, email: true },
    // });

    const relatedBarbers = await prisma.barber.findMany({
      where: { salon_id: id },
      select: { id: true, name: true },
    });

    const relatedServices = await prisma.salon_services.findMany({
      where: { salonid: id },
      select: {
        id: true,
        price: true,
        services: {
          select: { id: true, name: true },
        },
      },
    });

    console.log(
      "relatedBarbers, relatedServices, relatedUsers",
      relatedBarbers,
      relatedServices
    );

    // 2️⃣ Хэрэв ямар нэгэн хамаарал байвал буцаах
    if (relatedBarbers.length > 0 || relatedServices.length > 0) {
      return NextResponse.json(
        {
          error: "Энэ салон дараах өгөгдлүүдтэй холбоотой тул устгах боломжгүй",
          relations: {
            barbers: relatedBarbers,
            services: relatedServices,
          },
        },
        { status: 409 }
      );
    }

    // 3️⃣ Хэрэв хамаарал байхгүй бол устгана
    await prisma.salon.delete({ where: { id } });

    return NextResponse.json(
      { message: "Salon deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Delete Salon Error:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
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
  { params }: { params: Params | Promise<Params> }
) {
  // params may be a Promise (depending on Next.js internals), so await it
  const resolvedParams = await params;
  const id = resolvedParams.id;

  console.log({ id });

  if (!id || isNaN(Number(id))) {
    return NextResponse.json({ error: "Invalid salon id" }, { status: 400 });
  }

  try {
    const salon = await prisma.salon.findUnique({
      where: { id: Number(id) },
      include: {
        barbers: true,
        salon_services: { include: { services: true } },
      },
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
