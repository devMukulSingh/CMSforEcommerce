"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Loader from "@/components/commons/Loader";
import { categorySchema } from "@/lib/formSchemas";
import useSWRMutation from "swr/mutation";
import CategoryName from "../../../categories/[categoryId]/components/formFields/CategoryName";
import Billboards from "../../../categories/[categoryId]/components/formFields/Billboards";

interface ICategoryFormDialogProps {
  onClose: () => void;
}
async function sendRequest(url: string, { arg }: { arg: colorFormValues }) {
  await axios.post(url, arg);
}
type colorFormValues = z.infer<typeof categorySchema>;

const CategoryFormDialog: React.FC<ICategoryFormDialogProps> = ({ onClose }) => {
  const { storeId } = useParams();
  const { isMutating, error, trigger } = useSWRMutation(
    `/api/${storeId}/category`,
    sendRequest
  );
  const router = useRouter();
  const form = useForm<colorFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      billboardId : "",
    },
  });
  const onSubmit = async (data: colorFormValues) => {
    try {
      await trigger(data);
      onClose();
      toast.success("category created");
      router.refresh();
    } catch (error: any) {
      toast.error("Something went wrong");
      console.log(`Error in onSubmit`, error);
    }
  };
  if (error) console.log("Error in color POST req ", error);

  return (
    <>
      <div className="flex flex-col gap-6 px-10 py-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex gap-4 flex-col">
              <CategoryName form={form} loading={isMutating} />
              <Billboards form={form} loading={isMutating} />

              <Button
                type="submit"
                className="w-32 cursor-pointer flex gap-2"
                disabled={isMutating}
              >
                Create
                {isMutating && <Loader />}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default CategoryFormDialog;
