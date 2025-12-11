import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> } // Await params
) {
  try {
    const { id } = await context.params; // Await the params

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
    console.error("GET /barbers/all/[id] ERROR:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
