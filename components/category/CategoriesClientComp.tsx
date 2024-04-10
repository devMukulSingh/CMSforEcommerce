"use client";

import { PlusCircle } from "lucide-react";
import { Button } from "../ui/button";
import { useParams, useRouter } from "next/navigation";
import { DataTable } from "../commons/DataTable";
import { CategoryColumn, columns } from "../ui/CategoryColumn";
import ApiList from "../commons/ApiList";
import { Separator } from "../ui/separator";

interface CategoriesClientCompProps {
  categories: CategoryColumn[];
}

const CategoriesClientComp: React.FC<CategoriesClientCompProps> = ({
  categories,
}) => {
  const params = useParams();
  const { storeId } = params;
  const router = useRouter();

  return (
    <main className="flex flex-col gap-4 p-5">
      <header className="flex justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            Categories({categories.length})
          </h1>
          <p className="text-sm text-slate-500">Manage Categories</p>
        </div>
        <Button
          onClick={() => router.push(`/${storeId}/categories/new`)}
          className="flex gap-2"
        >
          <PlusCircle />
          Add New
        </Button>
      </header>
      <DataTable columns={columns} data={categories} />
      <Separator />
      <ApiList entityIdName="{categoryId}" entityName="category" />
    </main>
  );
};

export default CategoriesClientComp;
