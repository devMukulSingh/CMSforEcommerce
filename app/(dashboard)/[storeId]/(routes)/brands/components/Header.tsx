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
      <header className="md:flex-row flex flex-col gap-5 md:gap-10 items-start md:items-center justify-between">
        <div className="w-fit">
          <h1 className="text-xl md:text-2xl font-bold">
            Brands({brand?.length || 0})
          </h1>
          <p className="text-sm text-slate-500">Manage brands</p>
        </div>
        <div className="flex items-center w-full md:gap-5 gap-3">
          <SearchBar tableData={brand} />
          <Link href={`/${storeId}/brands/new`} prefetch={true}>
            <Button className="flex gap-2 ">
              <PlusCircle />
              <h1 className="hidden md:block"> Add New</h1>
            </Button>
          </Link>
        </div>
      </header>
    </>
  );
};

export default Header;
