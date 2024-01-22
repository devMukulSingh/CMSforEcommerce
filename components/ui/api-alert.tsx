import { Copy, Server, Terminal } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "./alert"
import { Badge, BadgeProps } from "./badge"
import { Button } from "./button"
import toast from "react-hot-toast"



export interface IapiAlertProps{
    description: string,
    title : string,
    variant: string
}

const textMap: Record<IapiAlertProps["variant"],string> = {
    public: 'Public',
    admin : 'Admin'
}
const variantMap: Record<IapiAlertProps["variant"],BadgeProps["variant"]> = {
    public : 'secondary',
    admin : 'destructive'
}

export const ApiAlert:React.FC<IapiAlertProps> = ({
    description,
    title,
    variant="public"

}) => {
    
    const handleCopy = () => {
        alert('cpou')
        navigator.clipboard.writeText(description);
        toast.success(`Copied to clipboard`);
    }
    return(
        <main>
            <Alert className="space-y-4">
                    <AlertTitle className="flex gap-4 items-center">
                        <Server className='h-4 w-4'/>   
                        {title}
                        <Badge variant={variantMap[variant]}>
                            {textMap[variant]}
                        </Badge>
                    </AlertTitle>                 
                    <AlertDescription className="flex justify-between bg-slate-100 items-center rounded-md px-2">
                        {description}
                        <Button variant="ghost" onClick={ () => handleCopy() }>
                            <Copy className=""/>
                        </Button>
                    </AlertDescription>
            </Alert>
        </main>
    )
}