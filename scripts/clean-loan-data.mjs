import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const isValidNumber = (value) =>
  typeof value === "number" && Number.isFinite(value) && value > 0;

const median = (values, fallback) => {
  const filtered = values.filter(isValidNumber).sort((a, b) => a - b);
  if (!filtered.length) return fallback;
  const middle = Math.floor(filtered.length / 2);
  return filtered.length % 2 === 0
    ? (filtered[middle - 1] + filtered[middle]) / 2
    : filtered[middle];
};

const root = process.cwd();
const sourcePath = path.join(root, "public", "data", "loan_data.json");
const outputPath = path.join(root, "public", "data", "loan_data.cleaned.json");

const raw = await readFile(sourcePath, "utf-8");
const rows = JSON.parse(raw);

const incomeMedian = median(rows.map((r) => r.income), 60000);
const creditMedian = median(rows.map((r) => r.credit_score), 680);
const loanMedian = median(rows.map((r) => r.loan_amount), 200000);

const cleaned = rows.map((row) => {
  const loanAmount = isValidNumber(row.loan_amount) ? row.loan_amount : loanMedian;
  return {
    ...row,
    income: isValidNumber(row.income) ? row.income : incomeMedian,
    credit_score: isValidNumber(row.credit_score)
      ? Math.round(row.credit_score)
      : Math.round(creditMedian),
    loan_amount: loanAmount,
    debt: isValidNumber(row.debt) ? row.debt : loanAmount * 0.35,
    collateral_value: isValidNumber(row.collateral_value)
      ? row.collateral_value
      : loanAmount * 1.2,
  };
});

await writeFile(outputPath, `${JSON.stringify(cleaned, null, 2)}\n`, "utf-8");
console.log(`Cleaned ${cleaned.length} records -> ${outputPath}`);
