import React, { FC } from "react";
import { DataTable } from "@/components/commons/DataTable";
import { columns } from "@/components/ui/CategoryColumn";
import { CategoriesClientCompProps } from "./CategoriesClientComp";
import Header from "./Header";
import { getCategories } from "@/actions/get-categories";

const CategoryTable: FC<CategoriesClientCompProps> = async ({ storeId }) => {
  const categories = await getCategories(storeId);
  return (
    <>
      <Header categories={categories} />
      <DataTable columns={columns} data={categories} />
    </>
  );
};

export default CategoryTable;
