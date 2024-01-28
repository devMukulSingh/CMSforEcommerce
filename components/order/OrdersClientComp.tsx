"use client"

import { PlusCircle } from "lucide-react"
import { Button } from "../ui/button"
import { useParams, useRouter } from "next/navigation";
import {DataTable} from "../commons/DataTable";
import { OrdersColumn, columns } from "../ui/OrdersColumn";
import ApiList from "../commons/ApiList";
import { Separator } from "../ui/separator";

interface OrdersClientCompProps{
    orders : OrdersColumn[];
}

const OrdersClientComp:React.FC<OrdersClientCompProps> = ({
    orders,
}) => {

    const { storeId} = useParams();
    const router = useRouter();
  return (
    <main className="flex flex-col gap-4 p-5">
        <header className="flex justify-between">
            <div>
                <h1 className="text-2xl font-bold">Orders({orders.length})</h1>
                <p className="text-sm text-slate-500">Manage orders</p>
            </div>
        </header>
        <DataTable
            columns={columns}
            data={orders}
        />
        <Separator/>
        <ApiList
            entityName="order"
            entityIdName="{orderId}"
        />
    </main>
  )
}

export default OrdersClientComp
