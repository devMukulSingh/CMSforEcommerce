import { prisma } from "@/lib/prisma";

 
export const getTotalRevenue = async() => {
    const orders = await prisma.order.findMany({
        where:{
            isPaid:true,
        }, 
        include:{
            orderItems:{
                include:{
                    product:true,
                }
            },
        } 
    });

    const totalRevenue = orders.map( item => item.orderItems.map( (item) => item.product.price)).flat(); 
    return { totalRevenue, totalOrders : orders.length };    
    
    //this will work too
    // const totalRevenue = orders.map( item => item.orderItems.map(item=>item.product.price)).join(",").split(',').map( item => parseInt(item)).reduce( (prev,curr) => {
    //     return prev+curr; 
    // },0);

}