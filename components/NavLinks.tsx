"use client"
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
const NavLinks = () => {
    const pathName = usePathname();
    const { storeId } = useParams();
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
            href:`/${storeId}/categories`,
            label : 'Categories',
            active : pathName === `/${storeId}/categories`
        },
        
        {
            href:`/${storeId}/settings`,
            label : 'Settings',
            active : pathName === `/${storeId}/settings`
        },
    ]
  return (
    <main className="flex gap-10">
        {
            routes.map( (route) => (
                <Link href={route.href} 
                        className={` ${route.active ? 'font-bold' : ''} text-xl`}>
                    {route.label}
                </Link>
            ))
        }
    </main>
  )
}

export default NavLinks