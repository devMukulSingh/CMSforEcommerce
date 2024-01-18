import SettingsForm from "@/components/SettingsForm";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Store } from "@prisma/client";

const SettingsPage = async( { params }: { params: {storeId:string}} ) => {
    const { storeId } = params;
    const { userId } = auth();
    
    if( !userId )  redirect("/");

    const store = await prisma.store.findMany({
        where:{
            userId
        }
    });

    if( !store) redirect("/");

    return(
        <>
            <SettingsForm initialValues = {store}/>
        </>
    )
}

export default SettingsPage;