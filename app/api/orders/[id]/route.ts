import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const id = Number(url.pathname.split("/").pop());

    if (!id || Number.isNaN(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid id" },
        { status: 400 }
      );
    }

    await prisma.orders.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE ERROR:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const url = new URL(req.url);
    const id = Number(url.pathname.split("/").pop());
    const { reserveddatetime } = await req.json();

    if (!id || !reserveddatetime) {
      return NextResponse.json(
        { success: false, message: "Invalid input" },
        { status: 400 }
      );
    }

    await prisma.orders.update({
      where: { id },
      data: {
        reserveddatetime: new Date(reserveddatetime),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
