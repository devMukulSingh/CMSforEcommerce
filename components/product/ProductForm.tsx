"use client"
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { ControllerRenderProps, useForm} from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Plus, PlusCircle, PlusSquare, TrashIcon } from "lucide-react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Brand, Category, Color, Image, Product, Size } from "@prisma/client";
import React, { useRef, useState } from "react";
import { Separator } from "../ui/separator";
import axios from "axios";
import { useParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { AlertModal } from "../modals/AlertModal";
import ImageUpload from "../ui/image-upload";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { ProductColumn } from "../ui/ProductColumn";
import { Textarea } from "../ui/textarea";
import { Decimal } from "@prisma/client/runtime/library";
export interface IinitialValues {
    name: string | undefined;
    price: number | undefined;
    categoryId :string | undefined  ;
    colorId : string |undefined,
    images: Image[] | undefined,
    sizeId : string | undefined,
    archived: boolean | undefined,
    featured: boolean | undefined,
    description: string | undefined,
    ratings : number | undefined,
}
interface IproductFormProps{
    initialValues : IinitialValues
    categories : Category[],
    colors : Color[],
    sizes : Size[],
    brands : Brand[],
}

const formSchema = z.object({
    name: z.string().min(1),
    price: z.coerce.number().positive().min(1),
    images: z.object({ url: z.string() }).array(),
    categoryId : z.string().min(1),
    colorId:z.string().min(1),
    sizeId : z.string().optional(),
    brandId : z.string(),
    description : z.string().optional(),
    isFeatured : z.boolean().default(false).optional(),
    isArchived : z.boolean().default(false).optional(),
    ratings : z.coerce.number().positive().min(1,"Enter between 1 and 5").max(5,"Enter between 1 and 5"),
})
type productFormValues = z.infer<typeof formSchema>;

const ProductForm : React.FC<IproductFormProps> = ( {
    initialValues,
    categories,
    colors,
    sizes,
    brands,

} ) => {

    
    const [openDeleteAlert, setOpenDeleteAlert] = useState<boolean>(false);
    const params = useParams();
    const router = useRouter();
    const { storeId,productId } = params;
    const [loading, setLoading] = useState(false);
    const isInitalValues = Object.keys(initialValues).length > 0

    const form = useForm<productFormValues>({
        resolver : zodResolver(formSchema),
        defaultValues : isInitalValues ? 
        { ...initialValues, ratings:parseFloat(String(initialValues?.ratings)),}
        :
         {
            name: "",
            price: 0,
            images: [],
            categoryId : "",
            colorId:"",
            sizeId : "",
            description:"",
            isFeatured :false,
            isArchived : false,
            ratings : 0.0,
            brandId:"",
        }
    });
    const onSubmit = async( data:productFormValues) => {
        // data.description = points;
        // console.log(data);
        
        try {
            setLoading(true);
            if(isInitalValues){
                const res = await axios.patch(`/api/${storeId}/product/${productId}`,data);
                 toast.success("product updated");
                router.push(`/${storeId}/products`);
                 
            }
            else{
                const res = await axios.post(`/api/${storeId}/product`,data);
                toast.success("product created");
                router.push(`/${storeId}/products`);

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
    const handleProductDelete = async() => {
        try{
            setLoading(true);
            const res = await axios.delete(`/api/${storeId}/product/${productId}`);
            setOpenDeleteAlert(false);
            toast.success("Product deleted");
            router.push(`/${storeId}/products`);  
        }
        catch(e){
            toast.error("Something went wrong");
            console.log(`Error in handleProductDelete ${e}`);
        }
        finally{
            setLoading(false);
        }
    }


    //////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
        <>
            <AlertModal
                loading={loading}
                isOpen={openDeleteAlert}
                onClose={ () => setOpenDeleteAlert(false)}
                onConform={ handleProductDelete }

            />
            <main className="flex flex-col gap-6 px-10 py-2">
                <header className="flex justify-between ">
                    <section>
                        <h1 className="text-2xl font-bold">
                           { isInitalValues ? `Edit product`: `Create product` }
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
                        <div className="grid grid-cols-3 gap-5">

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

                            {/* <FormField>(internally it uses <Controller> component) 
                            is a wrapper component, so that we can use react hook form with external libraries
                            it provides field object, which contains methods, such as onChange,onBlur,value to the child component*/}
 
                            <FormField
                                control={form.control}
                                name="colorId"                            
                                render = { ({field}) => (
                                <FormItem>
                                    <FormLabel>Color</FormLabel>
                                    <Select
                                        // onValueChange => triggers as soon any value changes in the select field
                                        // field.onChange => is a method of react-hook-form, which will get the values 
                                        // of the field as soon as the value of the (Select) field changes and pass it to the react form
                                        onValueChange={field.onChange}  //2nd step
                                        // value prop => it will be used to  show what current value is selected in the select field .
                                        //contains, what is the current value of the <Select> field selected               
                                        //field.value => contains the value of the field which is selected by the user, using the 
                                        // select dropdown
                                        value={field.value} //3rd step
                                        disabled={loading}              
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="SelectColor"/>
                                            </SelectTrigger>
                                        </FormControl>

                                        <SelectContent>
                                            {
                                                colors.map( (color) => (
                                                    <SelectItem
                                                        // value referred to what value is selected, using select dropdown
                                                        // this value is then passed to the react form using <Form Control>,
                                                        // so that we can get what value is selected (above)
                                                        value={color.id} //1st step
                                                        key={color.id}
                                                    >
                                                        {color.name}
                                                    </SelectItem>
                                                ))
                                            }
                                        </SelectContent>
                            
                                    </Select>
                                </FormItem>
                                )}
                                >
                            </FormField>

                                {/* size */}
                            {/* <FormField
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
                            </FormField> */}
                                {/* category */}
                            <FormField
                                control={form.control}
                                name="categoryId"                            
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
                                                        <SelectItem 
                                                            value={category.id} 
                                                            key={category.id}>
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
                                            <Checkbox 
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                                className="mr-4"
                                                />
                                        </FormControl>
                                        <FormLabel>isFeatured</FormLabel>
                                        <FormDescription>
                                            Items checked will be shown on the home page
                                        </FormDescription>
                                    </FormItem>
                                )}
                            >
                            </FormField>

                            {/* description */}
                            {/* inside field object
                            {name: 'description', value: Array(0), onChange: ƒ, onBlur: ƒ, ref: ƒ} */}
                            <FormField
                                control={form.control}
                                name="description"                            
                                render = { ({field}) => (
                                <FormItem >
                                    <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea 
                                                {...field} 
                                                className="h-60"
                                                placeholder="Add points" 
                                                // onChange={ (e) => setPoint(e.target.value)  }
                                                autoComplete="off" 
                                                 
                                                />
                                        </FormControl>
                                </FormItem>
                                )}
                                >
                            </FormField>

                                    {/* Archived */}
                            <FormField
                                control={form.control}
                                name="isArchived"
                                render={ ({field}) => (
                                    <FormItem className="border p-3 h-fit">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange} 
                                                className="mr-4"/>
                                        </FormControl>
                                        <FormLabel>isArchived</FormLabel>
                                        <FormDescription>
                                            Items checked will not be show in the store
                                        </FormDescription>
                                    </FormItem>
                                )}
                            >
                            </FormField>

                            <FormField
                                control={form.control}
                                name="ratings"
                                render={ ({field}) => (
                                    <FormItem>
                                        <FormLabel>Add Ratings</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Ratings" {...field}/>
                                        </FormControl>
                                    </FormItem>
                                )}
                            >
                                
                            </FormField>


                                    {/* image */}
                            <FormField
                                control={form.control}
                                name="images"                            
                                render = { ({field}) => (
                                <FormItem>
                                    <FormLabel>Add Image</FormLabel>
                                    <FormControl>
                                        <ImageUpload
                                            onRemove={ (url) => field.onChange( [...field.value.filter( (currImg) => currImg.url !== url )] ) }
                                            disabled={loading}
                                            //inside onChange, we are passing imageUrl as the image gets uploaded
                                            onChange={ (url) => field.onChange([...field.value, {url} ])} 
                                            value={ field?.value?.map( image => image.url) } />
                                    </FormControl>
                                </FormItem>
                                )}
                                >
                                </FormField>

                                {/* Brand */}
                                <FormField
                                    name="brandId"
                                    control={form.control}
                                    render={ ({field}) => (
                                        <FormItem>
                                            <FormLabel>Brand</FormLabel>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                    value={field.value}
                                                >
                                                    <SelectTrigger>
                                                        <FormControl>
                                                            <SelectValue placeholder="Select brand"/>
                                                        </FormControl>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {
                                                            brands.map( (brand) => (
                                                                <SelectItem
                                                                    value={brand.id}
                                                                    key={brand.id}
                                                                >
                                                                    {brand.name}
                                                                </SelectItem>
                                                            ))
                                                        }
                                                            
                                                    </SelectContent>
                                            <FormControl>

                                            </FormControl>
                                                </Select>
                                        </FormItem>
                                    )}
                                />
                        </div>

                        <Button type="submit" 
                                className="w-32 cursor-pointer mt-5"
                                disabled={loading}
                                >
                                { isInitalValues ? 'Save Changes' : 'Create'} 
                            </Button>
                    </form>
                </Form>
            </main>
    </>
  )
}

export default ProductForm;

