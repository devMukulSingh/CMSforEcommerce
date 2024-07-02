"use client";
import React, { FC, useEffect } from "react";
import { PlusCircle, Router } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { Billboard } from "@prisma/client";
import Link from "next/link";
import { BillboardColumn } from "@/components/ui/BillboardColumn";
import SearchBar from "@/components/commons/SearchBar";

interface HeaderProps {
  billboard: BillboardColumn[];
}

const Header: FC<HeaderProps> = ({ billboard }) => {
  const { storeId } = useParams();
  return (
    <>
      <header className="md:flex-row flex flex-col gap-5 md:gap-10 items-start md:items-center justify-between">
        <div className="w-fit">
          <h1 className="text-xl md:text-2xl font-bold">
            BillBoards({billboard?.length || 0})
          </h1>
          <p className="text-sm text-slate-500">Manage Billboards</p>
        </div>
        <div className="flex items-center w-full md:gap-5 gap-3">
          <SearchBar tableData={billboard} />
          <Link href={`/${storeId}/billboards/new`} prefetch={true}>
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
