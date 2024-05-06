import React, { FC } from "react";
import { OrdersClientCompProps } from "./OrdersClientComp";
import { DataTable } from "@/components/commons/DataTable";
import { columns } from "@/components/ui/OrdersColumn";
import { getFormattedOrders } from "@/actions/get-formatted-orders";
import Header from "./Header";

const OrderTable: FC<OrdersClientCompProps> = async ({ storeId }) => {
  const orders = await getFormattedOrders(storeId);
  return (
    <>
      <Header orders={orders}/>
      <DataTable columns={columns} data={orders} />
    </>
  );
};

export default OrderTable;
