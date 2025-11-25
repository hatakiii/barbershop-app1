import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    const users = await prisma.user.findMany();

    return NextResponse.json(users);
}

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 400 }
            );
        }

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json(
                { error: "Invalid email or password" },
                { status: 401 }
            );
        }

        return NextResponse.json({
            role: user.role,
            name: user.name,
            email: user.email,
            salonId: user.salon_id,
            barberId: user.barberId
        });
    } catch (error) {
        console.error("POST /users ERROR:", error);
        return NextResponse.json(
            { error: "Failed to verify credentials" },
            { status: 500 }
        );
    }
}
