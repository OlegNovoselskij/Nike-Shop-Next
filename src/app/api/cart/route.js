import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

async function getSession(req) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        throw new Error("User not authenticated");
    }
    return session.user;
}

export async function GET(req) {
    try {
        const user = await getSession(req);
        const cart = await prisma.cart.findUnique({
            where: { userId: user.id },
            include: { items: true },
        });

        return NextResponse.json(cart);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 403 });
    }
}

export async function POST(req) {
    try {
        const user = await getSession(req);
        const { productId, quantity } = await req.json();

        const existingCartItem = await prisma.cartItem.findFirst({
            where: { cartId: user.id, productId },
        });

        if (existingCartItem) {
            await prisma.cartItem.update({
                where: { id: existingCartItem.id },
                data: { quantity: existingCartItem.quantity + quantity },
            });
        } else {
            const cart = await prisma.cart.findUnique({
                where: { userId: user.id },
            });

            await prisma.cartItem.create({
                data: {
                    productId,
                    cartId: cart.id,
                    quantity,
                },
            });
        }

        return NextResponse.json({ message: "Item added to cart" });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 403 });
    }
}

export async function DELETE(req) {
    try {
        const user = await getSession(req);
        const { productId } = await req.json();

        const cart = await prisma.cart.findUnique({
            where: { userId: user.id },
        });

        await prisma.cartItem.deleteMany({
            where: {
                cartId: cart.id,
                productId,
            },
        });

        return NextResponse.json({ message: "Item removed from cart" });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 403 });
    }
}
