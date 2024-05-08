import SearchBar from "@/components/commons/SearchBar";
import { OrdersColumn } from "@/components/ui/OrdersColumn";
import React, { FC } from "react";

interface HeaderProps {
  orders: OrdersColumn[];
}

const Header: FC<HeaderProps> = ({ orders }) => {
  return (
    <>
      <header className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-20">
        <div>
          <h1 className="text-2xl font-bold">Orders({orders.length})</h1>
          <p className="text-sm text-slate-500">Manage orders</p>
        </div>

        <SearchBar tableData={orders} />
      </header>
    </>
  );
};

export default Header;
