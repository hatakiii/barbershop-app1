import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Өнөөдрийн эхлэл, төгсгөл
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    // 1. Өнөөдрийн захиалгын тоо
    const todayOrdersCount = await prisma.orders.count({
      where: {
        reserveddatetime: {
          gte: startOfToday,
          lte: endOfToday,
        },
      },
    });

    // 2. Өнөөдөр захиалгатай (идэвхтэй) үсчдийн тоо
    const activeBarbers = await prisma.orders.findMany({
      where: {
        reserveddatetime: {
          gte: startOfToday,
          lte: endOfToday,
        },
      },
      select: {
        barberid: true,
      },
      distinct: ["barberid"],
    });

    // 3. Үйлчилгээний нийт тоо
    const servicesCount = await prisma.service.count();

    //4. Өнөөдрөөс хойшхи нийт захиалгын тоо
    const incomingOrdersCount = await prisma.orders.count({
      where: {
        reserveddatetime: {
          gte: startOfToday,
        },
      },
    });

    //5. Нийт үсчидийн тоо
    const allBarbersCount = await prisma.barber.count();

    return NextResponse.json({
      todayOrders: todayOrdersCount,
      activeBarbers: activeBarbers.length,
      services: servicesCount,
      incomingOrders: incomingOrdersCount,
      barbersCount: allBarbersCount,
    });
  } catch (error) {
    console.error("STATISTICS API ERROR:", error);
    return NextResponse.json(
      { message: "Статистик татах үед алдаа гарлаа" },
      { status: 500 }
    );
  }
}
