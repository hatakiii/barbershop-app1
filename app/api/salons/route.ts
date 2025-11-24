import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { uploadImageToCloudinary } from "@/lib/utils/uploadImage";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const salonAddress = formData.get("salonAddress") as string;
    const salonImage = formData.get("salonImage") as File;

    if (!name || !salonAddress || !salonImage) {
      return NextResponse.json(
        { error: "Бүх талбарыг бөглөнө үү" },
        { status: 400 }
      );
    }

    // Cloudinary руу upload хийнэ
    const imageUrl = await uploadImageToCloudinary(salonImage);

    // Prisma ашиглаж Neon database руу хадгална
    const newCategory = await prisma.category.create({
      data: {
        name,
        salonAddress: salonAddress,
        salonImage: imageUrl,
      },
    });

    return NextResponse.json(newCategory, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 }
    );
  }
}
