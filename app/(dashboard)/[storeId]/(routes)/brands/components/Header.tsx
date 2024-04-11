"use client";

import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { Brand } from "@prisma/client";
import { FC, useEffect } from "react";

interface HeaderProps {
  brand: Brand[];
}

const Header: FC<HeaderProps> = ({ brand }) => {
    useEffect(() => {
      router.prefetch(`/${storeId}/billboards/new`);
    }, []);
  const { storeId } = useParams();
  const router = useRouter();

  return (
    <>
      <header className="flex justify-between">
        <div>
          <h1 className="text-2xl font-bold">Brand({brand?.length})</h1>
          <p className="text-sm text-slate-500">Manage brands</p>
        </div>
        <Button
          onClick={() => router.push(`/${storeId}/brands/new`)}
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