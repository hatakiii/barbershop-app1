//api/barbers/all/[id]/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const barber = await prisma.barber.findUnique({
      where: { id: Number(id) },
    });

    if (!barber) {
      return NextResponse.json(
        { message: "Barber not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(barber, { status: 200 });
  } catch (error) {
    console.error("GET /barbers/[id] ERROR:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
