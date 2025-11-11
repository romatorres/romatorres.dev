import { getAuthUser } from "@/lib/auth-server-utils";

export default async function Dashboard() {
  const user = await getAuthUser();

  return (
    <div className="space-y-6 mt-16">
      <div>
        <h1 className="text-2xl font-bold text-gray-50">Dashboard</h1>
        <span className="text-sm text-gray-300">Bem-vindo, {user?.name}</span>
      </div>
    </div>
  );
}
