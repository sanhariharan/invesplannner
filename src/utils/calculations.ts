export function calculateProjectedValue(
  currentSavings: number,
  monthlyInvestment: number,
  timeHorizon: number,
  annualReturn: number = 0.07 // 7% default annual return
): number {
  const monthlyRate = annualReturn / 12;
  const months = timeHorizon * 12;

  // Future value of current savings
  const futureValueSavings = currentSavings * Math.pow(1 + annualReturn, timeHorizon);

  // Future value of monthly investments
  const futureValueInvestments =
    monthlyInvestment *
    ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);

  return Math.round(futureValueSavings + futureValueInvestments);
}

export function normalizeAllocation(allocation: { [key: string]: number }): { [key: string]: number } {
  const total = Object.values(allocation).reduce((sum, value) => sum + value, 0);
  const normalized: { [key: string]: number } = {};

  Object.entries(allocation).forEach(([key, value]) => {
    normalized[key] = Math.round((value / total) * 100);
  });

  return normalized;
}