import React, { FC } from "react";
import Header from "./Header";
import { DataTable } from "../commons/DataTable";
import { columns } from "../ui/BillboardColumn";
import { BillboardColumn } from "@/components/ui/BillboardColumn";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";

interface BillboardsTableProps {
  storeId: string;
}

const BillboardsTable: FC<BillboardsTableProps> = async ({ storeId }) => {
  const billboard = await prisma.billboard.findMany({
    where: {
      storeId,
    },
  });
  const formattedBillboards: BillboardColumn[] = billboard.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div>
      <Header billboard={billboard} />
      <DataTable columns={columns} data={formattedBillboards} />
    </div>
  );
};

export default BillboardsTable;