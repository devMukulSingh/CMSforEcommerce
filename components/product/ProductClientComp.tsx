"use client";

import { PlusCircle } from "lucide-react";
import { Button } from "../ui/button";
import { useParams, useRouter } from "next/navigation";
import { DataTable } from "../commons/DataTable";
import { ProductColumn, columns } from "../ui/ProductColumn";
import ApiList from "../commons/ApiList";
import { Separator } from "../ui/separator";

interface ProductClientCompProps {
  products: ProductColumn[];
}

const ProductClientComp: React.FC<ProductClientCompProps> = ({ products }) => {
  const { storeId } = useParams();
  const router = useRouter();
  return (
    <main className="flex flex-col gap-4 p-5">
      <header className="flex justify-between">
        <div>
          <h1 className="text-2xl font-bold">Products({products.length})</h1>
          <p className="text-sm text-slate-500">Manage Products</p>
        </div>
        <Button
          onClick={() => router.push(`/${storeId}/products/new`)}
          className="flex gap-2"
        >
          <PlusCircle />
          Add New
        </Button>
      </header>
      <DataTable columns={columns} data={products} />
      <Separator />
      <ApiList entityIdName="{productId}" entityName="product" />
    </main>
  );
};

export default ProductClientComp;
