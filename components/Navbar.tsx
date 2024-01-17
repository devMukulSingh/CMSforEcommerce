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
            href:`/${storeId}/settings`
        },
        
    ]
  return (
    <>
        <nav className="w-full
            h-24
            flex
            gap-4
            px-5
            items-center
            ">
            <StoreSwitcher items={store}/>
            {
                routes.map( (route) => (
                    <Link  href={route.href} 
                        className="text-xl  ">
                        Settings
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