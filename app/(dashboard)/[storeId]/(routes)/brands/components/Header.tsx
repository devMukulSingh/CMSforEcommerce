"use client";

import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { Brand } from "@prisma/client";
import { FC, useEffect } from "react";
import Link from "next/link";
import { BrandColumn } from "@/components/ui/BrandColumn";
import SearchBar from "@/components/commons/SearchBar";

interface HeaderProps {
  brand: BrandColumn[];
}

const Header: FC<HeaderProps> = ({ brand }) => {
  const { storeId } = useParams();

  return (
    <>
      <header className="flex justify-between">
        <div>
          <h1 className="text-2xl font-bold">Brand({brand?.length})</h1>
          <p className="text-sm text-slate-500">Manage brands</p>
        </div>
        <SearchBar tableData={brand} />
        <Link href={`/${storeId}/brands/new`} prefetch={true}>
          <Button className="flex gap-2">
            <PlusCircle />
            Add New
          </Button>
        </Link>
      </header>
    </>
  );
};

export default Header;
