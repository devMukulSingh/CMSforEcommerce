"use client";
import React, { FC, useEffect } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { Color } from "@prisma/client";
import Link from "next/link";
import { ColorColumn } from "@/components/ui/ColorColumn";
import SearchBar from "@/components/commons/SearchBar";

interface HeaderProps {
  colors: ColorColumn[];
}

const Header: FC<HeaderProps> = ({ colors }) => {
  const { storeId } = useParams();

  return (
    <header className="md:flex-row flex flex-col gap-5 md:gap-10 items-start md:items-center justify-between">
      <div className="w-fit">
        <h1 className="text-xl md:text-2xl font-bold">
          Colors({colors?.length || 0})
        </h1>
        <p className="text-sm text-slate-500">Manage colors</p>
      </div>
      <div className="flex items-center w-full md:gap-5 gap-3">
        <SearchBar tableData={colors} />
        <Link href={`/${storeId}/colors/new`} prefetch={true}>
          <Button className="flex gap-2 ">
            <PlusCircle />
            <h1 className="hidden md:block"> Add New</h1>
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
