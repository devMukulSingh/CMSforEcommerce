import ProductClientComp from "@/components/product/ProductClientComp"
import { ProductColumn } from "@/components/ui/ProductColumn";
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
            }
        });


    const formattedProducts:ProductColumn[] = products.map( item => ({
        id: item.id,
        name:item.name,
        price:item.price,   
        category:item.category.name,
        color:item.color.value,
        size: item?.size?.value,
        isFeatured:item.isFeatured,
        isArchived:item.isArchived,
        createdAt : format(item.createdAt,"MMMM do, yyyy")
    }))
    return(
        <>
            ProductsPage
            <ProductClientComp 
                products = {formattedProducts}
            />
        </>
    )
}

export default ProductsPage;