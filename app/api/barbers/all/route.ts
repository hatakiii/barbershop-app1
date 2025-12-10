//api/barbers/all/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Барбершоп дахь бүх үсчидийн мэдээллийг авах API
export async function GET() {
  try {
    const barbers = await prisma.barber.findMany();
    return NextResponse.json(barbers, { status: 200 });
  } catch (error) {
    console.error("GET /barbers/all ERROR:", error);
  }
}
