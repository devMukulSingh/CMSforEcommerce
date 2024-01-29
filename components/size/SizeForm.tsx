"use client"
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { TrashIcon } from "lucide-react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Size } from "@prisma/client";
import React, { useState } from "react";
import { Separator } from "../ui/separator";
import axios from "axios";
import { useParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { AlertModal } from "../modals/AlertModal";

interface IclientFormProps{
    initialValues : Size,
}

const formSchema = z.object({
    name: z.string().min(1),
    value : z.string().min(1)
})
type ClientFormValues = z.infer<typeof formSchema>;

const SizeForm : React.FC<IclientFormProps> = ( {initialValues} ) => {
    const [openDeleteAlert, setOpenDeleteAlert] = useState<boolean>(false);
    const params = useParams();
    const router = useRouter();
    const { storeId,sizeId } = params;
    const [loading, setLoading] = useState(false);

    const form = useForm<ClientFormValues>({
        resolver : zodResolver(formSchema),
        defaultValues : initialValues || {
            name: '',
            value:''
        } 
    });
    const onSubmit = async( data:ClientFormValues) => {
        try {
            setLoading(true);
            if(initialValues){
                const res = await axios.patch(`/api/${storeId}/size/${sizeId}`,data);
                toast.success("Size updated");
            }
            else{
                const res = await axios.post(`/api/${storeId}/size`,data);
                toast.success("Size created");
                router.push(`/${storeId}/sizes`)
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
    const handleSizeDelete = async() => {
        try{
            setLoading(true);
            const res = await axios.delete(`/api/${storeId}/size/${sizeId}`);
            if(res.status === 200 ) toast.success("Size deleted");
            else if (res.status === 500 ) toast.error("Something went wrong");
            setOpenDeleteAlert(false);
            router.push(`/${storeId}/sizes`);  
        }
        catch(e){
            toast.error("Something went wrong");
            console.log(`Error in handleSizeDelete ${e}`);
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
                onConform={ handleSizeDelete }

            />
            <main className="flex flex-col gap-6 px-10 py-2">
                <header className="flex justify-between ">
                    <section>
                        <h1 className="text-2xl font-bold">
                           { initialValues ? `Edit size`: `Create size` }
                        </h1>
                        <p className="text-sm">Manage size Preferences</p>
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
                            name="name"                            
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

                        <FormField
                            control={form.control}
                            name="value"                            
                            render = { ({field}) => (
                            <FormItem>
                                <FormLabel>Size value</FormLabel>
                            <FormControl>
                            <Input placeholder="size value" {...field} autoComplete="off" />
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

export default SizeForm;

