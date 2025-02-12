import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req, { params }) {
    const { slug } = params;
    console.log("Fetching product with slug:", slug);

    try {
        const product = await prisma.product.findUnique({
            where: { id: parseInt(slug) },
        });

        if (!product) {
            console.log("Product not found");
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        return NextResponse.json(product);
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
