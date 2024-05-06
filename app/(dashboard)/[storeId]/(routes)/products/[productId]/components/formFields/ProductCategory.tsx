import React, { FC, useState } from "react";
import { Iform } from "../ProductForm";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import AddCategoryModal from "@/components/modals/AddCategoryModal";
import useSWR from "swr";
import { useParams } from "next/navigation";
import { fetcher } from "@/lib/utils";
import { Category } from "@prisma/client";
import Loader from "@/components/commons/Loader";


const ProductCategory: FC<Iform> = ({ form, loading }) => {
  const  { storeId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const handleOnClose = () => {
    setIsOpen(false);
  };
  const { data, error, isLoading } = useSWR(
    `/api/${storeId}/category`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
    }
  );
  if(error) console.log(`Error in getCategories`,error);
  
  return (
    <>
      <AddCategoryModal isOpen={isOpen} onClose={handleOnClose} />
      <FormField
        control={form.control}
        name="categoryId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Category</FormLabel>
            <Select
              onValueChange={field.onChange}
              value={field.value}
              defaultValue={field.value}
              disabled={loading || isLoading}
            >
              <FormControl>
                <SelectTrigger>
                  {
                  isLoading ? <Loader/>:
                  <SelectValue placeholder="Select category" />
                }
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {data?.map((category: Category) => (
                  <SelectItem value={category.id} key={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
                <Button
                  onClick={() => setIsOpen(true)}
                  variant="ghost"
                  className="
                            flex 
                            w-full 
                            gap-2 
                            items-center
                            justify-start
                            "
                >
                  <PlusCircle />
                  Add Category
                </Button>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default ProductCategory;
