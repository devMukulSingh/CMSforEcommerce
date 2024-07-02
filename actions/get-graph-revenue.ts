import { prisma } from "@/lib/prisma";
import { cache } from "react";

export interface IgraphData {
  name: string;
  total: number;
}

export const getGraphRevenue = cache(async (storeId: string) => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        isPaid: true,
        storeId,
      },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    const graphData: IgraphData[] = [
      { name: "Jan", total: 0 },
      { name: "Feb", total: 0 },
      { name: "Mar", total: 0 },
      { name: "Apr", total: 0 },
      { name: "May", total: 0 },
      { name: "Jun", total: 0 },
      { name: "Jul", total: 0 },
      { name: "Aug", total: 0 },
      { name: "Sep", total: 0 },
      { name: "Oct", total: 0 },
      { name: "Nov", total: 0 },
      { name: "Dec", total: 0 },
    ];

    let i = 0;
    if (orders.length > 0) {
      for (let obj of graphData) {
        let totalMonthlyRevenue = 0;
        //getting totalRevenue of a particular month
        totalMonthlyRevenue = orders
          .filter((order) => order.createdAt.getMonth() === i)
          .map((order) =>
            order.orderItems.map((orderItem) => orderItem.product),
          )
          .flat()
          .reduce((prev, acc) => prev + acc.price, 0);
        //inserting total revenue of particular month in the graphData array
        obj.total = totalMonthlyRevenue;
        i++;
      }
    }

    return graphData;
  } catch (e) {
    console.log(`Error in getGraphRevenue ${e}`);
    return [];
  }
});
