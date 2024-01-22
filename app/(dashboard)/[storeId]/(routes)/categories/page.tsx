import CategoriesClientComp from "@/components/CategoriesClientComp";
import { CategoryColumn } from "@/components/ui/CategoryColumn";
import { prisma } from "@/lib/prisma";
import { Billboard } from "@prisma/client";
import { format } from "date-fns";


const CategoriesPage = async( {params} : {
    params: { storeId:string}
}) => {
    const categories = await prisma.category.findMany({
        where: {
            storeId:params.storeId
        },
        include : {
            billboard:true
        }
    })
    const formattedCategories:CategoryColumn[] = categories.map( item => ({
        id: item.id,
        name:item.name,
        createdAt: format( item.createdAt, "MMMM do, yyyy"),
        billboardLabel : item.billboard.label
    }))
    return(
        <>
            CategoriesPage
            <CategoriesClientComp 
                categories = {formattedCategories}
            />
        </>
    )
}

export default CategoriesPage;