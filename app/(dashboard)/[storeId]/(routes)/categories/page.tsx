import CategoriesClientComp from "@/components/category/CategoriesClientComp";

const CategoriesPage = async ({ params }: { params: { storeId: string } }) => {
  return (
    <>
      <CategoriesClientComp storeId={params.storeId} />
    </>
  );
};

export default CategoriesPage;
