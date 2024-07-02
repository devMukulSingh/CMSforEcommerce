import { ColorColumn } from "@/components/ui/ColorColumn";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { cache } from "react";

export const getColors = cache(async (storeId: string) => {
  const colors = await prisma.color.findMany({
    where: {
      storeId: storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const formattedcolors: ColorColumn[] = colors.map((item) => ({
    id: item.id,
    value: item.value,
    name: item.name,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return formattedcolors;
});
