import { Dashboard } from "@/components/dashboard";
import { getDashboardData } from "@/lib/data";

export default async function Home() {
  const { rows, metrics } = await getDashboardData();

  return <Dashboard rows={rows} metrics={metrics} />;
}
