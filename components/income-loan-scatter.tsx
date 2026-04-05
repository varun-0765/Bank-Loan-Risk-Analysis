"use client";

import { CartesianGrid, Legend, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from "recharts";
import type { EnrichedLoanRecord } from "@/lib/types";

type IncomeLoanScatterProps = {
  rows: EnrichedLoanRecord[];
};

export function IncomeLoanScatter({ rows }: IncomeLoanScatterProps) {
  const defaultRows = rows.filter((row) => row.isDefault);
  const nonDefaultRows = rows.filter((row) => !row.isDefault);

  return (
    <div className="h-72 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="mb-3 text-sm font-semibold text-slate-700">
        Income vs Loan Amount Correlation
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="income"
            name="Income"
            tickFormatter={(value: number) => `$${Math.round(value / 1000)}k`}
          />
          <YAxis
            dataKey="loanAmount"
            name="Loan Amount"
            tickFormatter={(value: number) => `$${Math.round(value / 1000)}k`}
          />
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            formatter={(value) => `$${Number(value ?? 0).toLocaleString()}`}
          />
          <Legend />
          <Scatter name="Non-Default" data={nonDefaultRows} fill="#22c55e" />
          <Scatter name="Default" data={defaultRows} fill="#ef4444" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
