"use client"

import { PlusCircle, Router } from "lucide-react"
import { Button } from "./ui/button"
import { useParams, useRouter } from "next/navigation";



const BillBoardsClientComp = () => {
    const params = useParams();
    const { storeId} = params;
    const router = useRouter();
  return (
    <main className="flex justify-between p-5">
        <header>
            <h1 className="text-2xl font-bold">
                BillBoards(0)
            </h1>
            <p className="text-sm text-slate-500">
                Manage Billboards
            </p>
        </header>
        <Button className="flex gap-2"
            onClick={ () => router.push(`/${storeId}/billboards/new`)}>
            <PlusCircle/>
            Add New
        </Button>
    </main>
  )
}

export default BillBoardsClientComp
