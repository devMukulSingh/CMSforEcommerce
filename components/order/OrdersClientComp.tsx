import ApiList from "@/components/order/ApiList";
import { Separator } from "../ui/separator";
import dynamic from "next/dynamic";
import TableSkeleton from "../commons/TableSkeleton";
const OrderTable = dynamic( () => import("./OrderTable"),{
  loading : () => <TableSkeleton/>
})

export interface OrdersClientCompProps {
  storeId: string
}

const OrdersClientComp: React.FC<OrdersClientCompProps> = ({ storeId }) => {
  return (
    <div className="flex flex-col gap-4 p-5">
      <OrderTable storeId={storeId} />
      <Separator />
      <ApiList entityName="order" entityIdName="{orderId}" />
    </div>
  );
};

export default OrdersClientComp;
