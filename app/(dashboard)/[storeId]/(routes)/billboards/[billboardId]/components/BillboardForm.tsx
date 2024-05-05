"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm, UseFormReturn } from "react-hook-form";
import { Loader2, TrashIcon } from "lucide-react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Billboard, Image } from "@prisma/client";
import React, { Suspense, useState } from "react";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { useParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { AlertModal } from "@/components/modals/AlertModal";
import Loader from "@/components/commons/Loader";
import { billboardSchema } from "@/lib/formSchemas";
import BillboardName from "./formFields/BillboardName";
import BillboardImage from "./formFields/BillboardImage";

export interface IbillboardFormProps {
  initialValues: Billboard | (null & Image[]) | null;
}
export interface Iform {
  form: UseFormReturn<
    {
      label: string;
      images: {
        url: string;
      }[];
    },
    any,
    undefined
  >;
  loading?: boolean;
}

type BillboardFormValues = z.infer<typeof billboardSchema>;

const BillboardForm: React.FC<IbillboardFormProps> = ({ initialValues }) => {
  const [openDeleteAlert, setOpenDeleteAlert] = useState<boolean>(false);
  const params = useParams();
  const router = useRouter();
  const { storeId, billboardId } = params;
  const [loading, setLoading] = useState(false);

  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(billboardSchema),
    defaultValues: initialValues || {
      label: "",
      images: [],
    },
  });
  const onSubmit = async (data: BillboardFormValues) => {
    try {
      setLoading(true);
      if (initialValues) {
        await axios.patch(`/api/${storeId}/billboard/${billboardId}`, data);
        toast.success("Billboard updated");
      } else {
        await axios.post(`/api/${storeId}/billboard`, data);
        toast.success("Billboard created");
        router.push(`/${storeId}/billboards`);
      }
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
      console.log(`Error in onSubmit ${error}`);
    } finally {
      setLoading(false);
    }
  };
  const handleBillboardDelete = async () => {
    try {
      setLoading(true);
      const res = await axios.delete(
        `/api/${storeId}/billboard/${billboardId}`,
      );
      if (res.status === 200) toast.success("Billboard deleted");
      else if (res.status === 500) toast.error("Something went wrong");
      setOpenDeleteAlert(false);
      router.push(`/${storeId}/billboards`);
    } catch (e) {
      toast.error("Something went wrong");
      console.log(`Error in handleBillboardDelete ${e}`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <AlertModal
        loading={loading}
        isOpen={openDeleteAlert}
        onClose={() => setOpenDeleteAlert(false)}
        onConform={handleBillboardDelete}
      />
      <div className="flex flex-col gap-6 px-10 py-2">
        <header className="flex justify-between ">
          <section>
            <h1 className="text-2xl font-bold">
              {initialValues ? `Edit Billboard` : `Create Billboard`}
            </h1>
            <p className="text-sm">Manage Billboard Preferences</p>
          </section>
          {initialValues && (
            <Button
              onClick={() => setOpenDeleteAlert(true)}
              disabled={loading}
              variant="destructive"
              size="icon"
            >
              <TrashIcon />
            </Button>
          )}
        </header>

        <Separator />

        <Suspense fallback={<>loading...</>}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex gap-4 flex-col">
                <BillboardName form={form} loading={loading} />
                <BillboardImage form={form} loading={loading} />

                <Button
                  type="submit"
                  className="w-32 cursor-pointer flex gap-2"
                  disabled={loading}
                >
                  {initialValues ? "Save Changes" : "Create"}
                  {loading && <Loader />}
                </Button>
              </div>
            </form>
          </Form>
        </Suspense>
      </div>
    </>
  );
};

export default BillboardForm;
