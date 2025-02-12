import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export async function GET(req) {
    const query = req.nextUrl.searchParams.get("query") || "";
    const products = await prisma.product.findMany({
        where: {
            name: {
                contains: query,
                mode: "insensitive",
            },
        },
        take: 5,
    })
    return NextResponse.json(products);
}