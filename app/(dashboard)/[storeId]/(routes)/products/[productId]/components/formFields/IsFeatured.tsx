import React, { FC, } from "react";
import { Iform } from "../ProductForm";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";


const IsFeatured: FC<Iform> = ({ form, loading }) => {

  return (
    <>
      <FormField
        control={form.control}
        name="isFeatured"
        render={({ field }) => (
          <FormItem className="border p-3">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                className="mr-4"
              />
            </FormControl>
            <FormMessage />
            <FormLabel>isFeatured</FormLabel>
            <FormDescription>
              Items checked will be shown on the home page
            </FormDescription>
          </FormItem>
        )}
      />
    </>
  );
};

export default IsFeatured;
