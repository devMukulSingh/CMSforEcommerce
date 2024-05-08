import { prisma } from "@/lib/prisma";
import { OrderItem } from "@prisma/client";
import { format } from "date-fns";
import { cache } from "react";

interface IorderItem extends OrderItem {
  product: {
    name: string;
    price: number;
    isFeatured: Boolean;
    isArchived: Boolean;
  };
}
export const getFormattedOrders = cache(async (storeId: string) => {
  const orders = await prisma.order.findMany({
    where: {
      storeId: storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  const formattedOrders = orders.map((item) => ({
    id: item.id,
    phone: item.phone,
    address: item.address,
    isPaid: item.isPaid,
    customerName: item.customerName,
    products: item.orderItems
      .map((orderItem: IorderItem) => orderItem.product.name)
      .join(","),
    totalPrice: item.orderItems.reduce(
      (prevPrice: number, orderItem: IorderItem) => {
        return prevPrice + orderItem.product.price;
      },
      0,
    ),
    createdAt: format(item.updatedAt, "dd/MMM/yyyy HH:mm a"),
  }));
  return formattedOrders;
});
