import BrandClientComp from "@/components/brand/BrandClientComp";

const BrandPage = async ({ params }: { params: { storeId: string } }) => {
  return (
    <>
      <BrandClientComp storeId={params.storeId} />
    </>
  );
};

export default BrandPage;
