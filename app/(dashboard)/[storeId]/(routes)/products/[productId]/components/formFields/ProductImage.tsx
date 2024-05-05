import React, { FC, useState } from "react";
import { Iform } from "../ProductForm";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import ImageUpload from "@/components/ui/image-upload";

const ProductImage: FC<Iform> = ({ form, loading,  }) => {

  return (
    <>
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
                    ...field.value.filter((currImg) => currImg.url !== url),
                  ])
                }
                disabled={loading || false}
                onChange={(url) => field.onChange([...field.value, { url }])}
                value={field?.value?.map((image) => image.url)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      ></FormField>
    </>
  );
};

export default ProductImage;
