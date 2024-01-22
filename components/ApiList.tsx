import { useParams } from "next/navigation"
import { ApiAlert } from "./ui/api-alert";
import { BASE_URL } from "@/constants/constants";


const ApiList = () => {
    const { storeId } = useParams();
  return (
    <main className="space-y-5">
        <header>
            <h1 className="text-3xl font-bold">Api</h1>
            <p className="text-sm text-slate-400">View Api calls</p>
        </header>
        <ApiAlert
            description={`${BASE_URL}/api/${storeId}/billboards`}
            title="GET"
            variant="public"
        />
        <ApiAlert
            description={`${BASE_URL}/api/${storeId}/billboards/{billboardId}`}
            title="GET"
            variant="public"
        />
        <ApiAlert
            description={`${BASE_URL}/api/${storeId}/billboards/{billboardId}`}
            title="POST"
            variant="admin"
        />
         <ApiAlert
            description={`${BASE_URL}/api/${storeId}/billboards/{billboardId}`}
            title="POST"
            variant="admin"
        />
         <ApiAlert
            description={`${BASE_URL}/api/${storeId}/billboards/{billboardId}`}
            title="DELETE"
            variant="admin"
        />
    </main>
  )
}

export default ApiList