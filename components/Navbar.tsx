import { UserButton, auth } from "@clerk/nextjs"
import StoreSwitcher from "./StoreSwitcher"
import { redirect, useParams } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Separator } from "./ui/separator";
import Link from "next/link";

const Navbar = async( {storeId} : {storeId : string} ) => {

    const { userId } = auth();
    if( !userId) redirect("/");
    const store = await prisma.store.findMany({
        where:{
            userId
        }
    });
    console.log(store);
    const routes = [
        {
            href:`/${storeId}`,
            label:'Overview'
        },
        {
            href:`/${storeId}/billboards`,
            label : 'Billboards'
        },
        {
            href:`/${storeId}/settings`,
            label : 'Settings'
        },
        
    ]
  return (
    <>
        <nav className="w-full
            h-24
            flex
            gap-10
            px-5
            items-center
            ">
            <StoreSwitcher items={store}/>
            {
                routes.map( (route) => (
                    <Link  href={route.href} 
                        className="text-xl  ">
                        {route.label}
                    </Link>
                ))
            }
            <section className="flex ml-auto">
                <UserButton afterSignOutUrl="/" />
            </section>
        </nav>
            <Separator/>
    </>
  )
}

export default Navbar