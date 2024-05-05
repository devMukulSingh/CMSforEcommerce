import React, { FC, useState } from "react";
import { Iform } from "../ProductForm";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

const ProductRating: FC<Iform> = ({ form}) => {

  return (
    <>
      <FormField
        control={form.control}
        name="ratings"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Add Ratings</FormLabel>
            <FormControl>
              <Input placeholder="Ratings" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default ProductRating;
