import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server";

export async function POST( 
    req: Request,
    { params }:  {
        params: { storeId : string}
    }
    
){  
try {
        const body = await req.json();
        const { name,billboardId } = body;
        const { userId } = auth();
        const { storeId } = params;
    
        if( !userId) return NextResponse.json({msg :'Unauthenticated',status:403});
    
        if( !storeId ) return NextResponse.json({msg: 'UserId required', status:400});
        
        if( !name) return NextResponse.json({ msg:'name is required', status:400});
        
        if( !billboardId) return NextResponse.json({ msg:'billboardId is required', status:400});

        const category = await prisma.category.create({
            data : {
                name,
                billboardId,
                storeId,
    
            }
        });
        return NextResponse.json({category, status:201});
} catch (error) {
        console.log(`Error in category POST ${error}`);
        return NextResponse.json({msg:`Error in category POST ${error}`,status:500});
        
}

}
