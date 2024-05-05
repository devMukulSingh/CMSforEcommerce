import ProductForm from "@/app/(dashboard)/[storeId]/(routes)/products/[productId]/components/ProductForm";
import { prisma } from "@/lib/prisma";
import { Brand, Category, Color, Size } from "@prisma/client";

const SingleProductPage = async ({
  params,
}: {
  params: { productId: string; storeId: string };
}) => {
  const { productId, storeId } = params;

  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      images: true,
    },
  });
  const categories: Category[] = await prisma.category.findMany({
    where: {
      storeId,
    },
  });
  const colors: Color[] = await prisma.color.findMany({
    where: {
      storeId,
    },
  });
  const sizes: Size[] = await prisma.size.findMany({
    where: {
      storeId,
    },
  });
  const brands: Brand[] = await prisma.brand.findMany({
    where: {
      storeId,
    },
  });

  const formattedProducts = {
    name: product?.name,
    price: product?.price,
    quantity:product?.quantity,
    images: product?.images,
    categoryId: product?.categoryId,
    colorId: product?.colorId,
    sizeId: product?.sizeId,
    featured: product?.isFeatured,
    archived: product?.isArchived,
    ratings: product?.ratings,
    brandId: product?.brandId,
    //@ts-ignore
    description: product?.description?.map((point: string) => point).join("\n"),
  };

  return (
    <>
      <ProductForm
        categories={categories}
        colors={colors}
        sizes={sizes}
        brands={brands}
        //@ts-ignore
        initialValues={formattedProducts}
      />
    </>
  );
};

export default SingleProductPage;
