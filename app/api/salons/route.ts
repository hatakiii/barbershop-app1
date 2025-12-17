import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { uploadImageToCloudinary } from "@/lib/utils/uploadImage";

export async function GET(req: Request) {
  const salons = await prisma.salon.findMany({
    include: {
      reviews: {
        select: {
          rating: true,
        },
      },
    },
  });

  // ⭐ avg rating + review count бодож normalize хийнэ
  const formattedSalons = salons.map((salon) => {
    const ratings = salon.reviews.map((r) => r.rating);
    const reviewCount = ratings.length;
    const avgRating =
      reviewCount > 0 ? ratings.reduce((a, b) => a + b, 0) / reviewCount : 0;

    return {
      id: salon.id,
      name: salon.name,
      salonAddress: salon.salonAddress,
      salonImage: salon.salonImage,
      avgRating,
      reviewCount,
    };
  });

  return NextResponse.json(formattedSalons, { status: 200 });
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

    if (!name || !salonAddress || !salonImage || !lat || !lng) {
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

        lat: lat ? parseFloat(lat) : undefined,
        lng: lng ? parseFloat(lng) : undefined,
      },
    });
    // await prisma.user.update({
    //   where: { id: Number(managerId) },
    //   data: { salon_id: newSalon.id },
    // });

    return NextResponse.json(newSalon, { status: 201 });
  } catch (err) {
    console.error("POST /salons ERROR:", err);

    return NextResponse.json(
      { error: "Салон нэмэхэд алдаа гарлаа!" },
      { status: 500 }
    );
  }
}
