"use client";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm, UseFormReturn } from "react-hook-form";
import { TrashIcon } from "lucide-react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Brand, Category, Color, Image, Product, Size } from "@prisma/client";
import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { useParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { AlertModal } from "@/components/modals/AlertModal";
import Loader from "@/components/commons/Loader";
import { productSchema } from "@/lib/formSchemas";
import ProductName from "./formFields/ProductName";
import ProductPrice from "./formFields/ProductPrice";
import IsFeatured from "./formFields/IsFeatured";
import ProductDescription from "./formFields/ProductDescription";
import IsArchived from "./formFields/IsArchived";
import ProductImage from "./formFields/ProductImage";
import ProductQuantity from "./formFields/ProductQuantity";
import ProductRating from "./formFields/ProductRating";
const ProductCategory = dynamic(() => import("./formFields/ProductCategory"));
const ProductBrand = dynamic(() => import("./formFields/ProductBrand"));
const ProductColor = dynamic(() => import("./formFields/ProductColor"));

export interface IinitialValues {
  name: string | undefined;
  price: number | undefined;
  quantity: number | undefined;
  categoryId: string | undefined;
  colorId: string | undefined;
  images: Image[] | undefined;
  sizeId: string | undefined;
  archived: boolean | undefined;
  featured: boolean | undefined;
  description: string | undefined;
  ratings: number | undefined;
}
type productFormValues = z.infer<typeof productSchema>;

interface IproductFormProps {
  initialValues: IinitialValues;
}
export interface Iform {
  form: UseFormReturn<productFormValues, any, undefined>;
  loading?: boolean;
  colors?: Color[];
  brands?: Brand[];
  categories?: Category[];
}

const ProductForm: React.FC<IproductFormProps> = ({ initialValues }) => {
  const [openDeleteAlert, setOpenDeleteAlert] = useState<boolean>(false);
  const params = useParams();
  const router = useRouter();
  const { storeId, productId } = params;
  const [loading, setLoading] = useState(false);

  const form = useForm<productFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: initialValues
      ? {
          ...initialValues,
          ratings: parseFloat(String(initialValues?.ratings)),
        }
      : {
          name: "",
          price: 0,
          images: [],
          categoryId: "",
          colorId: "",
          sizeId: "",
          description: "",
          isFeatured: false,
          isArchived: false,
          ratings: 0.0,
          brandId: "",
          quantity: 1,
        },
  });
  const onSubmit = async (data: productFormValues) => {
    try {
      setLoading(true);
      if (initialValues) {
        await axios.patch(`/api/${storeId}/product/${productId}`, data);
        toast.success("product updated");
        router.push(`/${storeId}/products`);
      } else {
        await axios.post(`/api/${storeId}/product`, data);
        toast.success("product created");
        router.push(`/${storeId}/products`);
      }
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
      console.log(`Error in onSubmit ${error}`);
    } finally {
      setLoading(false);
    }
  };
  const handleProductDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${storeId}/product/${productId}`);
      setOpenDeleteAlert(false);
      toast.success("Product deleted");
      router.push(`/${storeId}/products`);
    } catch (e) {
      toast.error("Something went wrong");
      console.log(`Error in handleProductDelete ${e}`);
    } finally {
      setLoading(false);
    }
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <>
      <AlertModal
        loading={loading}
        isOpen={openDeleteAlert}
        onClose={() => setOpenDeleteAlert(false)}
        onConform={handleProductDelete}
      />
      <div className="flex flex-col gap-6 px-10 py-2">
        <header className="flex justify-between ">
          <section>
            <h1 className="text-2xl font-bold">
              {initialValues ? `Edit product` : `Create product`}
            </h1>
            <p className="text-sm">Manage Product Preferences</p>
          </section>
          <Button
            className={` ${!initialValues ? "hidden" : ""}`}
            onClick={() => setOpenDeleteAlert(true)}
            disabled={loading}
            variant="destructive"
            size="icon"
          >
            <TrashIcon />
          </Button>
        </header>
        <Separator />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-3 gap-5">
              <ProductName form={form} />

              <ProductPrice form={form} />

              <ProductCategory form={form} />

              <IsFeatured form={form} />

              <IsArchived form={form} />

              <ProductImage form={form} />

              <ProductBrand form={form} />

              <ProductColor form={form} />

              <ProductQuantity form={form} />

              <ProductRating form={form} />

              <ProductDescription form={form} />
            </div>

            <Button
              type="submit"
              className="w-32 cursor-pointer mt-5 flex gap-2"
              disabled={loading}
            >
              {initialValues ? "Save Changes" : "Create"}
              {loading && <Loader />}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default ProductForm;

{
  /* <FormField
                                control={form.control}
                                name="sizeId"                            
                                render = { ({field}) => (
                                <FormItem>
                                    <FormLabel>Size</FormLabel>
                                    <Select
                                        onValueChange={field.onChange} 
                                        value={field.value}             
                                        disabled={loading}              
                                        defaultValue={field.value} 
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="SelectSize"/>
                                            </SelectTrigger>
                                        </FormControl>

                                        <SelectContent>
                                            {
                                                sizes.map( (size) => (
                                                    <SelectItem
                                                        value={size.id}
                                                        key={size.id}
                                                    >
                                                        {size.name}
                                                    </SelectItem>
                                                ) )
                                            }
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                                )}
                            >
                            </FormField> */
}
