// lib/calculators/roi.ts

export type CostBracket = 'under_40k' | '40_60k' | '60_80k' | '80_110k' | '110k_plus';

export const COST_BRACKET_LABELS: Record<CostBracket, string> = {
  under_40k: 'Under $40,000 / year',
  '40_60k': '$40,000 – $60,000 / year',
  '60_80k': '$60,000 – $80,000 / year',
  '80_110k': '$80,000 – $110,000 / year',
  '110k_plus': '$110,000+ / year',
};

export const COST_BRACKET_SALARY: Record<CostBracket, number> = {
  under_40k: 30000,
  '40_60k': 50000,
  '60_80k': 70000,
  '80_110k': 95000,
  '110k_plus': 130000,
};

export interface RoiCalculatorInputs {
  teamMembers: number;
  hoursPerWeek: number;
  costBracket: CostBracket;
}

export interface RoiCalculatorResults {
  hourlyRate: number;
  currentAnnualCost: number;
  automatedAnnualCost: number;
  annualSavings: number;
  paybackPeriodMonths: number;
}

export function calculateRoi(inputs: RoiCalculatorInputs): RoiCalculatorResults {
  const { teamMembers, hoursPerWeek, costBracket } = inputs;

  if (teamMembers < 1) {
    throw new RangeError('teamMembers must be at least 1');
  }
  if (hoursPerWeek < 0 || hoursPerWeek > 168) {
    throw new RangeError('hoursPerWeek must be between 0 and 168');
  }

  const salary = COST_BRACKET_SALARY[costBracket] || 70000;
  const hourlyRate = Number((salary / 2080).toFixed(2));

  const currentAnnualCost = Math.round(teamMembers * hoursPerWeek * hourlyRate * 52);
  const automatedAnnualCost = Math.round(currentAnnualCost * 0.15 + 2500);
  const annualSavings = Math.max(0, currentAnnualCost - automatedAnnualCost);

  const paybackPeriodMonths = annualSavings > 0 
    ? Number(((15000 / annualSavings) * 12).toFixed(1))
    : 0;

  return {
    hourlyRate,
    currentAnnualCost,
    automatedAnnualCost,
    annualSavings,
    paybackPeriodMonths,
  };
}
