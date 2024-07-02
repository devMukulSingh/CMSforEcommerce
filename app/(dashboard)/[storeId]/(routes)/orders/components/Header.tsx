import SearchBar from "@/components/commons/SearchBar";
import { OrdersColumn } from "@/components/ui/OrdersColumn";
import React, { FC } from "react";

interface HeaderProps {
  orders: OrdersColumn[];
}

const Header: FC<HeaderProps> = ({ orders }) => {
  return (
    <>
      <header className="md:flex-row flex flex-col gap-5 md:gap-10 items-start md:items-center ">
        <div className="w-fit">
          <h1 className="text-xl md:text-2xl font-bold">
            Orders({orders?.length || 0})
          </h1>
          <p className="text-sm text-slate-500">Manage orders</p>
        </div>
        <div className="flex items-center md:w-2/3 w-full md:gap-5 gap-3">
          <SearchBar tableData={orders} />
        </div>
      </header>
    </>
  );
};

export default Header;
