import ColorClientComp from "@/components/color/ColorClientComp";
import { ColorColumn } from "@/components/ui/ColorColumn";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";


const ColorPage = async( {params} : {
    params: { storeId:string}
}) => {
    const colors = await prisma.color.findMany({
        where: {
            storeId:params.storeId
        }
    })
    const formattedcolors:ColorColumn[] = colors.map( item => ({
        id: item.id,
        value:item.value,
        name:item.name,
        createdAt : format(item.createdAt,"MMMM do, yyyy")
    }))
    return(
        <>
            <ColorClientComp 
                color = {formattedcolors}
            />
        </>
    )
}

export default ColorPage;