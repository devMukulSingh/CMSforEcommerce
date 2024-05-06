import CategoryForm from "@/app/(dashboard)/[storeId]/(routes)/categories/[categoryId]/components/CategoryForm";
import { prisma } from "@/lib/prisma";

const SingleBillBoardPage = async ({
  params,
}: {
  params: { storeId: string; categoryId: string };
}) => {
  const { categoryId, storeId } = params;

  let category = null;
  if (categoryId !== "new")
    category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });

  const billboards = await prisma.billboard.findMany({
    where: {
      storeId,
    },
  });

  return (
    <>
      <CategoryForm initialValues={category} billboards={billboards} />
    </>
  );
};

export default SingleBillBoardPage;
