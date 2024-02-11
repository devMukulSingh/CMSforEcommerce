import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
    req:Request,
    { params}:{ params : {storeId : string}}
){
    try {
        const { userId } = auth();
        const body = await req.json();
        const { label, images } = body;
        const { storeId } = params;
        
        if(!userId) return NextResponse.json({msg:'Unauthenticated'},{status:201});
    
        const store = await prisma.store.findMany({
            where : {
               userId
            }
        })
    
        if(!store) return NextResponse.json({msg:'Unathorised'}, {status:402});
    
        if(!label) return NextResponse.json({ msg:'Label required',status:400});
        if(images.length < 0 ) return NextResponse.json({ msg:'images is required'},{status:400});
    
        const billboard = await prisma.billboard.create({
            data : {
                label,
                storeId,
                images:{
                    createMany: {
                        data: [...images.map( ( img:{url:string} ) => img)]
                    }
                }
            }
        });
        return NextResponse.json({ billboard}, {status:201 });
    
    } catch (error) {
        console.log(error);
        return NextResponse.json({msg:'error in Billboard POST req '},{status:500});
    }
}



export async function GET(
    req:Request,
    { params}:{ params : {storeId : string}}
){
    try {

        const { storeId } = params;
        
        if( !storeId ) return NextResponse.json({ msg:'Store id is required',status:400});

        const billboard = await prisma.billboard.findMany({
            where:{
                storeId
            },
            include:{
                images:true,
            }
        });
        return NextResponse.json({ billboard, status:200 });
    
    } catch (error) {
        console.log(`Error in Billboard GET req ${error}`);
        return NextResponse.json({msg:'error in Billboard GET req ',status:500});
    }
}

