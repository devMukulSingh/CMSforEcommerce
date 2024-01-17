import Navbar from "@/components/Navbar";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";


export default async function DashboardLayout( { children, params } : 
    { 
        children : React.ReactNode, 
        params: { storeId : string}

    }){
    const { storeId } = params;
    const { userId } = auth();

    if(!userId) redirect("/");

    const store = await prisma.store.findFirst({
        where : {
            id: storeId,
            userId : userId
        }
    })

    if( !store) redirect("/");

    return(
        <main>
            <Navbar storeId = {storeId}/>
            {children}
        </main>
    )

}