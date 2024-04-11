import dynamic from "next/dynamic";
import ChartSkeleton from "@/app/(dashboard)/[storeId]/components/ChartSkeleton";
import DashboardDataSkeleton from "@/app/(dashboard)/[storeId]/components/DashboardDataSkeleton";
const ChartSection = dynamic(
  () => import("@/app/(dashboard)/[storeId]/components/ChartSection"),
  {
    loading: () => <ChartSkeleton />,
  }
);
const DashboardData = dynamic(
  () => import("@/app/(dashboard)/[storeId]/components/DashboardData"),
  {
    loading: () => <DashboardDataSkeleton />,
  }
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
