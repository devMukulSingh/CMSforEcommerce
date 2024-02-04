import ProductForm from "@/components/product/ProductForm"
import { prisma } from "@/lib/prisma";
import { Category, Color, Size } from "@prisma/client";

const SingleProductPage = async(
  {params} : { params : {productId : string, storeId : string} }
) => {

  const { productId,storeId } = params;

  const product = await prisma.product.findUnique({
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
  
  const formattedProducts = {
    name : product?.name,
    price: product?.price,
    images: product?.images,
    categoryId : product?.categoryId,
    colorId: product?.colorId,
    sizeId:product?.sizeId,
    featured: product?.isFeatured,
    archived: product?.isArchived,
    description : product?.description?.map( (point:string) => point  ).join("\n"),
    ratings: product?.ratings,
  }
  // console.log(formattedProducts);
  
  return (
    <main>
        <ProductForm
          initialValues={formattedProducts}
          categories={categories}
          colors={colors}
          sizes={sizes}
        />
    </main>
  )
}

export default SingleProductPage