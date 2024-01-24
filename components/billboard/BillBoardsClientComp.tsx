"use client"

import { PlusCircle, Router } from "lucide-react"
import { Button } from "../ui/button"
import { useParams, useRouter } from "next/navigation";
import {DataTable} from "../commons/DataTable";
import { Billboard } from "@prisma/client";
import { BillboardColumn, columns } from "../ui/BillboardColumn";
import ApiList from "../commons/ApiList";
import { Separator } from "../ui/separator";

interface BillBoardClientCompProps{
    billboard : BillboardColumn[];
}

const BillBoardsClientComp:React.FC<BillBoardClientCompProps> = ({
    billboard,
}) => {

    const { storeId} = useParams();
    const router = useRouter();
  return (
    <main className="flex flex-col gap-4 p-5">
        <header className="flex justify-between">
            <div>
                <h1 className="text-2xl font-bold">BillBoards({billboard.length})</h1>
                <p className="text-sm text-slate-500">Manage Billboards</p>
            </div>
            <Button onClick={ () => router.push(`/${storeId}/billboards/new`)} className="flex gap-2">
                <PlusCircle/>
                Add New
            </Button>
        </header>
        <DataTable
            columns={columns}
            data={billboard}
        />
        <Separator/>
        <ApiList/>
    </main>
  )
}

export default BillBoardsClientComp
