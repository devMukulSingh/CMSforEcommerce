import React, { FC } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Iform } from "../BillboardForm";
import { Input } from "@/components/ui/input";

const BillboardName: FC<Iform> = ({ loading, form }) => {
  return (
    <FormField
      control={form.control}
      name="label"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Billboard name</FormLabel>
          <FormControl>
            <Input placeholder="name" {...field} disabled={loading} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default BillboardName;
