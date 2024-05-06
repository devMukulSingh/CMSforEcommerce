import { prisma } from "@/lib/prisma";
import { cache } from "react";

export const getAllProducts = cache(async (storeId: string) => {
  const products = await prisma.product.findMany({
    where: {
      storeId,
      isArchived: false,
    },
  });
  return products.length;
});
