"use client"

import { ColumnDef } from "@tanstack/react-table"
import ProductActions from "./ProductActions";
import { Image } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductColumn = {
  id: string;
  name: string;
  color: string;
  size: string;
  price: string;
  category:string;
  isFeatured:boolean;
  isArchived:boolean;
  createdAt: string;
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
  {
    accessorKey: "size",
    header: "Size",
  },
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
    id: 'actions',
    cell : ({row}) => <ProductActions data={row.original} />
  }

]

