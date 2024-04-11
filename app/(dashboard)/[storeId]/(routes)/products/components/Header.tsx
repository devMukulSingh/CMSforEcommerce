"use client";
import React, { FC, useEffect } from "react";
import { PlusCircle, Router } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { Product } from "@prisma/client";

interface HeaderProps {
  products: Product[];
}

const Header: FC<HeaderProps> = ({ products }) => {
  useEffect(() => {
    router.prefetch(`/${storeId}/products/new`);
  }, []);
  const router = useRouter();
  const { storeId } = useParams();

  return (
    <>
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
    </>
  );
};

export default Header;
