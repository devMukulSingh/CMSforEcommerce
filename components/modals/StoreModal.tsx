import * as z from "zod";
import axios from "axios";

import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { Modal } from "@/components/ui/modal"
import { setDialog } from "@/store/slice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";


const formSchema = z.object({
    name:z.string().min(1)
})

export const StoreModal = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const isOpen = useAppSelector( state => state.adminSlice.isOpen);
    const dispatch = useAppDispatch();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues : {
            name:"",
        }
    })

    const onSubmit = async(values : z.infer<typeof formSchema>) => {
        try {
            setLoading(true);
            const { data } = await axios.post(`/api/stores`,values);
            console.log(data);
        } catch (error) {
            console.log(`Error in onSubmit handler ${error}`);   
        }
        finally{
            setLoading(false);
        }
        }

    return(
        <Modal
            title="Create Store"
            description="Add a new store"
            isOpen={isOpen}
            onClose={ () => { dispatch(setDialog() ) } }
            >
            <div>
                <Form {...form}>
                    <form onSubmit={ form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="name"
                            render = { ( {field}) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="E-Commerce" {...field}/>
                                    </FormControl>
                                </FormItem>
                                )}
                        >

                        </FormField>
                        <footer className="
                            flex 
                            gap-4
                            mt-5
                        ">
                            <Button disabled={loading} type="submit">Continue</Button>
                            <Button disabled={loading} onClick={ () => dispatch(setDialog())} variant="outline">Cancel</Button>
                        </footer>
                    </form>
                </Form>
            </div>
        </Modal>
    )
}