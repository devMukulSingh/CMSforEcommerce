"use client"

import { PlusCircle, } from "lucide-react"
import { Button } from "../ui/button"
import { useParams, useRouter } from "next/navigation";
import {DataTable} from "../commons/DataTable";
import { ColorColumn, columns } from "../ui/ColorColumn";
import ApiList from "../commons/ApiList";
import { Separator } from "../ui/separator";

interface ColorClientProps{
    color : ColorColumn[];
}

const ColorsClientComp:React.FC<ColorClientProps> = ({
    color,
}) => {

    const { storeId} = useParams();
    const router = useRouter();
  return (
    <main className="flex flex-col gap-4 p-5">
        <header className="flex justify-between">
            <div>
                <h1 className="text-2xl font-bold">Colors({color.length})</h1>
                <p className="text-sm text-slate-500">Manage colors</p>
            </div>
            <Button onClick={ () => router.push(`/${storeId}/colors/new`)} className="flex gap-2">
                <PlusCircle/>
                Add New
            </Button>
        </header>
        <DataTable
            columns={columns}
            data={color}
        />
        <Separator/>
        <ApiList/>
    </main>
  )
}

export default ColorsClientComp
