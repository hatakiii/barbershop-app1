//Одоохон энэ файл ашиглагдахгүй байна. Prisma дээр Orders гэсэн хүснэгт үүсгэх шаардлагатай.
// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();

//     const { salonId, serviceId, barberId, time, total } = body;

//     if (!salonId || !serviceId || !barberId || !time || !total) {
//       return NextResponse.json(
//         { error: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     const order = await prisma.order.create({
//       data: {
//         salonId,
//         serviceId,
//         barberId,
//         time,
//         total,
//       },
//     });

//     return NextResponse.json({ success: true, order });
//   } catch (e) {
//     console.log("ORDER ERROR", e);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }

// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const barberId = searchParams.get("barberId");

//   if (!barberId) return NextResponse.json({ orders: [] });

//   const orders = await prisma.order.findMany({
//     where: { barberId },
//     orderBy: { time: "asc" },
//   });

//   return NextResponse.json({ orders });
// }
