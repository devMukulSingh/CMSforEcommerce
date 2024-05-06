import ProductForm from "@/app/(dashboard)/[storeId]/(routes)/products/[productId]/components/ProductForm";
import { prisma } from "@/lib/prisma";

const SingleProductPage = async ({
  params,
}: {
  params: { productId: string; storeId: string };
}) => {
  const { productId, storeId } = params;

  let formattedProducts = null;

  if (productId !== "new") {
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        images: true,
      },
    });
    formattedProducts = {
      name: product?.name,
      price: product?.price,
      quantity: product?.quantity,
      images: product?.images,
      categoryId: product?.categoryId,
      colorId: product?.colorId,
      sizeId: product?.sizeId,
      featured: product?.isFeatured,
      archived: product?.isArchived,
      ratings: product?.ratings,
      brandId: product?.brandId,
      description: product?.description
      //@ts-ignore
        ?.map((point: string) => point)
        .join("\n"),
    };
  }

  return (
    <>
      <ProductForm
        //@ts-ignore
        initialValues={formattedProducts}
      />
    </>
  );
};

export default SingleProductPage;
