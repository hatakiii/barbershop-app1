// File: /app/api/orders/barber/all/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const barberQuery = url.searchParams.get("barberId")?.trim();

    // console.log("barberQuery", barberQuery);

    if (!barberQuery) {
      return NextResponse.json(
        { success: false, error: "Барбер id эсвэл нэр шаардлагатай" },
        { status: 400 }
      );
    }

    // Determine if query is numeric id or a name
    let whereClause: any;
    if (/^\d+$/.test(barberQuery)) {
      // numeric id
      whereClause = { barberid: Number(barberQuery) };
    } else {
      // treat as name (partial, case-insensitive) -> find matching barber ids
      const matchingBarbers = await prisma.barber.findMany({
        where: { name: { contains: barberQuery, mode: "insensitive" } },
        select: { id: true },
      });

      if (!matchingBarbers || matchingBarbers.length === 0) {
        return NextResponse.json({ success: true, orders: [] });
      }

      const ids = matchingBarbers.map((b) => b.id);
      whereClause = { barberid: { in: ids } };
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
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
