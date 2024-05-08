"use client";
import React, { FC, useState } from "react";
import { Input } from "../ui/input";
import { Search, X } from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";
import { setTableData } from "@/redux/slice";
interface SearchBarProps {
  tableData: any;
}
export function SearchBar({ tableData }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const dispatch = useAppDispatch();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    const query = e.target.value.trim().toLowerCase();
    if (query !== "") {
      const filterdData = tableData.filter(
        (item: any) =>
          item?.name?.toLowerCase()?.includes(query) ||
          item?.customerName?.toLowerCase()?.includes(query),
      );
      dispatch(setTableData(filterdData));
    } else dispatch(setTableData(tableData));
  };

  const handleClearSearch = () => {
    setQuery("");
    dispatch(setTableData(tableData));
  };
  return (
    <div className="flex w-[40rem] ">
      <div
        className="
        flex 
        px-5 
        py-1 
        rounded-md 
        items-center 
        w-full
        focus-visible-ring-2
        border-2
        "
      >
        <Search className="cursor-pointer" />
        <Input
          className="focus-visible:ring-0 border-0 focus-visible:ring-offset-0 "
          onChange={handleChange}
          value={query}
          placeholder="Type here to search..."
        />
        <X onClick={handleClearSearch} className="cursor-pointer" />
      </div>
    </div>
  );
}

export default SearchBar;
