import { getAllProducts } from "@/actions/get-all-products";
import { getTotalRevenue } from "@/actions/get-total-revenue";
import Chart from "@/components/dashboard/Chart";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CreditCard, DollarSign, ShoppingBasket } from "lucide-react";

const DashboardPage = async() => {
    const { totalRevenue, totalOrders } = await getTotalRevenue(); 
    const productsStock = await getAllProducts();

    return(
        <main className="p-5 lg:p-15 md:p-10 space-y-10">
            <header>
                <h1 className="text-3xl font-bold">
                    Dasboard
                </h1>
                <h1 >
                    Manage Dashboard
                </h1>
            </header>
            <section className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 gap-3">
                <Card>
                    <CardHeader className="flex flex-row gap-3 items-center">
                        <h1>Total Revenue</h1>
                        <DollarSign className="ml-auto"/>
                    </CardHeader>
                    <CardContent className="mt-auto text-2xl font-semibold">
                        ₹{totalRevenue}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row gap-3 items-center">
                        Sales
                        <CreditCard className="ml-auto"/>
                    </CardHeader>
                    <CardContent className="mt-auto text-2xl font-semibold">
                        +{totalOrders}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row gap-3 items-center">
                        Product in Stock
                        <ShoppingBasket className="ml-auto"/>
                    </CardHeader>
                    <CardContent className="mt-auto text-2xl font-semibold">
                        {productsStock}
                    </CardContent>
                </Card>
            </section>
            
            {/* <Chart/> */}
            
        </main>
    )
}

export default DashboardPage;