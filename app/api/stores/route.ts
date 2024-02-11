import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function POST(req:Request){

    try {
        const {userId} = auth();
        const body = await req.json();       
        const { name } = body;
    
        if( !name){
            return NextResponse.json({error:'body is required'}, {status:401});
        }
        if( !userId){
            return NextResponse.json({ error:'userId is required'}, {status:401})
        }
    
        const store = await prisma.store.create({
            data: {
                userId,
                name
            }
        })
        return NextResponse.json({ store}, {status:200});
    } catch (error) {
        console.log(`Error in get stores handler ${error}`);
        return NextResponse.json({ error:` Error in stores route handler `}, {status: 500} );
    }
}


// export async function GET(
//     req:Request
// ){
//     const { userId } = auth();
//     const storeId = await prisma.store.findMany({
//         where:{
//             userId
//         }
//     });
// }