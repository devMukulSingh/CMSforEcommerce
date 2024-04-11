import dynamic from "next/dynamic";
import ApiList from "../commons/ApiList";
import { Separator } from "../ui/separator";
import TableSkeleton from "../commons/TableSkeleton";
const CategoryTable = dynamic(() => import("./CategoryTable"), {
  loading: () => <TableSkeleton />,
});

export interface CategoriesClientCompProps {
  storeId: string;
}
const CategoriesClientComp: React.FC<CategoriesClientCompProps> = ({
  storeId,
}) => {
  return (
    <div className="flex flex-col gap-4 p-5">
      <CategoryTable storeId={storeId} />
      <Separator />
      <ApiList entityIdName="{categoryId}" entityName="category" />
    </div>
  );
};

export default CategoriesClientComp;
