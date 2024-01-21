"use client"
import { UserButton, auth } from "@clerk/nextjs"
import StoreSwitcher from "./StoreSwitcher"
import { redirect, useParams, usePathname } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Separator } from "./ui/separator";
import Link from "next/link";

const Navbar = async( {storeId} : {storeId : string} ) => {

    const { userId } = auth();
    const pathName = usePathname();
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
            label:'Overview',
            active : pathName === `/${storeId}`
        },
        {
            href:`/${storeId}/billboards`,
            label : 'Billboards',
            active : pathName === `/${storeId}/billboards`
        },
        {
            href:`/${storeId}/settings`,
            label : 'Settings',
            active : pathName === `/${storeId}/settings`
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
                        className={` ${route.active ? 'font-bold' : ''} text-xl`}>
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