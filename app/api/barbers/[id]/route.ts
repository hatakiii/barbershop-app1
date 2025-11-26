import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { uploadImageToCloudinary } from "@/lib/utils/uploadBarberImage";

export async function PUT(req: Request) {
  try {
    const url = new URL(req.url);
    const barberIdStr = req.url.split("/").pop();

    if (!barberIdStr)
      return NextResponse.json(
        { error: "Барберийн id хэрэгтэй" },
        { status: 400 }
      );

    const barberId = Number(barberIdStr); // string -> number

    const formData = await req.formData();
    const name = formData.get("name") as string | null;
    const phoneNumber = formData.get("phoneNumber") as string | null;
    const barberImage = formData.get("barberImage") as File | null;

    const updateData: any = {};
    if (name) updateData.name = name;
    if (phoneNumber) updateData.phoneNumber = phoneNumber;
    if (barberImage) {
      const avatarUrl = await uploadImageToCloudinary(barberImage);
      updateData.avatarUrl = avatarUrl;
    }

    const updatedBarber = await prisma.barber.update({
      where: { id: barberId },
      data: updateData,
    });

    return NextResponse.json(updatedBarber, { status: 200 });
  } catch (err) {
    console.error("PUT /barbers ERROR:", err);
    return NextResponse.json(
      { error: "Үсчин шинэчлэхэд алдаа гарлаа" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const barberIdStr = req.url.split("/").pop();
    if (!barberIdStr)
      return NextResponse.json(
        { error: "Барберийн id хэрэгтэй" },
        { status: 400 }
      );

    const barberId = Number(barberIdStr); // string -> number

    await prisma.barber.delete({ where: { id: barberId } });
    return NextResponse.json(
      { message: "Үсчин амжилттай устлаа" },
      { status: 200 }
    );
  } catch (err) {
    console.error("DELETE /barbers ERROR:", err);
    return NextResponse.json(
      { error: "Үсчин устгахад алдаа гарлаа" },
      { status: 500 }
    );
  }
}
