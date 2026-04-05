export type LoanRecord = {
  customer_id: string;
  income?: number | null;
  credit_score?: number | null;
  loan_amount?: number | null;
  debt?: number | null;
  collateral_value?: number | null;
  is_default: boolean;
};

export type CleanLoanRecord = {
  customer_id: string;
  income: number;
  credit_score: number;
  loan_amount: number;
  debt: number;
  collateral_value: number;
  is_default: boolean;
};

export type EnrichedLoanRecord = {
  customerId: string;
  income: number;
  creditScore: number;
  loanAmount: number;
  debt: number;
  collateralValue: number;
  isDefault: boolean;
  debtToIncome: number;
  loanToValue: number;
  riskScore: number;
  riskSegment: "Low" | "Medium" | "High";
};

export type DashboardMetrics = {
  totalLoans: number;
  approvalRate: number;
  totalDefaultRisk: number;
};
