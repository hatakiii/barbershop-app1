import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { uploadImageToCloudinary } from "@/lib/utils/uploadBarberImage";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const salonIdStr = url.searchParams.get("salonId");
    if (!salonIdStr) {
      return NextResponse.json(
        { error: "salonId заавал хэрэгтэй" },
        { status: 400 }
      );
    }
    const salonId = Number(salonIdStr);
    const barbers = await prisma.barber.findMany({
      where: { salon_id: salonId },
    });
    return NextResponse.json(barbers, { status: 200 });
  } catch (err) {
    console.error("GET /barbers ERROR:", err);
    return NextResponse.json(
      { error: "Үсчид татахад алдаа гарлаа" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const salonIdStr = formData.get("salonId") as string | null;
    if (!salonIdStr) {
      return NextResponse.json(
        { error: "salonId заавал хэрэгтэй" },
        { status: 400 }
      );
    }
    const name = formData.get("name") as string;
    const phoneNumber = formData.get("phoneNumber") as string | null;
    const barberImage = formData.get("barberImage") as File | null;
    const salonId = Number(salonIdStr);
    if (!salonId || !name) {
      return NextResponse.json(
        { error: "Салон болон нэр заавал хэрэгтэй" },
        { status: 400 }
      );
    }

    let avatarUrl: string | undefined = undefined;
    if (barberImage) {
      avatarUrl = await uploadImageToCloudinary(barberImage);
    }

    const newBarber = await prisma.barber.create({
      data: {
        name,
        phoneNumber: phoneNumber || "",
        avatarUrl,
        salon_id: salonId,
      },
    });

    return NextResponse.json(newBarber, { status: 201 });
  } catch (err) {
    console.error("POST /barbers ERROR:", err);
    return NextResponse.json(
      { error: "Үсчин нэмэхэд алдаа гарлаа" },
      { status: 500 }
    );
  }
}
