"use client"
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { TrashIcon } from "lucide-react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Billboard, Image } from "@prisma/client";
import React, { useState } from "react";
import { Separator } from "../ui/separator";
import axios from "axios";
import { useParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { AlertModal } from "../modals/AlertModal";
import ImageUpload from "../ui/image-upload";

export interface IbillboardFormProps{
    initialValues : Billboard | null & Image[] | null
}

const formSchema = z.object({
    label: z.string().min(1),
    images : z.object({ url:z.string() }).array().min(1),
})
type BillboardFormValues = z.infer<typeof formSchema>;

const BillboardForm : React.FC<IbillboardFormProps> = ( {initialValues} ) => {
    const [openDeleteAlert, setOpenDeleteAlert] = useState<boolean>(false);
    const params = useParams();
    const router = useRouter();
    const { storeId,billboardId } = params;
    const [loading, setLoading] = useState(false);

    const form = useForm<BillboardFormValues>({
        resolver : zodResolver(formSchema),
        defaultValues : initialValues || {
            label: '',
            images:[
                {url:''}
            ],
        } 
    });
    const onSubmit = async( data:BillboardFormValues) => {
        try {
            setLoading(true);
            if(initialValues){
                const res = await axios.patch(`/api/${storeId}/billboard/${billboardId}`,data);
                toast.success("Billboard updated");
            }
            else{
                const res = await axios.post(`/api/${storeId}/billboard`,data);
                toast.success("Billboard created");
                router.push(`/${storeId}/billboards`)
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
    const handleBillboardDelete = async() => {
        try{
            setLoading(true);
            const res = await axios.delete(`/api/${storeId}/billboard/${billboardId}`);
            if(res.status === 200 ) toast.success("Billboard deleted");
            else if (res.status === 500 ) toast.error("Something went wrong");
            setOpenDeleteAlert(false);
            router.push(`/${storeId}/billboards`);  
        }
        catch(e){
            toast.error("Something went wrong");
            console.log(`Error in handleBillboardDelete ${e}`);
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
                onConform={ handleBillboardDelete }

            />
            <main className="flex flex-col gap-6 px-10 py-2">
                <header className="flex justify-between ">
                    <section>
                        <h1 className="text-2xl font-bold">
                           { initialValues ? `Edit Billboard`: `Create Billboard` }
                        </h1>
                        <p className="text-sm">Manage Billboard Preferences</p>
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
                      <div className="flex gap-4 flex-col">
                        <FormField
                            control={form.control}
                            name="images"                            
                            render = { ({field}) => (
                            <FormItem>
                                <FormLabel>Add Image</FormLabel>
                                <FormControl>
                                <ImageUpload
                                    onRemove={ (url) => field.onChange( [...field.value.filter( img => img.url !== url)] )}
                                    disabled={loading}
                                    onChange={ (url) => field.onChange([...field.value,{url}]) }
                                    value={ field?.value?.map( img => img.url ) }/>
                                </FormControl>
                                </FormItem>
                                )}
                                >
                                </FormField>

                        <FormField
                            control={form.control}
                            name="label"                            
                            render = { ({field}) => (
                            <FormItem>
                                <FormLabel>Billboard name</FormLabel>
                            <FormControl>
                            <Input placeholder="name" {...field} autoComplete="off" />
                                </FormControl>
                                </FormItem>
                                )}
                                >
                            </FormField>

                            <Button type="submit" 
                                className="w-32 cursor-pointer"
                                disabled={loading}
                                >
                                { initialValues ? 'Save Changes' : 'Create'} 
                            </Button>
                        </div>
                    </form>
                </Form>
            </main>
    </>
  )
}

export default BillboardForm;

