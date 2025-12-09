import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { uploadImageToCloudinary } from "@/lib/utils/uploadImage";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const managerId = searchParams.get("managerId");

  // managerId-гаар салон шүүх
  if (managerId) {
    const manager = await prisma.user.findUnique({
      where: { id: Number(managerId) },
      select: { salon_id: true },
    });

    if (!managerId) {
      return NextResponse.json([], { status: 200 });
    }

    const salonId = manager?.salon_id;
    if (!salonId) {
      return NextResponse.json([], { status: 200 });
    }

    const salon = await prisma.salon.findUnique({
      where: { id: salonId },
      include: {
        barbers: true,
        salon_services: { include: { services: true } },
      },
    });
    return NextResponse.json(salon ? [salon] : [], { status: 200 });
  }

  // бүх салон
  const salons = await prisma.salon.findMany();
  return NextResponse.json(salons);
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const managerId = formData.get("managerId") as string | null;
    const name = formData.get("name") as string;
    const salonAddress = formData.get("salonAddress") as string;
    const salonImage = formData.get("salonImage") as File;
    const lat = formData.get("lat") as string;
    const lng = formData.get("lng") as string;

    if (!name || !salonAddress || !salonImage || !managerId) {
      return NextResponse.json(
        { error: "Бүх талбарыг бөглөнө үү" },
        { status: 400 }
      );
    }

    // Cloudinary руу upload хийнэ
    const imageUrl = await uploadImageToCloudinary(salonImage);

    // Prisma ашиглаж Neon database руу хадгална
    const newSalon = await prisma.salon.create({
      data: {
        name,
        salonAddress,
        salonImage: imageUrl,
        managerId: managerId.toString(),
        lat: lat ? parseFloat(lat) : undefined,
        lng: lng ? parseFloat(lng) : undefined,
      },
    });
    await prisma.user.update({
      where: { id: Number(managerId) },
      data: { salon_id: newSalon.id },
    });

    return NextResponse.json(newSalon, { status: 201 });
  } catch (err) {
    console.error("POST /salons ERROR:", err);

    return NextResponse.json(
      { error: "Салон нэмэхэд алдаа гарлаа!" },
      { status: 500 }
    );
  }
}
