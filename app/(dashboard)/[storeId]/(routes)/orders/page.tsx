import OrdersClientComp from "@/components/order/OrdersClientComp";
import { OrdersColumn } from "@/components/ui/OrdersColumn";
import { prisma } from "@/lib/prisma";
import { Billboard, OrderItem } from "@prisma/client";
import { format } from "date-fns";

interface IorderItem extends OrderItem{
    product:{
        name:String,
        price:Number,
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
    })
    const formattedOrders = orders.map( item => ({
        id: item.id,
        phone : item.phone,
        address: item.address,
        isPaid: item.isPaid,
        products : item.orderItems.map( (orderItem:IorderItem) => (orderItem.product.name)).join(','),
        createdAt : format(item.createdAt,"MMMM do, yyyy")
    }))
    return(
        <>
            OrdersPage
            <OrdersClientComp 
                orders = {formattedOrders}
            />
        </>
    )
}

export default OrdersPage;