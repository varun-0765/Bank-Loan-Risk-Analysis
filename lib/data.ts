import { promises as fs } from "node:fs";
import path from "node:path";
import { buildRiskDataset } from "@/lib/risk";
import type { DashboardMetrics, EnrichedLoanRecord, LoanRecord } from "@/lib/types";

const dataPath = path.join(process.cwd(), "public", "data", "loan_data.json");

export const getDashboardData = async (): Promise<{
  rows: EnrichedLoanRecord[];
  metrics: DashboardMetrics;
}> => {
  const raw = await fs.readFile(dataPath, "utf-8");
  const records = JSON.parse(raw) as LoanRecord[];
  const rows = buildRiskDataset(records);

  const totalLoans = rows.length;
  const approvedCount = rows.filter((row) => !row.isDefault).length;
  const defaultExposure = rows
    .filter((row) => row.isDefault)
    .reduce((sum, row) => sum + row.loanAmount, 0);

  return {
    rows,
    metrics: {
      totalLoans,
      approvalRate: totalLoans ? (approvedCount / totalLoans) * 100 : 0,
      totalDefaultRisk: defaultExposure,
    },
  };
};
