import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { cache } from "react";

export const getFormattedProducts = cache(async (storeId: string) => {
  const products = await prisma.product.findMany({
    where: {
      storeId: storeId,
    },
    include: {
      category: true,
      size: true,
      color: true,
      brand: true,
    },
    orderBy:{
      createdAt:'desc'
    }
  });

  const formattedProducts = products.map((item) => ({
    id: item.id,
    name: item.name,
    price: item.price,
    category: item.category.name,
    color: item.color.value,
    quantity: item.quantity,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
    ratings: item?.ratings,
    brand: item.brand.name,
    //@ts-ignore
    description: item?.description?.map((description: string) => description),
  }));
  return formattedProducts;
});
