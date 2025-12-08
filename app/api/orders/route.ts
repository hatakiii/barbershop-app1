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
    // const order = await prisma.orders.create({
    //   data: {
    //     serviceId: serviceId, // ✅ camelCase
    //     barberId: barberId, // ✅ camelCase
    //     reserveddatetime: reservedDatetime, // ✅ camelCase
    //     totalprice: totalPrice,
    //     phonenumber: Number(phoneNumber),
    //   },
    // });

    const order = await prisma.orders.create({
      data: {
        salonid: Number(salonId),
        serviceid: Number(serviceId),
        barberid: Number(barberId),
        reserveddatetime: reservedDatetime,
        totalprice: Number(totalPrice),
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

export async function GET(req: NextRequest) {
  try {
    const phone = req.nextUrl.searchParams.get("phone");
    if (!phone) {
      return NextResponse.json(
        { success: false, error: "Phone number required" },
        { status: 400 }
      );
    }

    const history = await prisma.orders.findMany({
      where: { phonenumber: Number(phone) },
      include: {
        services: true,
        barbers: true,
        salons: true,
      },
      orderBy: { reserveddatetime: "desc" },
    });

    return NextResponse.json({ success: true, history });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
