"use client";

import { useMemo, useState } from "react";
import type { EnrichedLoanRecord } from "@/lib/types";
import { RiskBadge } from "@/components/risk-badge";

type CustomerTableProps = {
  rows: EnrichedLoanRecord[];
};

export function CustomerTable({ rows }: CustomerTableProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((row) => row.customerId.toLowerCase().includes(q));
  }, [rows, query]);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-sm font-semibold text-slate-700">Customer Risk Table</h3>
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by customer ID"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-0 sm:max-w-xs"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-slate-200 text-slate-500">
            <tr>
              <th className="px-2 py-2">Customer</th>
              <th className="px-2 py-2">Income</th>
              <th className="px-2 py-2">Loan Amount</th>
              <th className="px-2 py-2">Credit Score</th>
              <th className="px-2 py-2">Risk Score</th>
              <th className="px-2 py-2">Risk Segment</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => (
              <tr key={row.customerId} className="border-b border-slate-100 text-slate-800">
                <td className="px-2 py-2 font-medium">{row.customerId}</td>
                <td className="px-2 py-2">${row.income.toLocaleString()}</td>
                <td className="px-2 py-2">${row.loanAmount.toLocaleString()}</td>
                <td className="px-2 py-2">{row.creditScore}</td>
                <td className="px-2 py-2">{row.riskScore}</td>
                <td className="px-2 py-2">
                  <RiskBadge riskSegment={row.riskSegment} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
