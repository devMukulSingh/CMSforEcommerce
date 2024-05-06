import { cache } from "react";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";

export const getBillboards = cache(async (storeId: string) => {
  const billboard = await prisma.billboard.findMany({
    where: {
      storeId,
    },
  });
  const formattedBillboards = billboard.map((item) => ({
    id: item.id,
    name: item.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return formattedBillboards;
});
