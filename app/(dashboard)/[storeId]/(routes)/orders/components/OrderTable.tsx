import React, { FC } from "react";
import { OrdersClientCompProps } from "./OrdersClientComp";
import { DataTable } from "@/components/commons/DataTable";
import { columns } from "@/components/ui/OrdersColumn";
import { getFormattedOrders } from "@/actions/get-formatted-orders";

const OrderTable: FC<OrdersClientCompProps> = async ({ storeId }) => {
  const orders = await getFormattedOrders(storeId);
  return (
    <>
      <header className="flex justify-between">
        <div>
          <h1 className="text-2xl font-bold">Orders({orders.length})</h1>
          <p className="text-sm text-slate-500">Manage orders</p>
        </div>
      </header>
      <DataTable columns={columns} data={orders} />
    </>
  );
};

export default OrderTable;
