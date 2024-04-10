'use client'
import React, { FC } from 'react'
import { PlusCircle, Router } from "lucide-react";
import { Button } from "../ui/button";
import { useParams, useRouter } from "next/navigation";
import { Billboard } from '@prisma/client';

interface HeaderProps{
  billboard:Billboard[]
}

const Header:FC<HeaderProps> = ({
    billboard
}) => {
  const router = useRouter();
  const { storeId } = useParams();

  return (
    <>
      <header className="flex justify-between">
        <div>
          <h1 className="text-2xl font-bold">BillBoards({billboard?.length || 0})</h1>
          <p className="text-sm text-slate-500">Manage Billboards</p>
        </div>
        <Button
          onClick={() => router.push(`/${storeId}/billboards/new`)}
          className="flex gap-2"
        >
          <PlusCircle />
          Add New
        </Button>
      </header>
    </>
  );
}

export default Header