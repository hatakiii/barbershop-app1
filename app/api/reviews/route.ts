import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    const { salonId, rating } = await req.json();

    if (!salonId || !rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { success: false, message: "Invalid data" },
        { status: 400 }
      );
    }

    const review = await prisma.reviews.upsert({
      where: {
        user_id_salon_id: {
          user_id: userId,
          salon_id: Number(salonId),
        },
      },
      update: {
        rating,
      },
      create: {
        user_id: userId,
        salon_id: Number(salonId),
        rating,
      },
    });

    return NextResponse.json({ success: true, review });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
