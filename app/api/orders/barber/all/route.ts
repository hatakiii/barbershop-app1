import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const q = url.searchParams.get("q")?.trim();

    console.log("q orj irj bnu", q);

    if (!q) {
      return NextResponse.json(
        { success: false, error: "Барберийн ID, нэр эсвэл утас шаардлагатай" },
        { status: 400 }
      );
    }

    let whereClause: any;

    // 1. Numeric → ID эсвэл phoneNumber байж магадгүй
    if (/^\d+$/.test(q)) {
      // Эхлээд barberId гэж үзээд захиалга хайна
      const byId = await prisma.orders.findFirst({
        where: { barberid: Number(q) },
        select: { id: true },
      });

      if (byId) {
        whereClause = { barberid: Number(q) };
      } else {
        // ID биш бол phoneNumber гэж үзнэ
        const barber = await prisma.barber.findFirst({
          where: { phoneNumber: q },
          select: { id: true },
        });

        if (!barber) {
          return NextResponse.json({ success: true, orders: [] });
        }

        whereClause = { barberid: barber.id };
      }
    } else {
      // 2. Text → нэрээр хайх
      const barbers = await prisma.barber.findMany({
        where: {
          name: { contains: q, mode: "insensitive" },
        },
        select: { id: true },
      });

      if (barbers.length === 0) {
        return NextResponse.json({ success: true, orders: [] });
      }

      whereClause = {
        barberid: { in: barbers.map((b) => b.id) },
      };
    }

    const orders = await prisma.orders.findMany({
      where: whereClause,
      include: {
        services: true,
        salons: true,
        barbers: true,
      },
      orderBy: { reserveddatetime: "desc" },
    });

    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error("orders/barber/all error:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
