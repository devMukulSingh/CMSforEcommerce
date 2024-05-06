import { CategoryColumn } from "@/components/ui/CategoryColumn";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { cache } from "react";

export const getCategories = cache(async (storeId: string) => {
  const categories = await prisma.category.findMany({
    where: {
      storeId: storeId,
    },
    include: {
      billboard: true,
    },
  });
  const formattedCategories: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
    billboardLabel: item?.billboard?.label,
  }));
  return formattedCategories;
});
