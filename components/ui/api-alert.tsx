"use client";
import { Copy, Server, Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { Badge, BadgeProps } from "./badge";
import { Button } from "./button";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import { useOrigin } from "@/lib/hooks/useOrigin";

export interface IapiAlertProps {
  title: string;
  variant: string;
  entityIdName: string;
  entityName: string;
}

const textMap: Record<IapiAlertProps["variant"], string> = {
  public: "Public",
  admin: "Admin",
};
const variantMap: Record<IapiAlertProps["variant"], BadgeProps["variant"]> = {
  public: "secondary",
  admin: "destructive",
};

export const ApiAlert: React.FC<IapiAlertProps> = ({
  title,
  variant = "public",
  entityName,
  entityIdName,
}) => {
  const { storeId } = useParams();
  const origin = useOrigin();
  const url = `${origin}/api/${storeId}/${entityName}/${entityIdName}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    toast.success(`Copied to clipboard`);
  };
  return (
    <main>
      <Alert className="space-y-4 sm:px-3 px-2">
        <AlertTitle className="flex gap-4 items-center">
          <Server className="h-4 w-4" />
          {title}
          <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
        </AlertTitle>
        <AlertDescription
          className="
          flex 
          justify-between 
          bg-slate-100 
          py-2 
          dark:bg-slate-800 
          items-center 
          rounded-md 
          px-2
          gap-2
          "
        >
          {url}
          <Button
            className="min-w-5 flex-shrink"
            variant="ghost"
            onClick={() => handleCopy()}
          >
            <Copy className="size-5 flex-shrink-0" />
          </Button>
        </AlertDescription>
      </Alert>
    </main>
  );
};
