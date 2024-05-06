import React, { FC } from "react";
import Header from "./Header";
import { DataTable } from "@/components/commons/DataTable";
import { ProductClientCompProps } from "./ProductClientComp";
import { columns } from "@/components/ui/ProductColumn";
import { getFormattedProducts } from "@/actions/get-formatted-products";

const ProductTable: FC<ProductClientCompProps> = async ({ storeId }) => {
    const products = await getFormattedProducts(storeId);
  return (
    <>
      <Header products={products} />
      <DataTable columns={columns} data={products} />
    </>
  );
};

export default ProductTable;
