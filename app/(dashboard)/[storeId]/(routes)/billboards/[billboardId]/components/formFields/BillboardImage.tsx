import React, { FC } from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ImageUpload from '@/components/ui/image-upload';
import { Iform } from '../BillboardForm';

const BillboardImage:FC<Iform> = ({
    loading,form
}) => {
  return (
    <div>
      {" "}
      <FormField
        control={form.control}
        name="images"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Add Image</FormLabel>
            <FormControl>
              <ImageUpload
                onRemove={(url) =>
                  field.onChange([
                    ...field.value.filter((img) => img.url !== url),
                  ])
                }
                disabled={loading || false}
                onChange={(url) => field.onChange([...field.value, { url }])}
                value={field?.value?.map((img) => img.url)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      ></FormField>
    </div>
  );
}

export default BillboardImage