"use client"

import { ColumnDef } from "@tanstack/react-table"
import ProductActions from "./ProductActions";
import { Decimal } from "@prisma/client/runtime/library";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductColumn = {
  id: string;
  name: string;
  color: string;
  // size: string | undefined;
  price: number;
  description : string | undefined,
  category:string;
  isFeatured:boolean;
  isArchived:boolean;
  createdAt: string;
  ratings : Decimal | null;
  brand : string 
}

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "color",
    header: "Color",
  },
  // {
  //   accessorKey: "size",
  //   header: "Size",
  // },
  {
    accessorKey: "isFeatured",
    header: "isFeatured",
  },
  {
    accessorKey: "isArchived",
    header: "isArchived",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    accessorKey: "brand",
    header: "Brand",
  },
  {
    accessorKey: "ratings",
    header: "Rating",
  },
  {
    id: 'actions',
    cell : ({row}) => <ProductActions data={row.original} />
  }

]

