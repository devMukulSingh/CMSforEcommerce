import React, { FC } from "react";
import Header from "./Header";
import { DataTable } from "../commons/DataTable";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { ProductClientCompProps } from "./ProductClientComp";
import { columns } from "../ui/ProductColumn";

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
    //@ts-ignore
    description: item?.description?.map((description: string) => description),
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
    ratings: item?.ratings,
    brand: item.brand.name,
  }));
  return (
    <div>
      <Header products={products} />
      <DataTable columns={columns} data={formattedProducts} />
    </div>
  );
};

export default ProductTable;
