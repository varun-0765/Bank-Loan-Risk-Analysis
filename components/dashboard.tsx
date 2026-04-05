import type { DashboardMetrics, EnrichedLoanRecord } from "@/lib/types";
import { KpiCard } from "@/components/kpi-card";
import { RiskDistributionChart } from "@/components/risk-distribution-chart";
import { IncomeLoanScatter } from "@/components/income-loan-scatter";
import { CustomerTable } from "@/components/customer-table";

type DashboardProps = {
  metrics: DashboardMetrics;
  rows: EnrichedLoanRecord[];
};

export function Dashboard({ metrics, rows }: DashboardProps) {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <section>
        <h1 className="text-2xl font-bold text-slate-900">Bank Loan Risk Analysis Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">
          Customer default trends, risk segmentation, and portfolio exposure.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <KpiCard label="Total Loans" value={metrics.totalLoans.toLocaleString()} />
        <KpiCard label="Approval Rate" value={`${metrics.approvalRate.toFixed(1)}%`} />
        <KpiCard
          label="Total Default Risk"
          value={`$${Math.round(metrics.totalDefaultRisk).toLocaleString()}`}
        />
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <RiskDistributionChart rows={rows} />
        <IncomeLoanScatter rows={rows} />
      </section>

      <section>
        <CustomerTable rows={rows} />
      </section>
    </main>
  );
}
