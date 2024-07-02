"use client";
import { useAppDispatch } from "@/redux/hooks";
import { setOpenSidebar } from "@/redux/slice";
import { MenuIcon } from "lucide-react";

const Menu = () => {
  const dispatch = useAppDispatch();

  return (
    <MenuIcon
      size={20}
      className="lg:hidden flex-shrink-0"
      onClick={() => dispatch(setOpenSidebar())}
    />
  );
};

export default Menu;
