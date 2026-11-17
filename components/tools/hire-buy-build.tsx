'use client';

import { useMemo, useState } from 'react';
import ToolShell from '@/components/tools/tool-shell';
import { Bar, FieldGrid, Headline, Insight, NumberField, Panel, Rows, ToolColumns, num, useCurrency } from '@/components/tools/ui';
import { calcHireBuyBuild } from '@/lib/tools/calc';

export default function HireBuyBuildTool() {
  const currency = useCurrency();
  const [manualHoursPerWeek, setManualHoursPerWeek] = useState(80);
  const [hourlyCost, setHourlyCost] = useState(30);
  const [weeksPerYear, setWeeksPerYear] = useState(48);
  const [years, setYears] = useState(3);
  const [hireAnnualCost, setHireAnnualCost] = useState(45000);
  const [hireHoursPerWeek, setHireHoursPerWeek] = useState(35);
  const [buySetup, setBuySetup] = useState(5000);
  const [buyMonthly, setBuyMonthly] = useState(800);
  const [buyCoveragePct, setBuyCoveragePct] = useState(50);
  const [buildCost, setBuildCost] = useState(40000);
  const [buildAnnualRun, setBuildAnnualRun] = useState(6000);
  const [buildCoveragePct, setBuildCoveragePct] = useState(85);

  const r = useMemo(
    () =>
      calcHireBuyBuild({
        manualHoursPerWeek, hourlyCost, weeksPerYear, years,
        hireAnnualCost, hireHoursPerWeek,
        buySetup, buyMonthly, buyCoveragePct,
        buildCost, buildAnnualRun, buildCoveragePct,
      }),
    [manualHoursPerWeek, hourlyCost, weeksPerYear, years, hireAnnualCost, hireHoursPerWeek, buySetup, buyMonthly, buyCoveragePct, buildCost, buildAnnualRun, buildCoveragePct]
  );

  const max = Math.max(1, ...r.options.map((o) => o.total));
  const months = (m: number | null) => (m === null ? 'Does not pay back' : `${num(m, 1)} months`);
  const summary =
    `Over ${r.years} years, with ${num(manualHoursPerWeek)} manual hours a week: ` +
    r.options.map((o) => `${o.label} ${currency.money(o.total)}`).join(', ') +
    `. Lowest cost: ${r.cheapest.label.toLowerCase()}.`;

  return (
    <ToolShell
      slug="hire-buy-build"
      currency={currency}
      intro="When manual work piles up there are three ways out: hire someone, buy software, or build a system. Enter the quotes you have and compare the full cost of each."
      summary={summary}
      method={
        <>
          <p>Change nothing = manual hours × cost of one hour, for every year.</p>
          <p>Hire = people needed to cover the hours × the yearly cost of one person. The work is still done by hand.</p>
          <p>
            Buy and build = the upfront cost, plus the yearly running cost, plus the cost of the
            manual work the system does not remove. Payback is the upfront cost divided by the
            monthly saving against changing nothing.
          </p>
          <p>The prices and the share of work removed are yours to enter. Use real quotes where you have them.</p>
        </>
      }
    >
      <ToolColumns
        inputs={
          <>
            <Panel title="The manual work today">
              <FieldGrid>
                <NumberField label="Manual hours per week" value={manualHoursPerWeek} onChange={setManualHoursPerWeek} suffix="hours" hint="Everyone combined." />
                <NumberField label="Cost of one hour" value={hourlyCost} onChange={setHourlyCost} prefix={currency.symbol} />
                <NumberField label="Working weeks per year" value={weeksPerYear} onChange={setWeeksPerYear} min={1} max={52} suffix="weeks" />
                <NumberField label="Compare over" value={years} onChange={setYears} min={1} max={10} suffix="years" />
              </FieldGrid>
            </Panel>

            <Panel title="Hire">
              <FieldGrid>
                <NumberField label="Yearly cost of one more person" value={hireAnnualCost} onChange={setHireAnnualCost} prefix={currency.symbol} step={1000} hint="Salary plus on-costs." />
                <NumberField label="Productive hours they give per week" value={hireHoursPerWeek} onChange={setHireHoursPerWeek} min={1} max={60} suffix="hours" />
              </FieldGrid>
            </Panel>

            <Panel title="Buy software">
              <FieldGrid>
                <NumberField label="Setup and migration" value={buySetup} onChange={setBuySetup} prefix={currency.symbol} step={500} />
                <NumberField label="Subscription per month" value={buyMonthly} onChange={setBuyMonthly} prefix={currency.symbol} step={50} hint="All users combined." />
                <NumberField label="Share of the manual work it removes" value={buyCoveragePct} onChange={setBuyCoveragePct} max={100} suffix="%" hint="Packaged software rarely fits every step." />
              </FieldGrid>
            </Panel>

            <Panel title="Build a system">
              <FieldGrid>
                <NumberField label="Build cost" value={buildCost} onChange={setBuildCost} prefix={currency.symbol} step={1000} />
                <NumberField label="Running and upkeep per year" value={buildAnnualRun} onChange={setBuildAnnualRun} prefix={currency.symbol} step={500} />
                <NumberField label="Share of the manual work it removes" value={buildCoveragePct} onChange={setBuildCoveragePct} max={100} suffix="%" />
              </FieldGrid>
            </Panel>
          </>
        }
        result={
          <Panel>
            <Headline
              label={`Lowest cost over ${r.years} ${r.years === 1 ? 'year' : 'years'}`}
              value={r.cheapest.label}
              note={`${currency.money(r.cheapest.total)} in total, including the manual work that remains.`}
            />
            <div className="space-y-5 mt-8">
              {r.options.map((o) => (
                <Bar key={o.key} label={o.label} value={currency.money(o.total)} share={(o.total / max) * 100} highlight={o.key === r.cheapest.key} />
              ))}
            </div>
            <Rows
              rows={[
                { label: 'Manual work costs today, per year', value: currency.money(r.annualManualCost) },
                { label: 'People needed if you hire', value: num(r.peopleNeeded) },
                { label: 'Software pays back in', value: months(r.buyPaybackMonths) },
                { label: 'A built system pays back in', value: months(r.buildPaybackMonths), strong: true },
              ]}
            />
            <Insight>
              {r.cheapest.key === 'nothing'
                ? 'On these numbers the manual work is cheaper than fixing it. That is a real answer: do not automate this yet.'
                : r.cheapest.key === 'hire'
                  ? 'On these numbers hiring is cheapest. Remember that the work is still manual, so the cost grows with every new order.'
                  : r.cheapest.key === 'buy'
                    ? 'On these numbers packaged software wins. Check the share of work it really removes before you sign: that figure decides it.'
                    : 'On these numbers a built system wins, because it removes more of the work. The share it removes is the figure to test first.'}
            </Insight>
          </Panel>
        }
      />
    </ToolShell>
  );
}
