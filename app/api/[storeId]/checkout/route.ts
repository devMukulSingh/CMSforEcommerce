import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const corsHeader = {
    "Access-Control-Allow-Origin": "*",
    "Acess-Control-Allow-Methods": "GET, POST, PUT, DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS(){
    return NextResponse.json( {}, { headers: corsHeader});
}

export async function POST(
    req:Request,
    {params} : {params: { storeId: string}}
){
    const { data:productIds } = await req.json();

    if(productIds?.length < 0) return NextResponse.json({error:'ProductIds is required'},{status:400});

    const products = await prisma.product.findMany({
        where:{
            id:{
                in:[...productIds]
            }   
        }
    });
    const line_items:Stripe.Checkout.SessionCreateParams.LineItem[] = [];
 
    
    products.forEach( (product) => {
        line_items.push({
            quantity : 1,
            price_data : {
                currency : 'INR',
                product_data : {
                    name:product.name,
                },
                unit_amount : product.price * 100,
            }
        });
    });


    const order = await prisma.order.create({
        data : {
            storeId: params.storeId,
            isPaid:false,
            orderItems : {
                create: productIds?.map( (productId:string) => ({
                    product : {
                        // "connect" method -> connect method to establish this relationship during the creation process
                        connect : {
                            id:productId,
                        }
                    }
                }))
            }
        }
    })

    const session = await stripe.checkout.sessions.create({
        line_items,
        mode:'payment',
        billing_address_collection:"required",
        phone_number_collection:{
            enabled:true,
        },
        success_url: `${process.env.FRONTEND_URL}/cart?sucess=1`,
        cancel_url: `${process.env.FRONTEND_URL}/cart?canceled=1`,
        metadata:{
            orderId: order.id
        }

    })

    return NextResponse.json({ url:session.url} , {headers:corsHeader});

}