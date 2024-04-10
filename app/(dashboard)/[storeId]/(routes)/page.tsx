import dynamic from "next/dynamic";
import ChartSkeleton from "@/components/dashboard/ChartSkeleton";
import DashboardDataSkeleton from "@/components/dashboard/DashboardDataSkeleton";
const ChartSection = dynamic(
  () => import("@/components/dashboard/ChartSection"),
  {
    loading: () => <ChartSkeleton />,
  },
);
const DashboardData = dynamic(
  () => import("@/components/dashboard/DashboardData"),
  {
    loading: () => <DashboardDataSkeleton />,
  },
);

const DashboardPage = async ({ params }: { params: { storeId: string } }) => {
  const { storeId } = params;

  return (
    <div className="p-5 lg:p-15 md:p-10 space-y-10">
      <header>
        <h1 className="text-3xl font-bold">Dasboard</h1>
        <h1>Manage Dashboard</h1>
      </header>

      <DashboardData storeId={storeId} />
      <ChartSection storeId={storeId} />
    </div>
  );
};

export default DashboardPage;
