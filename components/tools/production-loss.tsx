'use client';

import { useMemo, useState } from 'react';
import ToolShell from '@/components/tools/tool-shell';
import { Bar, FieldGrid, Headline, Insight, NumberField, Panel, Rows, ToolColumns, num, useCurrency } from '@/components/tools/ui';
import { calcProduction } from '@/lib/tools/calc';

export default function ProductionLossTool() {
  const currency = useCurrency();
  const [machines, setMachines] = useState(20);
  const [plannedHoursPerDay, setPlannedHoursPerDay] = useState(22);
  const [daysPerMonth, setDaysPerMonth] = useState(26);
  const [stoppageHoursPerDay, setStoppageHoursPerDay] = useState(2.5);
  const [speedPct, setSpeedPct] = useState(90);
  const [rejectPct, setRejectPct] = useState(3);
  const [valuePerGoodHour, setValuePerGoodHour] = useState(15);

  const r = useMemo(
    () => calcProduction({ machines, plannedHoursPerDay, daysPerMonth, stoppageHoursPerDay, speedPct, rejectPct, valuePerGoodHour }),
    [machines, plannedHoursPerDay, daysPerMonth, stoppageHoursPerDay, speedPct, rejectPct, valuePerGoodHour]
  );

  const top = r.losses[0];
  const maxHours = Math.max(1, ...r.losses.map((l) => l.hours));
  const summary = `${machines} machines run at ${num(r.effectiveness, 1)}% effectiveness. ${num(r.lostHours)} machine-hours are lost a month, worth ${currency.money(r.monthlyLoss)} a month and ${currency.money(r.annualLoss)} a year. Biggest loss: ${top.label.toLowerCase()}.`;

  return (
    <ToolShell
      slug="production-loss"
      currency={currency}
      intro="A machine can be busy all shift and still lose a fifth of its output. Enter your floor figures to see where the hours go and what they are worth."
      summary={summary}
      method={
        <>
          <p>Availability = (planned hours − unplanned stoppages) ÷ planned hours.</p>
          <p>Effectiveness = availability × running speed × share of output that is good. This is the standard overall equipment effectiveness calculation.</p>
          <p>Lost machine-hours = planned hours × (1 − effectiveness). Their value uses your own figure for what one good machine-hour is worth.</p>
        </>
      }
    >
      <ToolColumns
        inputs={
          <>
            <Panel title="Your floor">
              <FieldGrid>
                <NumberField label="Machines" value={machines} onChange={setMachines} min={1} />
                <NumberField label="Planned running hours per day" value={plannedHoursPerDay} onChange={setPlannedHoursPerDay} max={24} step={0.5} suffix="hours" hint="Per machine." />
                <NumberField label="Working days per month" value={daysPerMonth} onChange={setDaysPerMonth} max={31} suffix="days" />
                <NumberField
                  label="Value of one good machine-hour"
                  value={valuePerGoodHour}
                  onChange={setValuePerGoodHour}
                  prefix={currency.symbol}
                  step={0.5}
                  hint="The margin one machine earns in an hour of good output."
                />
              </FieldGrid>
            </Panel>

            <Panel title="Where output is lost">
              <FieldGrid>
                <NumberField
                  label="Unplanned stoppages per day"
                  value={stoppageHoursPerDay}
                  onChange={setStoppageHoursPerDay}
                  max={plannedHoursPerDay}
                  step={0.25}
                  suffix="hours"
                  hint="Per machine: breakdowns, waiting for material, changeovers that overran."
                />
                <NumberField label="Actual running speed" value={speedPct} onChange={setSpeedPct} max={100} suffix="% of rated" />
                <NumberField label="Rejects and rework" value={rejectPct} onChange={setRejectPct} max={100} step={0.5} suffix="% of output" />
              </FieldGrid>
            </Panel>
          </>
        }
        result={
          <Panel>
            <Headline
              label="Lost output is worth, each year"
              value={currency.money(r.annualLoss)}
              note={`Your floor runs at ${num(r.effectiveness, 1)}% effectiveness. ${num(r.lostHours)} of ${num(r.plannedMonthlyHours)} planned machine-hours are lost each month.`}
            />
            <div className="space-y-5 mt-8">
              {r.losses.map((l, idx) => (
                <Bar key={l.key} label={l.label} value={`${num(l.hours)} h · ${currency.money(l.value)}`} share={(l.hours / maxHours) * 100} highlight={idx === 0} />
              ))}
            </div>
            <Rows
              rows={[
                { label: 'Availability', value: `${num(r.availability, 1)}%` },
                { label: 'Running speed', value: `${num(r.performance, 1)}%` },
                { label: 'Good output', value: `${num(r.quality, 1)}%` },
                { label: 'Lost each month', value: currency.money(r.monthlyLoss), strong: true },
              ]}
            />
            <Insight>
              Your biggest loss is {top.label.toLowerCase()}: {currency.money(top.value)} a month. You can only fix it
              if stoppages and speeds are recorded as they happen, per machine, not written up at the end of a shift.
            </Insight>
          </Panel>
        }
      />
    </ToolShell>
  );
}
