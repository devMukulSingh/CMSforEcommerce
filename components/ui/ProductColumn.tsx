"use client";

import { ColumnDef } from "@tanstack/react-table";
import ProductActions from "./ProductActions";
import { Decimal } from "@prisma/client/runtime/library";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductColumn = {
  id: string;
  name: string;
  color: string;
  price: number;
  description: string | undefined;
  category: string;
  isFeatured: boolean;
  isArchived: boolean;
  createdAt: string;
  ratings: Decimal | null;
  brand: string;
  quantity:number;
};

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
    accessorKey: "quantity",
    header: "Quantity",
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
    accessorKey: "color",
    header: "Color",
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
    id: "actions",
    cell: ({ row }) => <ProductActions data={row.original} />,
  },
];
