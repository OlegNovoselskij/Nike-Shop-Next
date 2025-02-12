import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const users = await prisma.user.findMany();
        return NextResponse.json(users);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const body = await req.json();

        if (!body.fullName || !body.email || !body.password) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(body.password, 10);

        const newUser = await prisma.user.create({
            data: {
                fullName: body.fullName,
                email: body.email,
                password: hashedPassword,
            },
        });

        return NextResponse.json({ message: "User created", user: newUser }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
    }
}

process.on("beforeExit", async () => {
    await prisma.$disconnect();
});
