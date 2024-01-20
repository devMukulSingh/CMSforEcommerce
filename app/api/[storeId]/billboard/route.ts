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
        const { label, imageUrl } = body;
        const { storeId } = params;
        
        if(!userId) return NextResponse.json({msg:'Unauthenticated',status:401});
    
        const store = await prisma.store.findMany({
            where : {
               userId
            }
        })
    
        if(!store) return NextResponse.json({msg:'Unathorised', status:402});
    
        if(!label) return NextResponse.json({ msg:'Label required',status:400});
        if(!imageUrl) return NextResponse.json({ msg:'ImageUrl is required',status:400});
    
        const billboard = await prisma.billboard.create({
            data : {
                label,
                imageUrl,
                storeId
            }
        });
        return NextResponse.json({ billboard, status:200 });
    
    } catch (error) {
        console.log(`Error in Billboard POST req ${error}`);
        return NextResponse.json({msg:'error in Billboard POST req ',status:500});
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
            }
        });
        return NextResponse.json({ billboard, status:200 });
    
    } catch (error) {
        console.log(`Error in Billboard GET req ${error}`);
        return NextResponse.json({msg:'error in Billboard GET req ',status:500});
    }
}

