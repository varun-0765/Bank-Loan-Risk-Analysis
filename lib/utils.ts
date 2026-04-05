export const formatCurrency = (value: number) => `$${Math.round(value).toLocaleString()}`;

export const formatCurrencyCompact = (value: number) =>
  `$${Math.round(value / 1000).toLocaleString()}k`;
