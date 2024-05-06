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
      <header className="flex gap-5 sm:gap-10 items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            BillBoards({billboard?.length || 0})
          </h1>
          <p className="text-sm text-slate-500">Manage Billboards</p>
        </div>
        <SearchBar
          tableData={billboard}
        />
        <Link href={`/${storeId}/billboards/new`} prefetch={true}>
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
