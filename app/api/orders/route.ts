import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server"; // ← Зөв импорт

// ---------------- POST: Цаг авах ----------------
export async function POST(req: NextRequest) {
  try {
    const { userId } = getAuth(req); // Clerk user ID-г авна

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Login required" },
        { status: 401 }
      );
    }

    const {
      salonId,
      serviceId,
      barberId,
      reservedDate,
      reservedTime,
      totalPrice,
      phoneNumber,
    } = await req.json();

    if (
      !salonId ||
      !serviceId ||
      !barberId ||
      !reservedDate ||
      !reservedTime ||
      !totalPrice ||
      !phoneNumber
    ) {
      return NextResponse.json(
        { success: false, error: "Мэдээлэл дутуу байна" },
        { status: 400 }
      );
    }

    const reservedDatetime = new Date(`${reservedDate}T${reservedTime}:00Z`);

    const order = await prisma.orders.create({
      data: {
        salonid: Number(salonId),
        serviceid: Number(serviceId),
        barberid: Number(barberId),
        reserveddatetime: reservedDatetime,
        totalprice: Number(totalPrice),
        phonenumber: Number(phoneNumber),
        clerkUserId: userId,
      },
    });

    return NextResponse.json({ success: true, order });
  } catch (err: any) {
    console.error(err);
    if (err?.code === "P2002") {
      return NextResponse.json(
        { success: false, error: "Энэ цаг аль хэдийн захиалагдсан" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}

// ---------------- GET: Захиалга авах ----------------
export async function GET(req: NextRequest) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Login required" },
        { status: 401 }
      );
    }

    const orders = await prisma.orders.findMany({
      where: { clerkUserId: userId },
      include: {
        services: true,
        barbers: true,
        salons: true,
      },
      orderBy: { reserveddatetime: "desc" },
    });

    return NextResponse.json({ success: true, orders });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
