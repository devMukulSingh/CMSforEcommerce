"use client"
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { TrashIcon } from "lucide-react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category, Color, Product, Size } from "@prisma/client";
import React, { useState } from "react";
import { Separator } from "../ui/separator";
import axios from "axios";
import { useParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { AlertModal } from "../modals/AlertModal";
import ImageUpload from "../ui/image-upload";
import { Select, SelectContent, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { Checkbox } from "../ui/checkbox";

interface IproductFormProps{
    initialValues : Product[],
    categories : Category[],
    colors : Color[],
    sizes : Size[],

}

const formSchema = z.object({
    name: z.string().min(1),
    price: z.coerce.number().min(1),
    image: z.object({ url: z.string() }).array(),
    category : z.string().min(1),
    color:z.string().min(1),
    size : z.string().min(1),
    isFeatured : z.boolean().default(false).optional(),
    isArchived : z.boolean().default(false).optional(),
})
type productFormValues = z.infer<typeof formSchema>;

const ProductForm : React.FC<IproductFormProps> = ( {
    initialValues,
    categories,
    colors,
    sizes

} ) => {
    const [openDeleteAlert, setOpenDeleteAlert] = useState<boolean>(false);
    const params = useParams();
    const router = useRouter();
    const { storeId,productId } = params;
    const [loading, setLoading] = useState(false);

    const form = useForm<productFormValues>({
        resolver : zodResolver(formSchema),
        defaultValues : initialValues ? 
        { ...initialValues, price: parseFloat(String(initialValues ))}
        :
         {
            name: "",
            price: 0,
            image: [],
            category : "",
            color:"",
            size : "",
            isFeatured :false,
            isArchived : false
        }
    });
    const onSubmit = async( data:productFormValues) => {
        try {
            setLoading(true);
            if(initialValues){
                const res = await axios.patch(`/api/${storeId}/product/${productId}`,data);
                toast.success("product updated");
            }
            else{
                const res = await axios.post(`/api/${storeId}/product`,data);
                toast.success("product created");
                router.push(`/${storeId}/products`)
            }
            router.refresh();
        } catch (error) {
            toast.error("Something went wrong");
            console.log(`Error in onSubmit ${error}`);
        }
    finally{
        setLoading(false);
    }
    }
    const handleDeleteStore = async() => {
        try{
            setLoading(true);
            const res = await axios.delete(`/api/${storeId}/product/${productId}`);
            toast.success("product Deleted");
            setOpenDeleteAlert(false);
            router.push(`/${storeId}/products`);  
        }
        catch(e){
            toast.error("Something went wrong");
            console.log(`Error in handleDeleteStore ${e}`);
        }
        finally{
            setLoading(false);
        }
    }
  return (
        <>
            <AlertModal
                loading={loading}
                isOpen={openDeleteAlert}
                onClose={ () => setOpenDeleteAlert(false)}
                onConform={ handleDeleteStore }

            />
            <main className="flex flex-col gap-6 px-10 py-2">
                <header className="flex justify-between ">
                    <section>
                        <h1 className="text-2xl font-bold">
                           { initialValues ? `Edit product`: `Create product` }
                        </h1>
                        <p className="text-sm">Manage Product Preferences</p>
                    </section>
                    <Button onClick={ () => setOpenDeleteAlert(true) }
                        disabled={loading}
                        variant="destructive" size="icon">
                        <TrashIcon/>
                    </Button>
                </header>
                <Separator/>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-3 gap-3">

                            {/* name */}
                        <FormField
                            control={form.control}
                            name="name"                            
                            render = { ({field}) => (
                            <FormItem>
                                <FormLabel>product name</FormLabel>
                            <FormControl>
                            <Input placeholder="name" {...field} autoComplete="off" />
                                </FormControl>
                                </FormItem>
                                )}
                                >
                            </FormField>
                            
                            {/* price */}
                            <FormField
                            control={form.control}
                            name="price"                            
                            render = { ({field}) => (
                            <FormItem>
                                <FormLabel>Price</FormLabel>
                            <FormControl>
                            <Input placeholder="price" {...field} autoComplete="off" />
                                </FormControl>
                                </FormItem>
                                )}
                                >
                            </FormField>

                              
                            <FormField
                                control={form.control}
                                name="color"                            
                                render = { ({field}) => (
                                <FormItem>
                                    <FormLabel>Color</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        disabled={loading}
                                        value={field.value}
                                    >
                                        <SelectItem value={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectLabel>Select Color</SelectLabel>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {
                                            colors.map( (color) => (
                                                <SelectItem 
                                                    value={color.id}
                                                    key={color.id}
                                                >{color.value}</SelectItem>
                                            ))
                                        }
                                    </SelectContent>
                                        </SelectItem>
                                    </Select>
                                </FormItem>
                                )}
                                >
                            </FormField>

                                {/* size */}
                            <FormField
                                control={form.control}
                                name="size"                            
                                render = { ({field}) => (
                                <FormItem>
                                    <FormLabel>Size</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Size" {...field} autoComplete="off" />
                                    </FormControl>
                                </FormItem>
                                    )}
                            >
                            </FormField>
                                {/* category */}
                            <FormField
                                control={form.control}
                                name="category"                            
                                render = { ({field}) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                            disabled={loading} 
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select category" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {
                                                    categories.map( (category) => (
                                                        <SelectItem value={category.name} key={category.id}>
                                                            {category.name}
                                                        </SelectItem>
                                                    ))
                                                }
                                            </SelectContent>
                                        </Select>
                                </FormItem>
                                )}
                                >
                            </FormField>
                                
                                {/* isfeatured */}
                            <FormField
                                control={form.control}
                                name="isFeatured"
                                render={ ({field}) => (
                                    <FormItem className="border p-3">
                                        <FormControl>
                                            <Checkbox id="isFeatured" className="mr-4"/>
                                        </FormControl>
                                        <FormLabel>isFeatured</FormLabel>
                                        <FormDescription>
                                            Items checked will be shown on the home page
                                        </FormDescription>
                                    </FormItem>
                                )}
                            >
                            </FormField>

                                    {/* Archived */}
                            <FormField
                                control={form.control}
                                name="isArchived"
                                render={ ({field}) => (
                                    <FormItem className="border p-3">
                                        <FormControl >
                                            <Checkbox id="isArchived" className="mr-4"/>
                                        </FormControl>
                                        <FormLabel>isArchived</FormLabel>
                                        <FormDescription>
                                            Items checked will not be show in the store
                                        </FormDescription>
                                    </FormItem>
                                )}
                            >
                            </FormField>

                                    {/* image */}
                            <FormField
                            control={form.control}
                            name="image"                            
                            render = { ({field}) => (
                            <FormItem>
                                <FormLabel>Add Image</FormLabel>
                                <FormControl>
                                <ImageUpload
                                    onRemove={ (url) => field.onChange( [...field.value.filter( (currImg) => currImg.url !== url )] ) }
                                    disabled={loading}
                                    onChange={ (url) => field.onChange([...field.value, {url}])} //inside onChange, we are passing imageUrl as the image gets uploaded
                                    value={ field.value.map( image => image.url) } />
                                </FormControl>
                                </FormItem>
                                )}
                                >
                                </FormField>
                        </div>
                        <Button type="submit" 
                                className="w-32 cursor-pointer mt-5"
                                disabled={loading}
                                >
                                { initialValues ? 'Save Changes' : 'Create'} 
                            </Button>
                    </form>
                </Form>
            </main>
    </>
  )
}

export default ProductForm;

