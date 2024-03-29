import OrdersClientComp from "@/components/order/OrdersClientComp";
import { formatDate } from "@/lib/formatTime";
import { prisma } from "@/lib/prisma";
import {  OrderItem } from "@prisma/client";

interface IorderItem extends OrderItem{
    product:{
        name:string,
        price:number,
        isFeatured :Boolean,
        isArchived :Boolean,
    }
}

const OrdersPage = async( {params} : {
    params: { storeId:string}
}) => {
    const orders = await prisma.order.findMany({
        where: {
            storeId:params.storeId
        },
        include: { 
            orderItems : {
                include:{
                    product:true
                }
            },
        }
    });

    const formattedOrders = orders.map( item => ({
        id: item.id,
        phone : item.phone,
        address: item.address,
        isPaid: item.isPaid,
        products : item.orderItems.map( (orderItem:IorderItem) => (orderItem.product.name)).join(','),
        totalPrice : item.orderItems.reduce( (prevPrice:number,orderItem:IorderItem) => {
            return prevPrice + orderItem.product.price
        },0 ),
        createdAt : formatDate(item.updatedAt),
    }))
    return(
        <>

            <OrdersClientComp 
                orders = {formattedOrders}
            />
        </>
    )
}

export default OrdersPage;