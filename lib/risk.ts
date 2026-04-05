import type { CleanLoanRecord, EnrichedLoanRecord, LoanRecord } from "@/lib/types";

const isValidNumber = (value: number | null | undefined): value is number =>
  typeof value === "number" && Number.isFinite(value) && value > 0;

const median = (values: Array<number | null | undefined>, fallback: number) => {
  const filtered = values.filter(isValidNumber).sort((a, b) => a - b);
  if (!filtered.length) return fallback;
  const middle = Math.floor(filtered.length / 2);
  return filtered.length % 2 === 0
    ? (filtered[middle - 1] + filtered[middle]) / 2
    : filtered[middle];
};

export const cleanLoanRecords = (records: LoanRecord[]): CleanLoanRecord[] => {
  const incomeMedian = median(
    records.map((record) => record.income),
    60000,
  );
  const creditMedian = median(
    records.map((record) => record.credit_score),
    680,
  );
  const loanMedian = median(
    records.map((record) => record.loan_amount),
    200000,
  );

  return records.map((record) => {
    const loanAmount = isValidNumber(record.loan_amount)
      ? record.loan_amount
      : loanMedian;
    const income = isValidNumber(record.income) ? record.income : incomeMedian;
    const creditScore = isValidNumber(record.credit_score)
      ? Math.round(record.credit_score)
      : Math.round(creditMedian);
    const debt = isValidNumber(record.debt) ? record.debt : loanAmount * 0.35;
    const collateralValue = isValidNumber(record.collateral_value)
      ? record.collateral_value
      : loanAmount * 1.2;

    return {
      customer_id: record.customer_id,
      income,
      credit_score: creditScore,
      loan_amount: loanAmount,
      debt,
      collateral_value: collateralValue,
      is_default: Boolean(record.is_default),
    };
  });
};

const dtiRisk = (dti: number) => {
  if (dti <= 0.3) return 0.1;
  if (dti <= 0.43) return 0.4;
  if (dti <= 0.55) return 0.7;
  return 1;
};

const creditRisk = (creditScore: number) => {
  if (creditScore >= 750) return 0.1;
  if (creditScore >= 680) return 0.4;
  if (creditScore >= 620) return 0.7;
  return 1;
};

const ltvRisk = (ltv: number) => {
  if (ltv <= 0.6) return 0.1;
  if (ltv <= 0.8) return 0.4;
  if (ltv <= 0.95) return 0.7;
  return 1;
};

export const scoreRecord = (record: CleanLoanRecord): EnrichedLoanRecord => {
  const debtToIncome = record.debt / record.income;
  const loanToValue = record.loan_amount / record.collateral_value;

  const riskScore = Math.round(
    (dtiRisk(debtToIncome) * 0.35 +
      creditRisk(record.credit_score) * 0.4 +
      ltvRisk(loanToValue) * 0.25) *
      100,
  );

  const riskSegment =
    riskScore < 35 ? "Low" : riskScore < 65 ? "Medium" : "High";

  return {
    customerId: record.customer_id,
    income: record.income,
    creditScore: record.credit_score,
    loanAmount: record.loan_amount,
    debt: record.debt,
    collateralValue: record.collateral_value,
    isDefault: record.is_default,
    debtToIncome,
    loanToValue,
    riskScore,
    riskSegment,
  };
};

export const buildRiskDataset = (records: LoanRecord[]) =>
  cleanLoanRecords(records).map(scoreRecord);
