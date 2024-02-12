import ProductClientComp from "@/components/product/ProductClientComp"
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";


const ProductsPage = async( {params} : {
    params: { storeId:string}
}) => {

        const products = await prisma.product.findMany({
            where: {
                storeId:params.storeId
            },
            include : {
                category:true,
                size:true,
                color:true,
                brand:true,
            
            }
        });

    const formattedProducts = products.map( item => ({
        id: item.id,
        name:item.name,
        price:item.price,   
        category:item.category.name,
        color:item.color.value,
        // size: item?.size?.value,
        //@ts-ignore
        description:item?.description?.map( (description:string) => description),
        isFeatured:item.isFeatured,
        isArchived:item.isArchived,
        createdAt : format(item.createdAt,"MMMM do, yyyy"),
        ratings : item?.ratings,
        brand : item?.brand?.name,
    })) 
    return(
        <>
            <ProductClientComp 
                products = {formattedProducts}
            />
        </>
    )
}

export default ProductsPage;