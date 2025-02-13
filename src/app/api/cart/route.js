import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

async function getSession(req) {
    const session = await getServerSession(req, authOptions);
    if (!session?.user?.id) {
        throw new Error("User not authenticated");
    }
    return session.user;
}

export async function GET(req) {
    try {
        const user = await getSession(req);  // Перевірка чи користувач автентифікований
        const cart = await PrismaClient.cart.findUnique({
            where: { userId: user.id },
            include: { items: true },
        });
        
        return new Response(JSON.stringify(cart), { status: 200 });
    } catch (error) {
        return new Response(error.message, { status: 403 });
    }
}

export async function POST(req) {
    try {
        const user = await getSession(req);  // Перевірка чи користувач автентифікований
        const { productId, quantity } = await req.json();

        // Перевірка чи продукт вже є в кошику
        const existingCartItem = await PrismaClient.cartItem.findFirst({
            where: { cartId: user.id, productId },
        });

        if (existingCartItem) {
            // Якщо товар є, оновлюємо кількість
            await PrismaClient.cartItem.update({
                where: { id: existingCartItem.id },
                data: { quantity: existingCartItem.quantity + quantity },
            });
        } else {
            // Якщо товару немає в кошику, додаємо новий
            const cart = await PrismaClient.cart.findUnique({
                where: { userId: user.id },
            });

            await PrismaClient.cartItem.create({
                data: {
                    productId,
                    cartId: cart.id,
                    quantity,
                },
            });
        }

        return new Response("Item added to cart", { status: 200 });
    } catch (error) {
        return new Response(error.message, { status: 403 });
    }
}

export async function DELETE(req) {
    try {
        const user = await getSession(req);  // Перевірка чи користувач автентифікований
        const { productId } = await req.json();
        
        // Видаляємо товар з кошика
        const cart = await PrismaClient.cart.findUnique({
            where: { userId: user.id },
        });

        await PrismaClient.cartItem.deleteMany({
            where: {
                cartId: cart.id,
                productId,
            },
        });

        return new Response("Item removed from cart", { status: 200 });
    } catch (error) {
        return new Response(error.message, { status: 403 });
    }
}
