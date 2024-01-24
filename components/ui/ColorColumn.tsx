import { ColumnDef } from "@tanstack/react-table";
import ColorActions from "./ColorActions";


export type ColorColumn = {
    value:string;
    id:string;
    createdAt:string;
}

export const columns:ColumnDef<ColorColumn>[] = [
    {
        accessorKey:'id',
        header:'Id',
    },
    {
        accessorKey:'value',
        header:'Value',
    },
    {
        accessorKey:'createdAt',
        header:'Date',
    },
    {
        id:'actions',
        cell : ({row}) => <ColorActions data ={row.original} />
    }
]