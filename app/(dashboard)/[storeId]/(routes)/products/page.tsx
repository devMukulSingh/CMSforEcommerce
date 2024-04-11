import ProductClientComp from "@/components/product/ProductClientComp";

const ProductsPage = async ({ params }: { params: { storeId: string } }) => {
  return (
    <>
      <ProductClientComp storeId={params.storeId} />
    </>
  );
};

export default ProductsPage;
