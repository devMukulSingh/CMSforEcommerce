import BrandForm from "@/components/brand/BrandForm";
import { prisma } from "@/lib/prisma";

const SingleBrandPage = async ({ params }: { params: { brandId: string } }) => {
  const { brandId } = params;

  const brands = await prisma.brand.findUnique({
    where: {
      id: brandId,
    },
  });

  return (
    <main>
      <BrandForm initialValues={brands} />
    </main>
  );
};

export default SingleBrandPage;
