"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { EnrichedLoanRecord } from "@/lib/types";

type RiskDistributionChartProps = {
  rows: EnrichedLoanRecord[];
};

const colors = ["#ef4444", "#22c55e"];

export function RiskDistributionChart({ rows }: RiskDistributionChartProps) {
  const defaults = rows.filter((row) => row.isDefault).length;
  const nonDefaults = rows.length - defaults;

  const data = [
    { name: "Defaulters", value: defaults },
    { name: "Non-Defaulters", value: nonDefaults },
  ];

  return (
    <div className="h-72 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="mb-3 text-sm font-semibold text-slate-700">Risk Distribution</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={4}
          >
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
