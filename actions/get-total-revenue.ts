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
    //getting current Month
    const currMonth = new Date().getMonth();

    //filtering current Month orders
    const currMonthOrders = orders.filter( item => item.createdAt.getMonth() === currMonth);

    //calculating total revenue
    const totalRevenue = orders.map( item => item.orderItems.map( (item) => item.product.price)).flat().reduce( (acc,curr) =>{
        return acc+curr;
    }); 

    return { totalRevenue, currMonthOrders:currMonthOrders.length};    
    
    //this will work too
    // const totalRevenue = orders.map( item => item.orderItems.map(item=>item.product.price)).join(",").split(',').map( item => parseInt(item)).reduce( (prev,curr) => {
    //     return prev+curr; 
    // },0);

}