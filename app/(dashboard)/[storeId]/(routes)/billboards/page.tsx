import BillBoardsClientComp from "@/components/billboard/BillBoardsClientComp";


const BillboardsPage = async ({ params }: { params: { storeId: string } }) => {
 
  return (
    <>
      <BillBoardsClientComp storeId={params.storeId} />
    </>
  );
};

export default BillboardsPage;
