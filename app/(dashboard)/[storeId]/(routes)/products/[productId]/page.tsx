import ProductForm from "@/components/product/ProductForm"
import { prisma } from "@/lib/prisma";
import { Category, Color, Product, Size } from "@prisma/client";

const SingleProductPage = async(
  {params} : { params : {productId : string, storeId : string} }
) => {

  const { productId,storeId } = params;

  const products = await prisma.product.findUnique({
    where : {
      id : productId,
    },
    include:{
      images:true,
    }
  });
  const categories:Category[] = await prisma.category.findMany({
    where:{
      storeId
    },
  })
  const colors:Color[] = await prisma.color.findMany({
    where:{
      storeId
    },

  })
  const sizes:Size[] = await prisma.size.findMany({
    where:{
      storeId
    },

  })

  return (
    <main>
        <ProductForm
          initialValues={products}
          categories={categories}
          colors={colors}
          sizes={sizes}
        />
    </main>
  )
}

export default SingleProductPage