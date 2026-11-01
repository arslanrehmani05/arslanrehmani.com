export type CostBracket =
  | 'under_40k'
  | '40_60k'
  | '60_80k'
  | '80_100k'
  | '100_120k'
  | '120k_plus';

export const COST_BRACKET_LABELS: Record<CostBracket, string> = {
  under_40k: 'Under $40k / yr',
  '40_60k': '$40k - $60k / yr',
  '60_80k': '$60k - $80k / yr',
  '80_100k': '$80k - $100k / yr',
  '100_120k': '$100k - $120k / yr',
  '120k_plus': '$120k+ / yr',
};

export const SALARY_ESTIMATES: Record<CostBracket, number> = {
  under_40k: 35000,
  '40_60k': 50000,
  '60_80k': 70000,
  '80_100k': 90000,
  '100_120k': 110000,
  '120k_plus': 140000,
};

export const COST_BRACKET_SALARY = SALARY_ESTIMATES;

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

const WORK_HOURS_PER_YEAR = 2080;
const WEEKS_PER_YEAR = 52;
const AUTOMATION_TIME_REDUCTION = 0.85;
const PLATFORM_OVERHEAD_ANNUAL = 2400;
const DEV_INVESTMENT = 15000;

export function calculateRoi(input: RoiInput): RoiResult {
  const { teamMembers, hoursPerWeek, costBracket } = input;

  if (!Number.isFinite(teamMembers) || teamMembers < 1) {
    throw new RangeError('teamMembers must be a finite number >= 1');
  }
  if (!Number.isFinite(hoursPerWeek) || hoursPerWeek < 0) {
    throw new RangeError('hoursPerWeek must be a finite number >= 0');
  }
  if (!(costBracket in SALARY_ESTIMATES)) {
    throw new RangeError(`Unknown costBracket: ${costBracket}`);
  }

  const hourlyRate = SALARY_ESTIMATES[costBracket] / WORK_HOURS_PER_YEAR;
  const currentAnnualCost = teamMembers * hoursPerWeek * hourlyRate * WEEKS_PER_YEAR;

  const automatedHoursPerWeek = hoursPerWeek * (1 - AUTOMATION_TIME_REDUCTION);
  const automatedLaborCost = teamMembers * automatedHoursPerWeek * hourlyRate * WEEKS_PER_YEAR;
  const automatedAnnualCost = automatedLaborCost + PLATFORM_OVERHEAD_ANNUAL;

  const annualSavings = Math.max(0, currentAnnualCost - automatedAnnualCost);
  const paybackPeriodMonths =
    annualSavings > 0 ? Math.round((DEV_INVESTMENT / annualSavings) * 12 * 10) / 10 : 0;

  return {
    hourlyRate: Math.round(hourlyRate * 100) / 100,
    currentAnnualCost: Math.round(currentAnnualCost),
    automatedAnnualCost: Math.round(automatedAnnualCost),
    annualSavings: Math.round(annualSavings),
    paybackPeriodMonths,
  };
}
