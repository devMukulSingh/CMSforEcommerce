"use client"
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { TrashIcon } from "lucide-react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Store } from "@prisma/client";
import React, { useState } from "react";
import { Separator } from "../ui/separator";
import axios from "axios";
import { useParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { AlertModal } from "../modals/AlertModal";

interface IsettingsFormProps{
    initialValues : Store | null
}

const formSchema = z.object({
    name: z.string().min(1)
})
type SettingFormValues = z.infer<typeof formSchema>;

const SettingsForm : React.FC<IsettingsFormProps> = ( {initialValues} ) => {
    const [openDeleteAlert, setOpenDeleteAlert] = useState<boolean>(false);
    const params = useParams();
    const router = useRouter();
    const { storeId } = params;
    const [loading, setLoading] = useState(false);

    const form = useForm<SettingFormValues>({
        resolver : zodResolver(formSchema),
        defaultValues : initialValues || {}
    });
    const handleSubmit = async( data:SettingFormValues) => {
        try {
            setLoading(true);
            const res = await axios.patch(`/api/stores/${storeId}`,data);
            toast.success("Store updated");
            router.refresh();
        } catch (error) {
            toast.error("Something went wrong");
            console.log(`Error in handleSubmit ${error}`);
        }
    finally{
        setLoading(false);
    }
    }
    const handleDeleteStore = async() => {
        try{
            setLoading(true);
            const res = await axios.delete(`/api/stores/${storeId}`);
            toast.success("Store Deleted");
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
                        <h1 className="text-2xl font-bold">Settings</h1>
                        <p className="text-sm">Manage Store Preferences</p>
                    </section>
                    <Button onClick={ () => setOpenDeleteAlert(true) }
                        disabled={loading}
                        variant="destructive" size="icon">
                        <TrashIcon/>
                    </Button>
                </header>
                <Separator/>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)}>
                        <div className="flex flex-col gap-4">
                        <FormField
                            control={form.control}
                            name='name'
                            render = { ({field}) => (
                            <FormItem>
                                <FormLabel>Store name</FormLabel>
                            <FormControl>
                            <Input placeholder="store name" {...field} autoComplete="off" />
                                </FormControl>
                                </FormItem>
                                )}
                                >
                            </FormField>

                            <Button type="submit" 
                                className="cursor-pointer w-32"
                                disabled={loading}
                                >
                                Save changes 
                            </Button>
                            </div>
                        </form>
                </Form>
            </main>
    </>
  )
}

export default SettingsForm;
