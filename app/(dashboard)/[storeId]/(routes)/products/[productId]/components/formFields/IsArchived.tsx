import React, { FC, useState } from "react";
import { Iform } from "../ProductForm";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
} from "@/components/ui/form";

import { Checkbox } from "@/components/ui/checkbox";

const IsArchived: FC<Iform> = ({ form, loading }) => {
  return (
    <>
      <FormField
        control={form.control}
        name="isArchived"
        render={({ field }) => (
          <FormItem className="border p-3 h-fit">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                className="mr-4"
              />
            </FormControl>
            <FormLabel>isArchived</FormLabel>
            <FormDescription>
              Items checked will not be show in the store
            </FormDescription>
          </FormItem>
        )}
      />
    </>
  );
};

export default IsArchived;
