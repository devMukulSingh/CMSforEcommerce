import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
    req:Request,
    {params} : {
        params: { productId: string, storeId:string}
    }
    ){

    try {
        const { productId } = params;

        if(!productId) return NextResponse.json({ error:'product id is required'}, {status:400});
    
        const product = await prisma.product.findUnique({
            where: {
                id:productId,
            },
            include:{
                images:true,
            }
        })
        return NextResponse.json({product},{status:200});    
    } catch (error) {
        console.log(`Error in product GET req ${error}`);
        return NextResponse.json({ error:`Error in product GET req ${error}`},{status:500});
    }
}

export async function PATCH(
    req:Request,
    { params } : {
        params: {productId : string,storeId:string}
    }
){
    try {
        const { storeId, productId } = params;
        const { userId } = auth();
        const body = await req.json();
        const { name,
                 price,
                  colorId,
                  sizeId,
                   images,
                   categoryId,
                   isArchived,
                   isFeatured,
                    description,
                    ratings,
                    brandId
                } = body;

        if( !userId ) return NextResponse.json({ error:'Unauthenticated'},{status:401});

        if( !storeId ) return NextResponse.json({ error:'storeId is required'},{status:400});
    
        if(!name) return NextResponse.json({ error:'name required'},{status:400});

        if(!colorId) return NextResponse.json({ error:'colorId is required'},{status:400});

        if(!images || images.length < 0) return NextResponse.json({ error:'image is required'},{status:400});

        if(!price) return NextResponse.json({ error:'price is required'},{status:400});

        if(!categoryId) return NextResponse.json({ error:'categoryId is required'},{status:400});

        if(!brandId) return NextResponse.json({ error:'brandId is required'},{status:400});


        // if(!description) return NextResponse.json({ error:'description is required',{status:400});

        //converting the string into array
        let descriptionArray = [];
        if(description) {
            descriptionArray = description.split('\n');
        }

         const storeByUserId = await prisma.store.findUnique({
            where : {
                userId,
                id:storeId
            }       
        })
        if( !storeByUserId ) return NextResponse.json({ error:'Unauthorised'},{status:402});

        await prisma.product.update({
            where:{
                id:productId,
                storeId
            },
            include:{
                images:true,
                color:true,
                size:true,
                category:true,
            },
            data : {
                name,
                price,
                colorId,
                sizeId,
                categoryId,
                isArchived,
                isFeatured,
                storeId,
                ratings,
                brandId,
                description:descriptionArray,
                images:{
                    deleteMany: {}
                }

            }
        })
    
        const updatedproducts = await prisma.product.update({
            where: {
                id:productId,
                storeId
            },
            include:{
                images:true
            },
            data : {
                images : {
                    createMany : {
                        data : [ ...images.map( (img : {url:string}) => img)]
                    }
                }
            }
        })
    
        return NextResponse.json({ updatedproducts}, {status:201});
    
} catch (error) {
    console.log(`Error in product PATCH req ${error}`);
    return NextResponse.json({ error:`Error in product PATCH req ${error}`}, {status:500})
    
}
}

export async function DELETE(
    req:Request,
    {params} : {
        params: { productId: string, storeId:string}
    }
    ){

try {
        const { userId } = auth();
        const { productId,storeId } = params;

        if(!userId) return NextResponse.json({ error:'Authenticated'},{status:401});
        
        if( !productId ) return NextResponse.json({ error:'product id is required'},{status:400});

        const storeByUserId = await prisma.store.findUnique({
            where: {
                userId,
                id : storeId,
            },
            include:{
                categories:true,
                colors:true,
                products:true,
                sizes:true,
            }
        })
    
        if(!storeByUserId) return NextResponse.json({error:'Unauthorised'},{status:401});
    
        await prisma.product.delete({
            where: {
                id:productId,
                storeId
            }
        })
        return NextResponse.json({error: 'product deleted'},{status:200});    
} catch (error) {
    console.log(`Error in product DELETE req ${error}`);
    return NextResponse.json({ error:`Error in product DELETE req ${error}`},{status:500});
}

}





















