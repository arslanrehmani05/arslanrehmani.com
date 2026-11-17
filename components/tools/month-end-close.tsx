'use client';

import { useMemo, useState } from 'react';
import ToolShell from '@/components/tools/tool-shell';
import { FieldGrid, Headline, Insight, NumberField, Panel, Rows, ToolColumns, num, useCurrency } from '@/components/tools/ui';
import { calcClose } from '@/lib/tools/calc';

export default function MonthEndCloseTool() {
  const currency = useCurrency();
  const [people, setPeople] = useState(3);
  const [closeDays, setCloseDays] = useState(10);
  const [hoursPerDay, setHoursPerDay] = useState(5);
  const [hourlyCost, setHourlyCost] = useState(40);
  const [closesPerYear, setClosesPerYear] = useState(12);
  const [targetDays, setTargetDays] = useState(3);

  const r = useMemo(
    () => calcClose({ people, closeDays, hoursPerDay, hourlyCost, closesPerYear, targetDays }),
    [people, closeDays, hoursPerDay, hourlyCost, closesPerYear, targetDays]
  );

  const summary = `${people} people take ${closeDays} working days to close, ${closesPerYear} times a year. That is ${num(r.annualHours)} hours and ${currency.money(r.annualCost)} a year. Closing in ${r.targetDays} days would free ${num(r.hoursFreed)} hours (${currency.money(r.costFreed)}) a year.`;

  return (
    <ToolShell
      slug="month-end-close"
      currency={currency}
      intro="Enter how your close runs today. You will see what it costs in a year, and what closing faster would give back."
      summary={summary}
      method={
        <>
          <p>Hours per close = people × working days × hours each spends on the close per day.</p>
          <p>Yearly cost = hours per close × closes per year × cost of one hour.</p>
          <p>
            The faster close keeps the same people and the same hours per day, and only shortens the
            number of days. Days without final numbers = days to close × closes per year.
          </p>
        </>
      }
    >
      <ToolColumns
        inputs={
          <>
            <Panel title="Your close today">
              <FieldGrid>
                <NumberField label="People who work on the close" value={people} onChange={setPeople} min={1} />
                <NumberField
                  label="Working days it takes"
                  value={closeDays}
                  onChange={setCloseDays}
                  min={1}
                  suffix="days"
                  hint="From period end to final numbers."
                />
                <NumberField
                  label="Hours each spends on it per day"
                  value={hoursPerDay}
                  onChange={setHoursPerDay}
                  min={0}
                  max={24}
                  step={0.5}
                  suffix="hours"
                />
                <NumberField
                  label="Cost of one hour of their time"
                  value={hourlyCost}
                  onChange={setHourlyCost}
                  prefix={currency.symbol}
                  hint="Salary plus on-costs, divided by hours worked."
                />
                <NumberField
                  label="Closes per year"
                  value={closesPerYear}
                  onChange={setClosesPerYear}
                  min={1}
                  hint="12 for monthly, 4 for quarterly."
                />
              </FieldGrid>
            </Panel>

            <Panel title="The close you want">
              <FieldGrid>
                <NumberField
                  label="Target working days"
                  value={targetDays}
                  onChange={setTargetDays}
                  min={1}
                  max={closeDays}
                  suffix="days"
                />
              </FieldGrid>
            </Panel>
          </>
        }
        result={
          <Panel>
            <Headline label="Your close costs each year" value={currency.money(r.annualCost)} />
            <Rows
              rows={[
                { label: 'Hours per close', value: num(r.hoursPerClose) },
                { label: 'Hours per year', value: num(r.annualHours) },
                { label: 'Working days a year without final numbers', value: num(r.daysWithoutNumbers) },
                { label: `Hours freed by a ${r.targetDays}-day close`, value: num(r.hoursFreed) },
                { label: 'Worth each year', value: currency.money(r.costFreed), strong: true },
              ]}
            />
            <Insight>
              {r.daysRecovered > 0
                ? `A ${r.targetDays}-day close gives you final numbers ${num(r.daysRecovered)} working days sooner across the year. That is ${num(r.daysRecovered)} more days of deciding on figures you trust.`
                : 'Your target is the same as your close today. Lower the target to see what a faster close gives back.'}
            </Insight>
          </Panel>
        }
      />
    </ToolShell>
  );
}
