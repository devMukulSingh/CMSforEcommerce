import SettingsForm from "@/components/settings/SettingsForm";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { Store } from "@prisma/client";
import { redirect } from "next/navigation";

const SettingsPage = async( { params }: { params: {storeId:string}} ) => {
    const { userId } = auth();
    
    if( !userId )  redirect("/");

    const store = await prisma.store.findFirst({
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