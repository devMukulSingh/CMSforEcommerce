"use client"

import { PlusCircle, Router } from "lucide-react"
import { Button } from "../ui/button"
import { useParams, useRouter } from "next/navigation";
import {DataTable} from "../commons/DataTable";
import { Billboard } from "@prisma/client";
import { BrandColumn, columns } from "../ui/BrandColumn";
import ApiList from "../commons/ApiList";
import { Separator } from "../ui/separator";

interface BrandClientCompProps{
    brand : BrandColumn[];
}

const BrandClientComp:React.FC<BrandClientCompProps> = ({
    brand,
}) => {

    const { storeId} = useParams();
    const router = useRouter();
  return (
    <main className="flex flex-col gap-4 p-5">
        <header className="flex justify-between">
            <div>
                <h1 className="text-2xl font-bold">Brand({brand.length})</h1>
                <p className="text-sm text-slate-500">Manage brands</p>
            </div>
            <Button onClick={ () => router.push(`/${storeId}/brands/new`)} className="flex gap-2">
                <PlusCircle/>
                Add New
            </Button>
        </header>
        <DataTable
            columns={columns}
            data={brand}
        />
        <Separator/>
        <ApiList
            entityIdName="{brandId}"
            entityName="brand"
        />
    </main>
  )
}

export default BrandClientComp
