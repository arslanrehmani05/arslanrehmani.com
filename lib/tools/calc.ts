// lib/tools/calc.ts
// Pure calculation functions for the framework tools. No React, no formatting.
// Every figure a tool shows must come from the visitor's inputs through a function here,
// so the maths can be read, tested and corrected in one place.

const pct = (n: number) => Math.max(0, n) / 100;
const pos = (n: number) => (Number.isFinite(n) && n > 0 ? n : 0);

/* ----------------------------- Month-end close ----------------------------- */

export interface CloseInputs {
  people: number;
  closeDays: number;
  hoursPerDay: number;
  hourlyCost: number;
  closesPerYear: number;
  targetDays: number;
}

export function calcClose(i: CloseInputs) {
  const people = pos(i.people);
  const closeDays = pos(i.closeDays);
  const hoursPerDay = Math.min(pos(i.hoursPerDay), 24);
  const closes = pos(i.closesPerYear);
  const targetDays = Math.min(pos(i.targetDays), closeDays);

  const hoursPerClose = people * closeDays * hoursPerDay;
  const annualHours = hoursPerClose * closes;
  const annualCost = annualHours * pos(i.hourlyCost);

  const targetAnnualHours = people * targetDays * hoursPerDay * closes;
  const hoursFreed = annualHours - targetAnnualHours;
  const costFreed = hoursFreed * pos(i.hourlyCost);

  // Working days in the year on which last period's numbers are still not final.
  const daysWithoutNumbers = closeDays * closes;
  const daysRecovered = (closeDays - targetDays) * closes;

  return { hoursPerClose, annualHours, annualCost, hoursFreed, costFreed, daysWithoutNumbers, daysRecovered, targetDays };
}

/* ------------------------------ Channel profit ----------------------------- */

export interface ChannelInput {
  id: string;
  name: string;
  revenue: number; // monthly, before returns
  orders: number; // monthly
  costOfGoodsPct: number;
  feePct: number; // marketplace + payment fees, % of revenue
  fulfilmentPerOrder: number;
  adSpend: number; // monthly
  returnPct: number; // % of revenue refunded
}

export function calcChannel(c: ChannelInput) {
  const revenue = pos(c.revenue);
  const refunds = revenue * pct(c.returnPct);
  const netRevenue = revenue - refunds;
  // Returned goods are assumed to go back into stock, so cost of goods applies to kept sales only.
  const costOfGoods = netRevenue * pct(c.costOfGoodsPct);
  // Fees and fulfilment are paid on every order, including the ones that come back.
  const fees = revenue * pct(c.feePct);
  const fulfilment = pos(c.orders) * pos(c.fulfilmentPerOrder);
  const ads = pos(c.adSpend);
  const profit = netRevenue - costOfGoods - fees - fulfilment - ads;
  const margin = revenue > 0 ? (profit / revenue) * 100 : 0;
  const profitPerOrder = pos(c.orders) > 0 ? profit / pos(c.orders) : 0;
  return { id: c.id, name: c.name, revenue, refunds, netRevenue, costOfGoods, fees, fulfilment, ads, profit, margin, profitPerOrder };
}

export function calcChannels(channels: ChannelInput[]) {
  const rows = channels.map(calcChannel);
  const totalRevenue = rows.reduce((s, r) => s + r.revenue, 0);
  const totalProfit = rows.reduce((s, r) => s + r.profit, 0);
  const withShare = rows.map((r) => ({
    ...r,
    revenueShare: totalRevenue > 0 ? (r.revenue / totalRevenue) * 100 : 0,
    profitShare: totalProfit > 0 ? (r.profit / totalProfit) * 100 : 0,
  }));
  const ranked = [...withShare].sort((a, b) => b.margin - a.margin);
  return {
    rows: withShare,
    totalRevenue,
    totalProfit,
    totalMargin: totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0,
    best: ranked[0],
    worst: ranked.length > 1 ? ranked[ranked.length - 1] : undefined,
  };
}

/* -------------------------------- Stock cost ------------------------------- */

export interface StockInputs {
  stockValue: number;
  slowPct: number; // share of stock that has not sold in the period the visitor considers slow
  carryingPct: number; // yearly cost of holding stock, % of its value
  stockoutsPerMonth: number; // product lines that run out each month
  daysOut: number; // average days a line stays out of stock
  dailySalesPerLine: number; // average daily sales of a line that runs out
  marginPct: number;
}

export function calcStock(i: StockInputs) {
  const slowStockValue = pos(i.stockValue) * pct(i.slowPct);
  const carryingCost = slowStockValue * pct(i.carryingPct);
  const lostSales = pos(i.stockoutsPerMonth) * pos(i.daysOut) * pos(i.dailySalesPerLine) * 12;
  const lostMargin = lostSales * pct(i.marginPct);
  const total = carryingCost + lostMargin;
  return { slowStockValue, carryingCost, lostSales, lostMargin, total, bigger: carryingCost >= lostMargin ? 'slow' : 'stockout' as 'slow' | 'stockout' };
}

/* ------------------------------ Production loss ---------------------------- */

export interface ProductionInputs {
  machines: number;
  plannedHoursPerDay: number;
  daysPerMonth: number;
  stoppageHoursPerDay: number; // unplanned, per machine
  speedPct: number; // actual running speed as % of rated speed
  rejectPct: number;
  valuePerGoodHour: number; // what one good machine-hour of output is worth
}

export function calcProduction(i: ProductionInputs) {
  const planned = pos(i.plannedHoursPerDay);
  const stoppage = Math.min(pos(i.stoppageHoursPerDay), planned);
  const availability = planned > 0 ? (planned - stoppage) / planned : 0;
  const performance = Math.min(pct(i.speedPct), 1);
  const quality = 1 - Math.min(pct(i.rejectPct), 1);
  const effectiveness = availability * performance * quality;

  const plannedMonthlyHours = pos(i.machines) * planned * pos(i.daysPerMonth);
  const goodHours = plannedMonthlyHours * effectiveness;
  const lostHours = plannedMonthlyHours - goodHours;

  // Split the loss in the order it happens: stopped, then slow, then rejected.
  const lostToStoppage = plannedMonthlyHours * (1 - availability);
  const lostToSpeed = plannedMonthlyHours * availability * (1 - performance);
  const lostToRejects = plannedMonthlyHours * availability * performance * (1 - quality);

  const value = pos(i.valuePerGoodHour);
  const losses = [
    { key: 'stoppage', label: 'Unplanned stoppages', hours: lostToStoppage },
    { key: 'speed', label: 'Running below rated speed', hours: lostToSpeed },
    { key: 'rejects', label: 'Rejects and rework', hours: lostToRejects },
  ].sort((a, b) => b.hours - a.hours);

  return {
    availability: availability * 100,
    performance: performance * 100,
    quality: quality * 100,
    effectiveness: effectiveness * 100,
    plannedMonthlyHours,
    goodHours,
    lostHours,
    monthlyLoss: lostHours * value,
    annualLoss: lostHours * value * 12,
    losses: losses.map((l) => ({ ...l, value: l.hours * value })),
  };
}

/* ----------------------------- Automation finder --------------------------- */

export type RuleLevel = 'fixed' | 'exceptions' | 'judgement';
export type InputKind = 'structured' | 'documents';
export type MistakeCost = 'low' | 'high';

export interface TaskInput {
  id: string;
  name: string;
  hoursPerWeek: number; // total across everyone who does it
  rules: RuleLevel;
  input: InputKind;
  mistake: MistakeCost;
}

export interface TaskResult extends TaskInput {
  annualHours: number;
  annualCost: number;
  recoverableHours: number;
  recoverableCost: number;
  approach: string;
  reason: string;
  /** Share of the task's hours a system can realistically take over. A planning assumption, shown to the visitor. */
  recoverableShare: number;
}

export function classifyTask(t: Pick<TaskInput, 'rules' | 'input' | 'mistake'>) {
  if (t.rules === 'judgement') {
    return {
      approach: 'Keep with a person',
      reason: 'The work depends on judgement. Give the person better information, faster, and leave the decision with them.',
      recoverableShare: 0.2,
    };
  }
  if (t.rules === 'fixed' && t.input === 'structured') {
    return {
      approach: 'Automate with rules',
      reason: 'The steps are fixed and the data is already structured. This needs plain software, not AI.',
      recoverableShare: 0.9,
    };
  }
  if (t.mistake === 'high') {
    return {
      approach: 'AI agent, with a person approving',
      reason: 'An agent can read the documents and handle the exceptions, but a mistake is expensive, so a person signs off each result.',
      recoverableShare: 0.6,
    };
  }
  return {
    approach: 'AI agent, spot-checked',
    reason: 'An agent can read the documents and handle the exceptions. Mistakes are cheap to fix, so a sample check is enough.',
    recoverableShare: 0.75,
  };
}

export function calcTasks(tasks: TaskInput[], hourlyCost: number, weeksPerYear: number): TaskResult[] {
  return tasks
    .filter((t) => t.name.trim() && pos(t.hoursPerWeek) > 0)
    .map((t) => {
      const c = classifyTask(t);
      const annualHours = pos(t.hoursPerWeek) * pos(weeksPerYear);
      const annualCost = annualHours * pos(hourlyCost);
      return {
        ...t,
        ...c,
        annualHours,
        annualCost,
        recoverableHours: annualHours * c.recoverableShare,
        recoverableCost: annualCost * c.recoverableShare,
      };
    })
    .sort((a, b) => b.recoverableCost - a.recoverableCost);
}

/* ------------------------------ Hire, buy, build --------------------------- */

export interface HireBuyBuildInputs {
  manualHoursPerWeek: number;
  hourlyCost: number; // cost of the manual work today
  weeksPerYear: number;
  years: number;
  // Hire
  hireAnnualCost: number; // one more person, fully loaded
  hireHoursPerWeek: number; // productive hours that person gives
  // Buy
  buySetup: number;
  buyMonthly: number; // total subscription per month
  buyCoveragePct: number; // share of the manual work the software removes
  // Build
  buildCost: number;
  buildAnnualRun: number;
  buildCoveragePct: number;
}

export function calcHireBuyBuild(i: HireBuyBuildInputs) {
  const years = Math.max(1, Math.round(pos(i.years)));
  const annualManualHours = pos(i.manualHoursPerWeek) * pos(i.weeksPerYear);
  const annualManualCost = annualManualHours * pos(i.hourlyCost);

  // Do nothing: the manual work carries on at today's cost.
  const nothing = annualManualCost * years;

  // Hire: the work still gets done by hand, by more people.
  const hoursPerHire = pos(i.hireHoursPerWeek) * pos(i.weeksPerYear);
  const peopleNeeded = hoursPerHire > 0 ? Math.ceil(annualManualHours / hoursPerHire) : 0;
  const hire = peopleNeeded * pos(i.hireAnnualCost) * years;

  // Buy and build: the system's cost, plus the manual work it does not remove.
  const buyRemaining = annualManualCost * (1 - Math.min(pct(i.buyCoveragePct), 1));
  const buy = pos(i.buySetup) + (pos(i.buyMonthly) * 12 + buyRemaining) * years;

  const buildRemaining = annualManualCost * (1 - Math.min(pct(i.buildCoveragePct), 1));
  const build = pos(i.buildCost) + (pos(i.buildAnnualRun) + buildRemaining) * years;

  // Months until the build has paid for itself against doing nothing.
  const buildMonthlySaving = (annualManualCost - buildRemaining - pos(i.buildAnnualRun)) / 12;
  const buildPaybackMonths = buildMonthlySaving > 0 ? pos(i.buildCost) / buildMonthlySaving : null;
  const buyMonthlySaving = (annualManualCost - buyRemaining - pos(i.buyMonthly) * 12) / 12;
  const buyPaybackMonths = buyMonthlySaving > 0 ? pos(i.buySetup) / buyMonthlySaving : null;

  const options = [
    { key: 'nothing', label: 'Change nothing', total: nothing },
    { key: 'hire', label: 'Hire', total: hire },
    { key: 'buy', label: 'Buy software', total: buy },
    { key: 'build', label: 'Build a system', total: build },
  ];
  const cheapest = [...options].sort((a, b) => a.total - b.total)[0];

  return { years, annualManualHours, annualManualCost, peopleNeeded, options, cheapest, buildPaybackMonths, buyPaybackMonths };
}
