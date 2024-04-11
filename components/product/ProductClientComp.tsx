import dynamic from "next/dynamic";
import ApiList from "../commons/ApiList";
import { Separator } from "../ui/separator";
import TableSkeleton from "../commons/TableSkeleton";
const ProductTable = dynamic(() => import("./ProductTable"), {
  loading: () => <TableSkeleton />,
});

export interface ProductClientCompProps {
  storeId: string;
}

const ProductClientComp: React.FC<ProductClientCompProps> = ({ storeId }) => {
  return (
    <main className="flex flex-col gap-4 p-5">
      <ProductTable storeId={storeId} />
      <Separator />
      <ApiList entityIdName="{productId}" entityName="product" />
    </main>
  );
};

export default ProductClientComp;
