import React, { FC } from "react";
import Header from "./Header";
import { columns } from "@/components/ui/BrandColumn";
import { DataTable } from "@/components/commons/DataTable";
import { BrandClientCompProps } from "./BrandClientComp";
import { getBrands } from "@/actions/get-brands";

const BrandTable: FC<BrandClientCompProps> = async ({ storeId }) => {
  const brands = await getBrands(storeId);
  return (
    <>
      <Header brand={brands} />
      <DataTable columns={columns} data={brands} />
    </>
  );
};

export default BrandTable;
