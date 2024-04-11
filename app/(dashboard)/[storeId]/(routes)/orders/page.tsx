import OrdersClientComp from "@/components/order/OrdersClientComp";

const OrdersPage = async ({ params }: { params: { storeId: string } }) => {
  
  return (
    <>
      <OrdersClientComp storeId={params.storeId} />
    </>
  );
};

export default OrdersPage;
