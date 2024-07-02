"use client";
import { useParams, usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, MenuIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

const Sibebar = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect( () => {
    setIsMounted(true)
  },[]);
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
      href: `/${storeId}/categories`,
      label: "Categories",
      active: pathName === `/${storeId}/categories`,
    },
    {
      href: `/${storeId}/sizes`,
      label: "Size",
      active: pathName === `/${storeId}/sizes`,
    },
    {
      href: `/${storeId}/colors`,
      label: "Color",
      active: pathName === `/${storeId}/colors`,
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
  const [open, setOpen] = useState(false);
  if(!isMounted) return null;
  return (
    <>
      <div className="block lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger>
            <Button variant="outline">
            <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent side={"left"}>
            <ul className=" flex flex-col gap-5">
            {routes?.map((route, index) => (
              <Link
                onClick={() => setOpen(false)}
                prefetch={true}
                href={route.href}
                key={index}
                className={` ${route.active ? "font-bold" : ""} text-lg `}
                >
                {route.label}
              </Link>
            ))}
            </ul>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default Sibebar;
