"use client";
import React, { FC, useEffect } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { Color } from "@prisma/client";

interface HeaderProps {
  colors: Color[];
}

const Header: FC<HeaderProps> = ({ colors }) => {
  useEffect(() => {
    router.prefetch(`/${storeId}/colors/new`);
  }, []);
  const router = useRouter();
  const { storeId } = useParams();

  return (
    <header className="flex justify-between">
      <div>
        <h1 className="text-2xl font-bold">Colors({colors.length})</h1>
        <p className="text-sm text-slate-500">Manage colors</p>
      </div>
      <Button
        onClick={() => router.push(`/${storeId}/colors/new`)}
        className="flex gap-2"
      >
        <PlusCircle />
        Add New
      </Button>
    </header>
  );
};

export default Header;
