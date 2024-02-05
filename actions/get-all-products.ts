import { prisma } from "@/lib/prisma"

export const getAllProducts = async() => {
    const products = await prisma.product.findMany({
        where:{
            isArchived:false,
        }
    });
    return products.length;
}