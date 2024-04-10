"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import Menu from "./Menu";
import { Separator } from "../ui/separator";
import { setOpenSidebar } from "@/store/slice";

const Sibebar = () => {
  const dispatch = useAppDispatch();
  const openSidebar = useAppSelector((state) => state.adminSlice.openSidebar);
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
  const handleSidebar = () => {
    if (openSidebar) {
      dispatch(setOpenSidebar());
    }
  };
  if (!openSidebar) return null;

  return (
    <>
      <main className="flex flex-col gap-5 w-52 h-[100vh] absolute top-0 z-10 px-5 py-8 transition-transform ease-in-out bg-white border ">
        <Menu />
        <div className="flex flex-col gap-3 ">
          {routes.map((route) => (
            <>
              <Link
                href={route.href}
                key={route.href}
                className={` ${route.active ? "font-bold" : ""} text-xl md:text-lg sm:text-md`}
                onClick={handleSidebar}
              >
                {route.label}
              </Link>
              <Separator />
            </>
          ))}
        </div>
      </main>
    </>
  );
};

export default Sibebar;
