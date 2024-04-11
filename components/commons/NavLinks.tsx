"use client";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

const NavLinks = () => {
  const pathName = usePathname();
  const { storeId } = useParams();
  const routes = [
    {
      href: `/${storeId}`,
      label: "Overview",
      active: pathName === `/${storeId}`,
    },
    {
      href: `/${storeId}/billboards`,
      label: "Billboards",
      active: pathName === `/${storeId}/billboards`,
    },
    {
      href: `/${storeId}/brands`,
      label: "Brand",
      active: pathName === `/${storeId}/brands`,
    },
    {
      href: `/${storeId}/categories`,
      label: "Categories",
      active: pathName === `/${storeId}/categories`,
    },

    {
      href: `/${storeId}/colors`,
      label: "Color",
      active: pathName === `/${storeId}/colors`,
    },
    {
      href: `/${storeId}/sizes`,
      label: "Size",
      active: pathName === `/${storeId}/sizes`,
    },
    {
      href: `/${storeId}/products`,
      label: "Products",
      active: pathName === `/${storeId}/products`,
    },
    {
      href: `/${storeId}/orders`,
      label: "Orders",
      active: pathName === `/${storeId}/orders`,
    },

    {
      href: `/${storeId}/settings`,
      label: "Settings",
      active: pathName === `/${storeId}/settings`,
    },
  ];

  return (
    <>
      <main className="lg:flex md:flex gap-3 lg:gap-5 md:gap-3 flex-shrink hidden ">
        {routes.map((route) => (
          <Link
             prefetch={true}
            href={route.href}
            key={route.href}
            className={` ${route.active ? "font-bold" : ""} text-xl md:text-lg sm:text-md`}
          >
            {route.label}
          </Link>
        ))}
      </main>
    </>
  );
};

export default NavLinks;
