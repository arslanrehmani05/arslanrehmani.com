# ROI Calculator (Phase 1) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Claude-backed ROI calculator with a pure client-side calculator (live results, no network call) that gates a styled PDF breakdown behind an email + industry capture, saving structured lead data to Supabase.

**Architecture:** A pure calculation function (`lib/calculators/roi.ts`) is shared between the live client-side display and a server-side recompute in the API route, so the PDF never trusts client state. A static industry-context lookup (`lib/calculators/industry-context.ts`) supplies per-industry copy for the PDF — no AI call anywhere in this tool. `app/api/calculator/route.ts` is rewritten to validate input, recompute, generate a PDF via `pdf-lib`, save the lead, and stream the PDF back; the Claude integration and mock-report generator are deleted entirely.

**Tech Stack:** Next.js 14 App Router, TypeScript, `pdf-lib` (new dependency), Supabase, Tailwind. `tsx` (new devDependency) runs Node's built-in test runner for the one pure-function unit test file in this plan.

## Global Constraints

- No AI call anywhere in this tool (per spec: ROI Calculator is pure client-side calculation).
- No email-sending service — the gate downloads the PDF immediately in-browser; it does not email it (Global Decision 2 in the design spec).
- "Book a call" links to `/contact`, not a Calendly embed (Global Decision 3 in the design spec — no Calendly link exists yet).
- `leads` table gets two new columns applied manually by Arslan in the Supabase dashboard before Task 6 is tested against a real (non-mock) Supabase instance: `alter table leads add column if not exists tool_data jsonb;` and `alter table leads add column if not exists source_tool text;`. Task 6's code must work correctly in mock-Supabase mode (no env vars set) regardless of whether this migration has been run, since `lib/supabase.ts` already degrades gracefully when Supabase isn't configured.
- Design system: reuse the site's existing CSS component classes from `app/globals.css` — `.eyebrow`, `.headline`, `.btn-primary`, `.btn-ghost`, `.link-gold` — and the `inputClasses` pattern already used in `app/contact/page.tsx`. Do not introduce new ad-hoc button/input styling.
- Background `#0A0A0A`, gold accent `#C9A84C` used only on CTAs/results/numbers — same rule as the rest of the site.

---

### Task 1: Add dependencies

**Files:**
- Modify: `package.json`

**Interfaces:**
- Consumes: nothing
- Produces: `pdf-lib` importable from any file; `tsx` available via `npx tsx`

- [ ] **Step 1: Install the new dependency and dev dependency**

Run:
```bash
cd /Users/arslanrehmani/Desktop/arslanrehmani.com
npm install pdf-lib
npm install --save-dev tsx
```

Expected: `package.json` gains `"pdf-lib": "^..."` under `dependencies` and `"tsx": "^..."` under `devDependencies`; `package-lock.json` updates.

- [ ] **Step 2: Verify both resolve**

Run: `node -e "require.resolve('pdf-lib'); require.resolve('tsx'); console.log('ok')"`
Expected: prints `ok`

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add pdf-lib and tsx for ROI calculator PDF generation"
```

---

### Task 2: `lib/calculators/roi.ts` — pure calculation function

**Files:**
- Create: `lib/calculators/roi.ts`
- Test: `lib/calculators/roi.test.ts`

**Interfaces:**
- Consumes: nothing (pure function, no imports beyond TypeScript types)
- Produces:
  - `type CostBracket = 'under_40k' | '40_60k' | '60_80k' | '80_110k' | '110k_plus'`
  - `COST_BRACKET_LABELS: Record<CostBracket, string>`
  - `COST_BRACKET_SALARY: Record<CostBracket, number>`
  - `interface RoiCalculatorInputs { teamMembers: number; hoursPerWeek: number; costBracket: CostBracket }`
  - `interface RoiCalculatorResults { hourlyRate: number; currentAnnualCost: number; automatedAnnualCost: number; annualSavings: number; paybackPeriodMonths: number }`
  - `function calculateRoi(inputs: RoiCalculatorInputs): RoiCalculatorResults` — throws `RangeError` on invalid input (used by Task 6's route and Task 7's page)

- [ ] **Step 1: Write the failing test**

Create `lib/calculators/roi.test.ts`:

```ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calculateRoi } from './roi';

test('calculates savings for a typical mid-size case', () => {
  const result = calculateRoi({ teamMembers: 3, hoursPerWeek: 10, costBracket: '60_80k' });
  assert.equal(result.hourlyRate, 33.65);
  assert.equal(result.currentAnnualCost, 52500);
  assert.equal(result.automatedAnnualCost, 10275);
  assert.equal(result.annualSavings, 42225);
  assert.equal(result.paybackPeriodMonths, 4.3);
});

test('returns zero savings and zero payback when automation would cost more than doing nothing', () => {
  const result = calculateRoi({ teamMembers: 1, hoursPerWeek: 1, costBracket: 'under_40k' });
  assert.equal(result.annualSavings, 0);
  assert.equal(result.paybackPeriodMonths, 0);
});

test('throws RangeError on teamMembers < 1', () => {
  assert.throws(() => calculateRoi({ teamMembers: 0, hoursPerWeek: 5, costBracket: '40_60k' }), RangeError);
});

test('throws RangeError on negative hoursPerWeek', () => {
  assert.throws(() => calculateRoi({ teamMembers: 2, hoursPerWeek: -1, costBracket: '40_60k' }), RangeError);
});

test('throws RangeError on unknown costBracket', () => {
  // @ts-expect-error - intentionally invalid for the test
  assert.throws(() => calculateRoi({ teamMembers: 2, hoursPerWeek: 5, costBracket: 'bogus' }), RangeError);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx tsx --test lib/calculators/roi.test.ts`
Expected: FAIL — `Cannot find module './roi'` (the implementation file doesn't exist yet)

- [ ] **Step 3: Write the implementation**

Create `lib/calculators/roi.ts`:

```ts
export type CostBracket = 'under_40k' | '40_60k' | '60_80k' | '80_110k' | '110k_plus';

export const COST_BRACKET_LABELS: Record<CostBracket, string> = {
  under_40k: 'Under $40k',
  '40_60k': '$40k – $60k',
  '60_80k': '$60k – $80k',
  '80_110k': '$80k – $110k',
  '110k_plus': '$110k+',
};

export const COST_BRACKET_SALARY: Record<CostBracket, number> = {
  under_40k: 35000,
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

const WORK_HOURS_PER_YEAR = 2080;
const WEEKS_PER_YEAR = 52;
const AUTOMATION_TIME_REDUCTION = 0.85;
const PLATFORM_OVERHEAD_ANNUAL = 2400;
const DEV_INVESTMENT = 15000;

export function calculateRoi(inputs: RoiCalculatorInputs): RoiCalculatorResults {
  const { teamMembers, hoursPerWeek, costBracket } = inputs;

  if (!Number.isFinite(teamMembers) || teamMembers < 1) {
    throw new RangeError('teamMembers must be a finite number >= 1');
  }
  if (!Number.isFinite(hoursPerWeek) || hoursPerWeek < 0) {
    throw new RangeError('hoursPerWeek must be a finite number >= 0');
  }
  if (!(costBracket in COST_BRACKET_SALARY)) {
    throw new RangeError(`Unknown costBracket: ${costBracket}`);
  }

  const hourlyRate = COST_BRACKET_SALARY[costBracket] / WORK_HOURS_PER_YEAR;

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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx tsx --test lib/calculators/roi.test.ts`
Expected: PASS — 5 tests, 0 failures

- [ ] **Step 5: Commit**

```bash
git add lib/calculators/roi.ts lib/calculators/roi.test.ts
git commit -m "feat: add pure ROI calculation function with unit tests"
```

---

### Task 3: `lib/calculators/industry-context.ts` — static industry lookup

**Files:**
- Create: `lib/calculators/industry-context.ts`
- Test: `lib/calculators/industry-context.test.ts`

**Interfaces:**
- Consumes: nothing
- Produces:
  - `type Industry = 'ecommerce' | 'manufacturing' | 'professional_services' | 'logistics' | 'retail' | 'other'`
  - `interface IndustryContext { label: string; paragraph: string; automationReductionRange: string }`
  - `INDUSTRY_CONTEXT: Record<Industry, IndustryContext>` (used by Task 5's PDF generator and Task 6's route)

- [ ] **Step 1: Write the failing test**

Create `lib/calculators/industry-context.test.ts`:

```ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { INDUSTRY_CONTEXT } from './industry-context';

const EXPECTED_KEYS = ['ecommerce', 'manufacturing', 'professional_services', 'logistics', 'retail', 'other'];

test('has exactly the 6 expected industry keys', () => {
  assert.deepEqual(Object.keys(INDUSTRY_CONTEXT).sort(), EXPECTED_KEYS.sort());
});

test('every entry has a non-empty label, paragraph, and reduction range', () => {
  for (const key of EXPECTED_KEYS) {
    const entry = INDUSTRY_CONTEXT[key as keyof typeof INDUSTRY_CONTEXT];
    assert.ok(entry.label.length > 0, `${key} missing label`);
    assert.ok(entry.paragraph.length > 40, `${key} paragraph too short`);
    assert.match(entry.automationReductionRange, /^\d+-\d+%$/, `${key} range malformed`);
  }
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx tsx --test lib/calculators/industry-context.test.ts`
Expected: FAIL — `Cannot find module './industry-context'`

- [ ] **Step 3: Write the implementation**

Create `lib/calculators/industry-context.ts`:

```ts
export type Industry =
  | 'ecommerce'
  | 'manufacturing'
  | 'professional_services'
  | 'logistics'
  | 'retail'
  | 'other';

export interface IndustryContext {
  label: string;
  paragraph: string;
  automationReductionRange: string;
}

export const INDUSTRY_CONTEXT: Record<Industry, IndustryContext> = {
  ecommerce: {
    label: 'Ecommerce',
    paragraph:
      'For ecommerce operations, manual work is usually order reconciliation, inventory syncing across channels, and manually pulling sales reports from separate platforms. These are the first processes worth automating because they compound with every new SKU or sales channel.',
    automationReductionRange: '75-90%',
  },
  manufacturing: {
    label: 'Manufacturing',
    paragraph:
      'In manufacturing, manual work concentrates in production scheduling, machine allocation, and paper-based or spreadsheet inventory tracking. Automating these typically has the largest single impact on throughput, not just admin time.',
    automationReductionRange: '70-85%',
  },
  professional_services: {
    label: 'Professional Services',
    paragraph:
      'For professional services firms, manual work is usually time tracking, client reporting, and invoicing across disconnected tools. Automation here mainly reclaims billable hours currently lost to administration.',
    automationReductionRange: '65-80%',
  },
  logistics: {
    label: 'Logistics',
    paragraph:
      'In logistics, manual work is dispatch coordination, shipment status updates, and reconciling carrier data against orders. These processes are highly repetitive and among the most automatable in any industry.',
    automationReductionRange: '75-90%',
  },
  retail: {
    label: 'Retail',
    paragraph:
      'For retail businesses, manual work is inventory counts, point-of-sale reconciliation, and pulling performance reports across locations or channels. Automating these frees staff for the parts of the business that actually need a human.',
    automationReductionRange: '70-85%',
  },
  other: {
    label: 'General Operations',
    paragraph:
      'Across most operationally-heavy businesses, manual work concentrates in reporting, data entry between disconnected tools, and reconciliation. These are the processes with the most predictable return once automated.',
    automationReductionRange: '65-85%',
  },
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx tsx --test lib/calculators/industry-context.test.ts`
Expected: PASS — 2 tests, 0 failures

- [ ] **Step 5: Commit**

```bash
git add lib/calculators/industry-context.ts lib/calculators/industry-context.test.ts
git commit -m "feat: add static industry-context lookup for ROI PDF report"
```

---

### Task 4: Extend `lib/supabase.ts` to carry `tool_data` / `source_tool` on leads

**Files:**
- Modify: `lib/supabase.ts`

**Interfaces:**
- Consumes: nothing new
- Produces: `insertLead(email: string, source: string, extra?: { sourceTool?: string; toolData?: Record<string, unknown> }): Promise<any[]>` — the 3rd parameter is optional and additive, so all 3 existing call sites (`app/contact/page.tsx`, `components/tools-section.tsx`, `app/api/leads/route.ts`) keep working unchanged. Used by Task 6's route.

**Note:** `lib/supabase.ts` has no existing automated tests (it talks to a real or mock Supabase client depending on env vars), so this task is verified manually rather than with a new test file — consistent with the current state of this file.

- [ ] **Step 1: Read the current file to confirm line numbers before editing**

Run: `grep -n "export async function insertLead" lib/supabase.ts`
Expected: prints the line number of the current `insertLead` declaration (do not hardcode a line number in this plan — the codebase may have shifted since this plan was written; use whatever `grep` reports).

- [ ] **Step 2: Replace the `insertLead` function**

Modify `lib/supabase.ts` — replace the existing `insertLead` function (currently taking `(email, source)`) with:

```ts
export interface LeadExtra {
  sourceTool?: string;
  toolData?: Record<string, unknown>;
}

export async function insertLead(email: string, source: string, extra?: LeadExtra) {
  const row = {
    email,
    source,
    created_at: new Date().toISOString(),
    ...(extra?.sourceTool ? { source_tool: extra.sourceTool } : {}),
    ...(extra?.toolData ? { tool_data: extra.toolData } : {}),
  };

  if (supabase) {
    const { data, error } = await supabase.from('leads').insert([row]).select();
    if (error) throw error;
    return data;
  } else {
    console.log(`[MOCK SUPABASE] Saved Lead: Email=${email}, Source=${source}`, extra ?? '');
    return [{ id: 'mock-uuid', ...row }];
  }
}
```

Leave `insertToolSubmission` untouched — it's out of scope for this task.

- [ ] **Step 3: Verify the existing call sites still typecheck**

Run: `npx tsc --noEmit`
Expected: no new errors related to `insertLead` call sites in `app/contact/page.tsx`, `components/tools-section.tsx`, or `app/api/leads/route.ts` (they all call `insertLead(email, source)` with 2 args, which remains valid since `extra` is optional)

- [ ] **Step 4: Manually verify mock-mode behavior**

Run:
```bash
node -e "
process.env.NEXT_PUBLIC_SUPABASE_URL = '';
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = '';
require('tsx/cjs');
const { insertLead } = require('./lib/supabase.ts');
insertLead('test@example.com', 'ROI Calculator PDF', { sourceTool: 'roi_calculator', toolData: { foo: 'bar' } })
  .then((r) => console.log('RESULT', JSON.stringify(r)));
"
```
Expected: prints a `[MOCK SUPABASE] Saved Lead: ...` line followed by `RESULT [{"id":"mock-uuid","email":"test@example.com","source":"ROI Calculator PDF", ... ,"source_tool":"roi_calculator","tool_data":{"foo":"bar"}}]` — confirms both new fields are present when `extra` is passed, and confirms backward compatibility isn't broken.

- [ ] **Step 5: Commit**

```bash
git add lib/supabase.ts
git commit -m "feat: extend insertLead with optional sourceTool/toolData for tool-generated leads"
```

---

### Task 5: `lib/pdf/roi-report.ts` — PDF generator

**Files:**
- Create: `lib/pdf/roi-report.ts`
- Test: `lib/pdf/roi-report.test.ts`

**Interfaces:**
- Consumes: `calculateRoi`, `RoiCalculatorInputs`, `RoiCalculatorResults`, `COST_BRACKET_LABELS` from `lib/calculators/roi.ts` (Task 2); `IndustryContext`, `INDUSTRY_CONTEXT` from `lib/calculators/industry-context.ts` (Task 3)
- Produces: `function generateRoiReportPdf(params: { inputs: RoiCalculatorInputs; results: RoiCalculatorResults; industry: IndustryContext }): Promise<Uint8Array>` — used by Task 6's route

**Design note:** the PDF uses a light background with the site's gold (`#C9A84C`) as an accent color, not a literal black page — a downloadable/printable leave-behind document that's mostly black ink on black paper is impractical to read or print. This is a deliberate adaptation of "matches the site's aesthetic" for a print medium, not a contradiction of it.

- [ ] **Step 1: Write the failing test**

Create `lib/pdf/roi-report.test.ts`:

```ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { generateRoiReportPdf } from './roi-report';
import { calculateRoi } from '../calculators/roi';
import { INDUSTRY_CONTEXT } from '../calculators/industry-context';

test('generates a valid, non-trivial PDF byte stream', async () => {
  const inputs = { teamMembers: 3, hoursPerWeek: 10, costBracket: '60_80k' as const };
  const results = calculateRoi(inputs);
  const bytes = await generateRoiReportPdf({ inputs, results, industry: INDUSTRY_CONTEXT.ecommerce });

  assert.ok(bytes instanceof Uint8Array);
  assert.ok(bytes.length > 500, `expected a real PDF, got ${bytes.length} bytes`);
  const header = Buffer.from(bytes.slice(0, 5)).toString('utf-8');
  assert.equal(header, '%PDF-');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx tsx --test lib/pdf/roi-report.test.ts`
Expected: FAIL — `Cannot find module './roi-report'`

- [ ] **Step 3: Write the implementation**

Create `lib/pdf/roi-report.ts`:

```ts
import { PDFDocument, StandardFonts, rgb, PDFFont } from 'pdf-lib';
import { RoiCalculatorInputs, RoiCalculatorResults, COST_BRACKET_LABELS } from '@/lib/calculators/roi';
import { IndustryContext } from '@/lib/calculators/industry-context';

export interface RoiReportParams {
  inputs: RoiCalculatorInputs;
  results: RoiCalculatorResults;
  industry: IndustryContext;
}

const GOLD = rgb(0.788, 0.659, 0.298); // #C9A84C
const INK = rgb(0.09, 0.09, 0.09);
const MUTED = rgb(0.4, 0.4, 0.4);
const PAGE_WIDTH = 612; // US Letter, points
const PAGE_HEIGHT = 792;
const MARGIN = 56;

function formatCurrency(value: number): string {
  return `$${value.toLocaleString('en-US')}`;
}

export async function generateRoiReportPdf(params: RoiReportParams): Promise<Uint8Array> {
  const { inputs, results, industry } = params;

  const doc = await PDFDocument.create();
  const page = doc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const regular = await doc.embedFont(StandardFonts.Helvetica);

  let y = PAGE_HEIGHT - MARGIN;

  const drawLine = (
    text: string,
    opts: { font?: PDFFont; size?: number; color?: ReturnType<typeof rgb>; gap?: number }
  ) => {
    const font = opts.font ?? regular;
    const size = opts.size ?? 11;
    page.drawText(text, { x: MARGIN, y, size, font, color: opts.color ?? INK });
    y -= opts.gap ?? size + 8;
  };

  drawLine('ROI CALCULATOR REPORT', { font: bold, size: 12, color: GOLD, gap: 20 });
  drawLine('Arslan Rehmani — Operational AI Systems', { size: 10, color: MUTED, gap: 32 });

  drawLine(`Industry: ${industry.label}`, { font: bold, size: 13, gap: 24 });

  drawLine('Your Inputs', { font: bold, size: 13, color: GOLD, gap: 20 });
  drawLine(`Team members on manual work: ${inputs.teamMembers}`, { gap: 16 });
  drawLine(`Hours per week per person: ${inputs.hoursPerWeek}`, { gap: 16 });
  drawLine(`Cost bracket: ${COST_BRACKET_LABELS[inputs.costBracket]}`, { gap: 32 });

  drawLine('Results', { font: bold, size: 13, color: GOLD, gap: 20 });
  drawLine(`Current annual cost: ${formatCurrency(results.currentAnnualCost)}`, { gap: 16 });
  drawLine(`Projected annual cost after automation: ${formatCurrency(results.automatedAnnualCost)}`, { gap: 16 });
  drawLine(`Annual savings: ${formatCurrency(results.annualSavings)}`, { font: bold, size: 14, color: GOLD, gap: 16 });
  drawLine(`Estimated payback period: ${results.paybackPeriodMonths} months`, { gap: 32 });

  drawLine(`${industry.label} Context`, { font: bold, size: 13, color: GOLD, gap: 20 });

  const words = industry.paragraph.split(' ');
  const maxCharsPerLine = 78;
  let line = '';
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (candidate.length > maxCharsPerLine) {
      drawLine(line, { size: 10, color: MUTED, gap: 15 });
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) drawLine(line, { size: 10, color: MUTED, gap: 15 });

  y -= 8;
  drawLine(
    `Typical automation reduction in this range: ${industry.automationReductionRange} of current manual hours.`,
    { size: 10, color: MUTED, gap: 24 }
  );

  drawLine('Want to talk through what this looks like for your business?', { font: bold, size: 12, gap: 16 });
  drawLine('arslanrehmani.com/contact', { size: 11, color: GOLD, gap: 16 });

  return doc.save();
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx tsx --test lib/pdf/roi-report.test.ts`
Expected: PASS — 1 test, 0 failures

- [ ] **Step 5: Commit**

```bash
git add lib/pdf/roi-report.ts lib/pdf/roi-report.test.ts
git commit -m "feat: add pdf-lib based ROI report generator"
```

---

### Task 6: Rewrite `app/api/calculator/route.ts`

**Files:**
- Modify: `app/api/calculator/route.ts` (full rewrite — the Claude call and `performLocalCalculations` are deleted entirely)

**Interfaces:**
- Consumes: `calculateRoi`, `CostBracket`, `COST_BRACKET_SALARY` (Task 2); `INDUSTRY_CONTEXT`, `Industry` (Task 3); `generateRoiReportPdf` (Task 5); `insertLead` (Task 4)
- Produces: `POST /api/calculator` — request body `{ teamMembers: number, hoursPerWeek: number, costBracket: string, industry: string, email: string }`, response is either a `400`/`500` JSON error or a `200` with `Content-Type: application/pdf` and the PDF binary as the body. Used by Task 7's page.

- [ ] **Step 1: Replace the route file**

Replace the entire contents of `app/api/calculator/route.ts` with:

```ts
// app/api/calculator/route.ts
import { NextResponse } from 'next/server';
import { calculateRoi, CostBracket, COST_BRACKET_SALARY } from '@/lib/calculators/roi';
import { INDUSTRY_CONTEXT, Industry } from '@/lib/calculators/industry-context';
import { generateRoiReportPdf } from '@/lib/pdf/roi-report';
import { insertLead } from '@/lib/supabase';

function isValidCostBracket(value: unknown): value is CostBracket {
  return typeof value === 'string' && value in COST_BRACKET_SALARY;
}

function isValidIndustry(value: unknown): value is Industry {
  return typeof value === 'string' && value in INDUSTRY_CONTEXT;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { teamMembers, hoursPerWeek, costBracket, industry, email } = body;

    const tm = Number(teamMembers);
    const hpw = Number(hoursPerWeek);

    if (!Number.isFinite(tm) || tm < 1) {
      return NextResponse.json({ error: 'teamMembers must be a number >= 1' }, { status: 400 });
    }
    if (!Number.isFinite(hpw) || hpw < 0) {
      return NextResponse.json({ error: 'hoursPerWeek must be a number >= 0' }, { status: 400 });
    }
    if (!isValidCostBracket(costBracket)) {
      return NextResponse.json({ error: 'Invalid costBracket' }, { status: 400 });
    }
    if (!isValidIndustry(industry)) {
      return NextResponse.json({ error: 'Invalid industry' }, { status: 400 });
    }
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }

    const inputs = { teamMembers: tm, hoursPerWeek: hpw, costBracket };
    const results = calculateRoi(inputs);
    const industryContext = INDUSTRY_CONTEXT[industry];

    const pdfBytes = await generateRoiReportPdf({ inputs, results, industry: industryContext });

    try {
      await insertLead(email, 'ROI Calculator PDF', {
        sourceTool: 'roi_calculator',
        toolData: { inputs, industry, results },
      });
    } catch (leadError) {
      console.error('Failed to save ROI calculator lead:', leadError);
    }

    return new NextResponse(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="roi-calculator-report.pdf"',
      },
    });
  } catch (error: any) {
    console.error('Error in calculator API:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 3: Manual verification — start the dev server and exercise the route directly**

Run:
```bash
npm run dev &
sleep 4
curl -s -o /tmp/roi-test.pdf -D - -X POST http://localhost:3000/api/calculator \
  -H "Content-Type: application/json" \
  -d '{"teamMembers":3,"hoursPerWeek":10,"costBracket":"60_80k","industry":"ecommerce","email":"test@example.com"}'
```
Expected: response headers show `HTTP/1.1 200 OK` and `content-type: application/pdf`; `/tmp/roi-test.pdf` exists and starts with `%PDF-` (verify with `head -c 5 /tmp/roi-test.pdf`); the terminal running `npm run dev` shows a `[MOCK SUPABASE] Saved Lead: Email=test@example.com, Source=ROI Calculator PDF` line (assuming no real Supabase env vars are set locally).

- [ ] **Step 4: Manual verification — invalid input returns 400, not a crash**

Run:
```bash
curl -s -w "\n%{http_code}\n" -X POST http://localhost:3000/api/calculator \
  -H "Content-Type: application/json" \
  -d '{"teamMembers":0,"hoursPerWeek":10,"costBracket":"60_80k","industry":"ecommerce","email":"test@example.com"}'
```
Expected: `400` status, JSON body `{"error":"teamMembers must be a number >= 1"}`

Stop the dev server: `kill %1` (or the appropriate job).

- [ ] **Step 5: Commit**

```bash
git add app/api/calculator/route.ts
git commit -m "feat: rewrite calculator API route to generate PDF instead of calling Claude"
```

---

### Task 7: Rewrite `app/tools/calculator/page.tsx`

**Files:**
- Modify: `app/tools/calculator/page.tsx` (full rewrite)

**Interfaces:**
- Consumes: `calculateRoi`, `COST_BRACKET_LABELS`, `CostBracket` (Task 2); `POST /api/calculator` (Task 6)
- Produces: the `/tools/calculator` page — no other file depends on this one

- [ ] **Step 1: Replace the page file**

Replace the entire contents of `app/tools/calculator/page.tsx` with:

```tsx
// app/tools/calculator/page.tsx
'use client';

import { useMemo, useState } from 'react';
import { calculateRoi, COST_BRACKET_LABELS, CostBracket } from '@/lib/calculators/roi';

const inputClasses =
  'w-full bg-bg-secondary border border-border-color rounded-xl px-4 py-3 text-text-primary focus:border-accent-gold focus:outline-none transition-colors duration-200';

const INDUSTRY_OPTIONS: { value: string; label: string }[] = [
  { value: 'ecommerce', label: 'Ecommerce' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'professional_services', label: 'Professional Services' },
  { value: 'logistics', label: 'Logistics' },
  { value: 'retail', label: 'Retail' },
  { value: 'other', label: 'Other' },
];

export default function CalculatorPage() {
  const [teamMembers, setTeamMembers] = useState('3');
  const [hoursPerWeek, setHoursPerWeek] = useState('10');
  const [costBracket, setCostBracket] = useState<CostBracket>('60_80k');

  const [showGate, setShowGate] = useState(false);
  const [industry, setIndustry] = useState('ecommerce');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const results = useMemo(() => {
    const tm = parseFloat(teamMembers);
    const hpw = parseFloat(hoursPerWeek);
    if (!Number.isFinite(tm) || tm < 1 || !Number.isFinite(hpw) || hpw < 0) {
      return null;
    }
    return calculateRoi({ teamMembers: tm, hoursPerWeek: hpw, costBracket });
  }, [teamMembers, hoursPerWeek, costBracket]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!results) return;
    setStatus('loading');

    try {
      const response = await fetch('/api/calculator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teamMembers: parseFloat(teamMembers),
          hoursPerWeek: parseFloat(hoursPerWeek),
          costBracket,
          industry,
          email,
        }),
      });

      if (!response.ok) {
        setStatus('error');
        return;
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'roi-calculator-report.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <main className="bg-bg-primary">
      <div className="max-w-3xl mx-auto px-6 pt-36 pb-20 w-full">
        <span className="eyebrow mb-5">Insights</span>
        <h1 className="headline text-3xl md:text-5xl leading-[1.1]">ROI Calculator</h1>
        <p className="text-base text-text-muted leading-relaxed mt-4">
          Team size, hours, and pay range in — the annual cost of your manual workflow, and what
          automating it would save, out.
        </p>

        <div className="bg-bg-secondary border border-border-color p-8 rounded-2xl mt-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="teamMembers" className="text-sm text-text-muted">
                Team members on manual work
              </label>
              <input
                type="number"
                id="teamMembers"
                min="1"
                step="1"
                value={teamMembers}
                onChange={(e) => setTeamMembers(e.target.value)}
                className={inputClasses}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="hoursPerWeek" className="text-sm text-text-muted">
                Hours/week per person
              </label>
              <input
                type="number"
                id="hoursPerWeek"
                min="0"
                step="1"
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(e.target.value)}
                className={inputClasses}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="costBracket" className="text-sm text-text-muted">
                Cost bracket
              </label>
              <select
                id="costBracket"
                value={costBracket}
                onChange={(e) => setCostBracket(e.target.value as CostBracket)}
                className={inputClasses}
              >
                {Object.entries(COST_BRACKET_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {results ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 pt-8 border-t border-border-color">
              <div>
                <span className="block text-xs text-text-subtle uppercase tracking-wider mb-1">
                  Current annual cost
                </span>
                <span className="font-serif text-2xl text-text-primary">
                  ${results.currentAnnualCost.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="block text-xs text-text-subtle uppercase tracking-wider mb-1">
                  Projected cost after automation
                </span>
                <span className="font-serif text-2xl text-text-primary">
                  ${results.automatedAnnualCost.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="block text-xs text-text-subtle uppercase tracking-wider mb-1">
                  Annual savings
                </span>
                <span className="font-serif text-3xl text-accent-gold">
                  ${results.annualSavings.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="block text-xs text-text-subtle uppercase tracking-wider mb-1">
                  Payback period
                </span>
                <span className="font-serif text-2xl text-text-primary">
                  {results.paybackPeriodMonths > 0 ? `${results.paybackPeriodMonths} months` : '—'}
                </span>
              </div>
            </div>
          ) : (
            <p className="text-sm text-text-subtle mt-10 pt-8 border-t border-border-color">
              Enter a team size of at least 1 and a valid hours/week to see your numbers.
            </p>
          )}

          {results && !showGate && status !== 'success' && (
            <div className="mt-8">
              <button onClick={() => setShowGate(true)} className="btn-primary">
                Get my PDF breakdown
              </button>
            </div>
          )}

          {results && showGate && status !== 'success' && (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-8 pt-8 border-t border-border-color">
              <div className="flex flex-col gap-2">
                <label htmlFor="industry" className="text-sm text-text-muted">
                  Industry
                </label>
                <select
                  id="industry"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className={inputClasses}
                >
                  {INDUSTRY_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm text-text-muted">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClasses}
                />
              </div>

              <button type="submit" disabled={status === 'loading'} className="btn-primary disabled:opacity-50">
                {status === 'loading' ? 'Generating' : 'Download my PDF breakdown'}
              </button>

              {status === 'error' && (
                <p className="text-sm text-text-muted text-center">
                  Something went wrong generating your PDF. Try again.
                </p>
              )}
            </form>
          )}

          {status === 'success' && (
            <div className="mt-8 pt-8 border-t border-border-color text-center">
              <p className="text-base text-text-primary">Downloaded — want to talk this through?</p>
              <a href="/contact" className="link-gold mt-3 inline-flex">
                Get in touch →
              </a>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Typecheck and lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors, no ESLint warnings

- [ ] **Step 3: Commit**

```bash
git add app/tools/calculator/page.tsx
git commit -m "feat: rebuild ROI calculator page with live client-side results and PDF gate"
```

---

### Task 8: Full build verification and browser check

**Files:** none created or modified — verification only

**Interfaces:**
- Consumes: everything from Tasks 1-7
- Produces: nothing — this is the final gate before considering Phase 1 done

- [ ] **Step 1: Clean build**

Run:
```bash
cd /Users/arslanrehmani/Desktop/arslanrehmani.com
rm -rf .next
npm run build
```
Expected: `✓ Compiled successfully`, no errors

- [ ] **Step 2: Run all unit tests together**

Run: `npx tsx --test lib/calculators/roi.test.ts lib/calculators/industry-context.test.ts lib/pdf/roi-report.test.ts`
Expected: PASS — 8 tests total, 0 failures

- [ ] **Step 3: Start the production build and verify the page renders**

Run:
```bash
npx next start -p 3140 &
sleep 5
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3140/tools/calculator
```
Expected: `200`

- [ ] **Step 4: Screenshot the live page to confirm design-system consistency**

Run:
```bash
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$CHROME" --headless --disable-gpu --hide-scrollbars --force-device-scale-factor=2 --window-size=1440,1400 \
  --screenshot=/tmp/roi-calculator-check.png http://localhost:3140/tools/calculator
```
Expected: file is created; visually inspect it to confirm the page uses the `.eyebrow`/`.headline`/`.btn-primary` treatment matching the rest of the site (gold accents, dark background, serif headline), not the old flat styling from before this plan.

- [ ] **Step 5: End-to-end manual flow check in the screenshot or a real browser**

Confirm: entering team members / hours / cost bracket updates the results panel with no page reload; clicking "Get my PDF breakdown" reveals industry + email fields; submitting downloads a PDF file starting with the site's ROI report header. Stop the server: `kill %1`.

- [ ] **Step 6: Final commit**

```bash
git add -A
git status --short
```
Expected: clean or only intentional changes remain staged; if clean, no commit needed (all work was already committed per-task). If anything is unstaged, commit it with an accurate message before considering Phase 1 complete.
