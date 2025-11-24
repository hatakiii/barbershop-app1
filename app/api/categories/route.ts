import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: { services: true, barbers: true },
    });

    return NextResponse.json(categories, { status: 200 });
  } catch (err) {
    console.error("GET /categories ERROR:", err);

    return NextResponse.json(
      { error: "Failed to load categories" },
      { status: 500 }
    );
  }
}
