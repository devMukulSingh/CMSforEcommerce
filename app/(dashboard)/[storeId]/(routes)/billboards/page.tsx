import BillBoardsClientComp from "@/components/billboard/BillBoardsClientComp";
import { BillboardColumn } from "@/components/ui/BillboardColumn";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";

const BillboardsPage = async ({ params }: { params: { storeId: string } }) => {
  const billboard = await prisma.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  const formattedBillboards: BillboardColumn[] = billboard.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <>
      <BillBoardsClientComp billboard={formattedBillboards} />
    </>
  );
};

export default BillboardsPage;
