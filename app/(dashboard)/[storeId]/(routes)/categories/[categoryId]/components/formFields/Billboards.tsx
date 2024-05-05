import React, { FC } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Iform } from "../CategoryForm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useSwr from "swr";
import axios from "axios";
import { useParams } from "next/navigation";
import { Billboard } from "@prisma/client";
import Loader from "@/components/commons/Loader";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const Billboards: FC<Iform> = ({ form, loading, billboards }) => {
  const { storeId } = useParams();
  const { data, error, isLoading } = useSwr(
    `/api/${storeId}/billboard`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );
  if (error) console.log("Error in get billboards", error);

  return (
    <FormField
      control={form.control}
      name="billboardId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Billboard</FormLabel>
          <Select
            disabled={loading}
            onValueChange={field.onChange}
            value={field.value}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger disabled={isLoading}>
                {isLoading ? (
                  <Loader />
                ) : (
                  <SelectValue placeholder="Select Billboard" />
                )}
              </SelectTrigger>
            </FormControl>
            <FormMessage />

            <SelectContent>
              {data?.map((billboard: Billboard) => (
                <SelectItem value={billboard.id} key={billboard.id}>
                  {billboard.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
};

export default Billboards;
