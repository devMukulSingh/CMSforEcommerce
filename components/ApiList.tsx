import { useParams } from "next/navigation"
import { ApiAlert } from "./ui/api-alert"
import useOrigin from "@/hooks/useOrigin";

const ApiList = () => {
    const { storeId } = useParams();
    const origin = useOrigin();
  return (
    <main className="space-y-5">
        <header>
            <h1 className="text-3xl font-bold">Api</h1>
            <p className="text-sm text-slate-400">View Api calls</p>
        </header>
        <ApiAlert
            description={`${origin}/api/${storeId}/billboards/{billboardId}`}
            title="GET"
            variant="public"
        />
        <ApiAlert
            description={`${origin}/api/${storeId}/billboards/{billboardId}`}
            title="GET"
            variant="public"
        />
        <ApiAlert
            description={`${origin}/api/${storeId}/billboards/{billboardId}`}
            title="GET"
            variant="public"
        />
    </main>
  )
}

export default ApiList