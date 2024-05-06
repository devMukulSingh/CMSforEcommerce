import React, { cache, FC } from "react";
import Header from "./Header";
import { DataTable } from "@/components/commons/DataTable";
import { columns } from "@/components/ui/BillboardColumn";
import { getBillboards } from "@/actions/get-billboards";

interface BillboardsTableProps {
  storeId: string;
}

const BillboardsTable: FC<BillboardsTableProps> = async ({ storeId }) => {
  const billboard = await getBillboards(storeId);
  return (
    <>
      <Header billboard={billboard} />
      <DataTable columns={columns} data={billboard} />
    </>
  );
};

export default BillboardsTable;
