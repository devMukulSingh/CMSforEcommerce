import { UserButton, auth } from "@clerk/nextjs"
import StoreSwitcher from "./StoreSwitcher"
import { redirect, useParams, usePathname } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Separator } from "../ui/separator";
import Link from "next/link";
import NavLinks from "./NavLinks";

const Navbar = async( {storeId} : {storeId : string} ) => {

    const { userId } = auth();
    // const pathName = usePathname();
    if( !userId) redirect("/");
    const store = await prisma.store.findMany({
        where:{
            userId
        }
    });
    console.log(store);
  
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

            <NavLinks/>

            <section className="flex ml-auto">
                <UserButton afterSignOutUrl="/" />
            </section>
            
        </nav>
            <Separator/>
    </>
  )
}

export default Navbar