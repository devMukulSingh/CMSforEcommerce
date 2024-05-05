import React, { FC } from 'react'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Iform } from '../CategoryForm';

import { Input } from '@/components/ui/input';
const CategoryName:FC<Iform> = ({
    form,loading
}) => {
  return (
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Category Name</FormLabel>
          <FormControl>
            <Input
              disabled={loading}
              placeholder="name"
              {...field}
              autoComplete="off"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    ></FormField>
  );
}

export default CategoryName
