type RiskBadgeProps = {
  riskSegment: "Low" | "Medium" | "High";
};

const colorMap: Record<RiskBadgeProps["riskSegment"], string> = {
  Low: "bg-emerald-100 text-emerald-700",
  Medium: "bg-amber-100 text-amber-700",
  High: "bg-rose-100 text-rose-700",
};

export function RiskBadge({ riskSegment }: RiskBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${colorMap[riskSegment]}`}
    >
      {riskSegment}
    </span>
  );
}
