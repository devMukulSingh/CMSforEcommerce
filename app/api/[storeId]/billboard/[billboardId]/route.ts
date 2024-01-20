import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
    req:Request,
    {params} : {
        params: { billboardId: string, storeId:string}
    }
    ){

    try {
        const { billboardId } = params;

        if(!billboardId) return NextResponse.json({ msg:'Billboard id is required', status:400});
    
        const billboard = await prisma.billboard.findUnique({
            where: {
                id:billboardId,
            }
        })
        return NextResponse.json({billboard,status:200});    
    } catch (error) {
        console.log(`Error in billboard GET req ${error}`);
        return NextResponse.json({ msg:`Error in billboard GET req ${error}`,status:500});
    }
}

export async function PATCH(
    req:Request,
    { params } : {
        params: {billboardId : string,storeId:string}
    }
){
    try {
        const { userId } = auth();
        const body = await req.json();
        const { billboardId, storeId} = params;
        const{ label, imageUrl } = body;

        if( !userId ) return NextResponse.json({ msg:'Unauthenticated',status:401});
        if( !billboardId ) return NextResponse.json({ msg:'Billboard id is required',status:400});
        if( !label ) return NextResponse.json({ msg: 'label is required',status:400});
        if( !imageUrl ) return NextResponse.json({ msg: 'imageUrl is required',status:400});

         const storeByUserId = await prisma.store.findUnique({
            where : {
                userId,
                id:storeId
            }       
        })
        if( !storeByUserId ) return NextResponse.json({ msg:'Unauthorised',status:402});
    
        const updatedBillboard = await prisma.billboard.update({
            where:{
                id:billboardId,
                storeId
            },
            data : {
                label,
                imageUrl,
            }
        });
    
        return NextResponse.json({ updatedBillboard, status:200});
    
} catch (error) {
    console.log(`Error in Billboard PATCH req ${error}`);
    return NextResponse.json({ msg:`Error in Billboard PATCH req ${error}`, status:500})
    
}
}

export async function DELETE(
    req:Request,
    {params} : {
        params: { billboardId: string, storeId:string}
    }
    ){

try {
        const { userId } = auth();
        const { billboardId,storeId } = params;

        if(!userId) return NextResponse.json({ msg:'Authenticated',status:401});
        
        if( !billboardId ) return NextResponse.json({ msg:'Billboard id is required',status:400});

        const storeByUserId = await prisma.store.findUnique({
            where: {
                userId,
                id : storeId,
            }
        })
    
        if(!storeByUserId) return NextResponse.json({msg:'Unauthorised',status:401});
    
        await prisma.billboard.delete({
            where: {
                id:billboardId,
                storeId
            }
        })
        return NextResponse.json({msg: 'Billboard deleted',status:200});    
} catch (error) {
    console.log(`Error in billboard DELETE req ${error}`);
    return NextResponse.json({ msg:`Error in billboard DELETE req ${error}`,status:500});
}

}





















