import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function up() {
    const manCategory = await prisma.category.create({ data: { name: "Man" } });
    const womanCategory = await prisma.category.create({ data: { name: "Woman" } });

    await prisma.user.createMany({
        data: [
            {
                fullName: "User Test",
                email: "hasw@gmail.com",
                password: bcrypt.hashSync("11111", 10),
                verified: new Date(),
                role: "USER"
            },
            {
                fullName: "Admin",
                email: "admin@gmail.com",
                password: bcrypt.hashSync("11111", 10),
                verified: new Date(),
                role: "ADMIN"
            }
        ]
    });

    await prisma.product.createMany({
        data: [
            {
                name: "Heavy Jacket",
                imageUrl: "https://plus.unsplash.com/premium_photo-1670623042512-1a5ecebc3f42?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2ludGVyJTIwamFja2V0fGVufDB8fDB8fHww",
                categoryId: manCategory.id,
                price: 10000
            },
            {
                name: "Country Suit",
                imageUrl: "https://www.styleseat.com/blog/wp-content/uploads/2023/09/man-with-locs-walking-scaled-2-1140x850.jpg",
                categoryId: manCategory.id,
                price: 40000
            },
            {
                name: "Oversized Wool",
                imageUrl: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRmq_XMOUdiub4NMvbUR11AIlbkHYuSfU3DKqw0-GC7bwqSMZim",
                categoryId: womanCategory.id,
                price: 10000
            },
            {
                name: "Walker Jacket",
                imageUrl: "https://dz3aw12iizk17.cloudfront.net/cache/catalog/Pretty_Green/Pretty_green_walker_jacket_black_1-870x1110.jpg",
                categoryId: manCategory.id,
                price: 12000
            },
            {
                name: "Lace Necklace",
                imageUrl: "https://men.24tv.ua/resources/photos/news/202011/1458418.jpg?v=1661267032000",
                categoryId: manCategory.id,
                price: 5000
            },
            {
                name: "Relaxed Trousers",
                imageUrl: "https://www.jennikayne.com/cdn/shop/products/silk-relaxed-trouser-pant-navy-2.jpg?v=1677109564",
                categoryId: womanCategory.id,
                price: 8000
            }
        ]
    });

    await prisma.cart.createMany({
        data: [
            { userId: 1, token: "123" },
            { userId: 2, token: "2222" }
        ]
    });

    const user1Cart = await prisma.cart.findUnique({ where: { userId: 1 } });
    const user2Cart = await prisma.cart.findUnique({ where: { userId: 2 } });

    if (user1Cart && user2Cart) {
        await prisma.cartItem.createMany({
            data: [
                { cartId: user1Cart.id, productId: 2, quantity: 2 }, 
                { cartId: user1Cart.id, productId: 5, quantity: 1 }  
            ]
        });

        await prisma.cartItem.createMany({
            data: [
                { cartId: user2Cart.id, productId: 1, quantity: 1 }, 
                { cartId: user2Cart.id, productId: 3, quantity: 2 }
            ]
        });
    }
}

async function down() {
    await prisma.$executeRaw`TRUNCATE TABLE "CartItem", "Cart", "Order", "User", "Category", "Product" RESTART IDENTITY CASCADE`;
}

async function main() {
    try {
        await down();
        await up();
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
