"use client";
import { useAppDispatch } from "@/redux/hooks";
import { setOpenSidebar } from "@/redux/slice";
import { MenuIcon } from "lucide-react";

const Menu = () => {
  const dispatch = useAppDispatch();

  return (
    <MenuIcon
      className="lg:hidden"
      onClick={() => dispatch(setOpenSidebar())}
    />
  );
};

export default Menu;
