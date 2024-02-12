import BrandClientComp from "@/components/brand/BrandClientComp";
import { BrandColumn } from "@/components/ui/BrandColumn";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";


const BrandPage = async( {params} : {
    params: { storeId:string}
}) => {
    const brand = await prisma.brand.findMany({
        where: {
            storeId:params.storeId
        }
    })
    const formattedbrands:BrandColumn[] = brand.map( item => ({
        id: item.id,
        name:item.name,
        createdAt : format(item.createdAt,"MMMM do, yyyy")
    }))
    return(
        <>
            <BrandClientComp             
                brand = {formattedbrands}
            />
        </>
    )
}

export default BrandPage;