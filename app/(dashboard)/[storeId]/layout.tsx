import Navbar from "@/components/commons/Navbar";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Sidebar from "@/components/commons/Sidebar";


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
        <>  
            <Navbar storeId={storeId}/>
            <Sidebar/>
            {children}
        </>
    )

}