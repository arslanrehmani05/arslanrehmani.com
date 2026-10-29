export type CostBracket = '40_60k' | '60_80k' | '80_100k' | '100_120k' | '120k_plus';

export const COST_BRACKET_LABELS: Record<CostBracket, string> = {
  '40_60k': '$40k - $60k / yr',
  '60_80k': '$60k - $80k / yr',
  '80_100k': '$80k - $100k / yr',
  '100_120k': '$100k - $120k / yr',
  '120k_plus': '$120k+ / yr',
};

const SALARY_ESTIMATES: Record<CostBracket, number> = {
  '40_60k': 50000,
  '60_80k': 70000,
  '80_100k': 90000,
  '100_120k': 110000,
  '120k_plus': 140000,
};

export interface RoiInput {
  teamMembers: number;
  hoursPerWeek: number;
  costBracket: CostBracket;
}

export type RoiCalculatorInputs = RoiInput;

export interface RoiResult {
  currentAnnualCost: number;
  automatedAnnualCost: number;
  annualSavings: number;
  hourlyRate: number;
  paybackPeriodMonths: number;
}

export type RoiCalculatorResults = RoiResult;

export function calculateRoi(input: RoiInput): RoiResult {
  const salary = SALARY_ESTIMATES[input.costBracket] || 70000;
  const hourlyRate = Math.round(salary / 2080);
  const currentAnnualCost = Math.round(input.teamMembers * input.hoursPerWeek * hourlyRate * 52);
  const annualSavings = Math.round(currentAnnualCost * 0.82); // 82% automation efficiency
  const automatedAnnualCost = currentAnnualCost - annualSavings;
  const estimatedImplementationCost = 28000;
  const paybackPeriodMonths = Math.max(1, Math.round((estimatedImplementationCost / (annualSavings / 12)) * 10) / 10);

  return {
    currentAnnualCost,
    automatedAnnualCost,
    annualSavings,
    hourlyRate,
    paybackPeriodMonths,
  };
}
