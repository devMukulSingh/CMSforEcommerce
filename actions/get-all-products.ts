import { prisma } from "@/lib/prisma";
import { cache } from "react";

export const getAllProducts = cache(async (storeId: string) => {
  const products = await prisma.product.findMany({
    where: {
      storeId,
      isArchived: false,
    },
  });
  // const totalProducts = products.reduce( (prev,acc) => prev + acc.quantity , 0)
  // return totalProducts;
  return products.length;
});
