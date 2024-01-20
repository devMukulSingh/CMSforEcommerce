"use client"
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { TrashIcon } from "lucide-react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Billboard } from "@prisma/client";
import React, { useState } from "react";
import { Separator } from "./ui/separator";
import axios from "axios";
import { useParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { AlertModal } from "./modals/AlertModal";
import ImageUpload from "./ui/image-upload";

interface IbillboardFormProps{
    initialValues : Billboard | null
}

const formSchema = z.object({
    label: z.string().min(1),
    imageUrl : z.string().min(1)
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
            imageUrl:''
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
            const res = await axios.delete(`/api/${storeId}/billboard/${billboardId}`);
            toast.success("Billboard Deleted");
            router.refresh();

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
                            name="imageUrl"                            
                            render = { ({field}) => (
                            <FormItem>
                                <FormLabel>Add Image</FormLabel>
                                <FormControl>
                                <ImageUpload
                                    onRemove={ () => field.onChange("") }
                                    disabled={loading}
                                    onChange={ (url) => field.onChange(url) }
                                    value={ field.value ? [field.value] : [] } />
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

