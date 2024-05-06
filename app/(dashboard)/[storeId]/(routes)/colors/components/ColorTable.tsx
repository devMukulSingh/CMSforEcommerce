import React, { FC } from "react";
import Header from "./Header";
import { DataTable } from "@/components/commons/DataTable";
import { ColorColumn, columns } from "@/components/ui/ColorColumn";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { ColorClientProps } from "./ColorClientComp";
import { getColors } from "@/actions/get-colors";

const ColorTable: FC<ColorClientProps> = async ({ storeId }) => {
  const colors = await getColors(storeId);
  return (
    <>
      <Header colors={colors} />
      <DataTable columns={columns} data={colors} />
    </>
  );
};

export default ColorTable;
