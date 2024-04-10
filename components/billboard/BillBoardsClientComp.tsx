import dynamic from "next/dynamic";
import ApiList from "../commons/ApiList";
import { Separator } from "../ui/separator";
import BillboardsTableSkeleton from "./BillboardsTableSkeleton";
const BillboardsTable = dynamic(() => import("./BillboardsTable"), {
  loading: () => <BillboardsTableSkeleton />,
});

interface BillBoardClientCompProps {
  storeId: string;
}

const BillBoardsClientComp: React.FC<BillBoardClientCompProps> = ({
  storeId,
}) => {
  return (
    <div className="flex flex-col gap-4 p-5">
      <BillboardsTable storeId={storeId} />
      <Separator />
      <ApiList entityName="billboard" entityIdName="{billboardId}" />
    </div>
  );
};

export default BillBoardsClientComp;
