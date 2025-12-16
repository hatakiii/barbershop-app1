//api/services/route.ts
//Service catalog (Haircut, Beard trim гэх мэт)
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const salonid = Number(searchParams.get("salonId"));

//   if (!salonid) return NextResponse.json([]);

//   const salonServices = await prisma.salon_services.findMany({
//     where: { salonid },
//     include: { services: true },
//   });

//   return NextResponse.json(salonServices);
// }

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();

//     const newSalonService = await prisma.salon_services.create({
//       data: {
//         salonid: Number(body.salonId),
//         serviceid: Number(body.serviceId),
//         price: Number(body.price),
//       },
//     });

//     return NextResponse.json(newSalonService);
//   } catch (err) {
//     console.error("ERROR /api/salons/services POST:", err);
//     return NextResponse.json(
//       { error: "Failed to create salon service" },
//       { status: 500 }
//     );
//   }
// }

// GET: бүх service
export async function GET() {
  const services = await prisma.service.findMany({
    orderBy: { name: "asc" },
  });
  return NextResponse.json(services);
}

// POST: шинэ service
export async function POST(req: Request) {
  const { name } = await req.json();

  // console.log("name", name);

  if (!name?.trim()) {
    return NextResponse.json(
      { error: "Service name required" },
      { status: 400 }
    );
  }

  const service = await prisma.service.create({
    data: { name: name.trim() },
  });

  return NextResponse.json(service);
}
