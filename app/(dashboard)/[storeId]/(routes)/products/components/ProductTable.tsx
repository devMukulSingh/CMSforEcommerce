import React, { FC } from "react";
import Header from "./Header";
import { DataTable } from "@/components/commons/DataTable";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { ProductClientCompProps } from "./ProductClientComp";
import { columns } from "@/components/ui/ProductColumn";

const ProductTable: FC<ProductClientCompProps> = async ({ storeId }) => {
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
  return (
    <>
      <Header products={products} />
      <DataTable columns={columns} data={formattedProducts} />
    </>
  );
};

export default ProductTable;
