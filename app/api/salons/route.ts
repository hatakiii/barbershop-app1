import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { uploadImageToCloudinary } from "@/lib/utils/uploadImage";

export async function GET() {
  try {
    const salons = await prisma.salon.findMany({
      include: { services: true, barbers: true },
    });

    return NextResponse.json(salons, { status: 200 });
  } catch (err) {
    console.error("GET /categories ERROR:", err);

    return NextResponse.json(
      { error: "Салонууд татахад алдаа гарлаа!" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const managerId = formData.get("managerId") as string | null;
    const name = formData.get("name") as string;
    const salonAddress = formData.get("salonAddress") as string;
    const salonImage = formData.get("salonImage") as File;

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
      },
    });

    return NextResponse.json(newSalon, { status: 201 });
  } catch (err) {
    console.error("POST /categories ERROR:", err);

    return NextResponse.json(
      { error: "Салон нэмэхэд алдаа гарлаа!" },
      { status: 500 }
    );
  }
}
