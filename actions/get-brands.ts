import { BrandColumn } from "@/components/ui/BrandColumn";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { cache } from "react";

export const getBrands = cache(async (storeId: string) => {
  const brands = await prisma.brand.findMany({
    where: {
      storeId: storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const formattedbrands: BrandColumn[] = brands.map((item) => ({
    id: item.id,
    name: item.name,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return formattedbrands;
});
