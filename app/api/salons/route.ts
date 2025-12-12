import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { uploadImageToCloudinary } from "@/lib/utils/uploadImage";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId"); // login user ID frontend-аас дамжуулна

  if (userId) {
    // Login user-ийн салон авах
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
      select: { salon_id: true },
    });

    if (!user?.salon_id) return NextResponse.json([], { status: 200 });

    const salon = await prisma.salon.findUnique({
      where: { id: user.salon_id },
      include: {
        barbers: true,
        salon_services: { include: { services: true } },
      },
    });

    return NextResponse.json(salon ? [salon] : [], { status: 200 });
  }

  // Бүх салон авах (BookingPage)
  const salons = await prisma.salon.findMany({
    include: {
      barbers: true,
      salon_services: { include: { services: true } },
    },
  });

  return NextResponse.json(salons, { status: 200 });
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
        managerId: Number(managerId),
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
