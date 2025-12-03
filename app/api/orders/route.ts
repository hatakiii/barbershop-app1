import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
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

    // Захиалгын datetime үүсгэх
    const reservedDatetime = new Date(`${reservedDate}T${reservedTime}:00Z`);

    // Prisma create ашиглах
    const order = await prisma.orders.create({
      data: {
        serviceId: serviceId, // ✅ camelCase
        barberId: barberId, // ✅ camelCase
        reservedDatetime: reservedDatetime, // ✅ camelCase
        totalprice: totalPrice,
        phonenumber: Number(phoneNumber),
      },
    });

    return NextResponse.json({ success: true, order });
  } catch (err: any) {
    console.error(err);
    if (err.code === "P2002") {
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
