import { DashboardStats } from "./_components/dados-admin/dashboard-stats";
import { RecentActivity } from "./_components/dados-admin/recent-activity";
import { QuickActions } from "./_components/dados-admin/quick-actions";
import { getAuthUser } from "@/lib/auth-server-utils";

export default async function Dashboard() {
  const user = await getAuthUser();

  return (
    <div className="space-y-6 mt-16">
      <div>
        <h1 className="text-2xl font-bold text-gray-50">Dashboard</h1>
        <span className="text-sm text-gray-300">Bem-vindo, {user?.name}</span>
      </div>

      <DashboardStats />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />
        <QuickActions />
      </div>
    </div>
  );
}
