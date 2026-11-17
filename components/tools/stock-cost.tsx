'use client';

import { useMemo, useState } from 'react';
import ToolShell from '@/components/tools/tool-shell';
import { Bar, FieldGrid, Headline, Insight, NumberField, Panel, Rows, ToolColumns, useCurrency } from '@/components/tools/ui';
import { calcStock } from '@/lib/tools/calc';

export default function StockCostTool() {
  const currency = useCurrency();
  const [stockValue, setStockValue] = useState(250000);
  const [slowPct, setSlowPct] = useState(25);
  const [carryingPct, setCarryingPct] = useState(20);
  const [stockoutsPerMonth, setStockoutsPerMonth] = useState(6);
  const [daysOut, setDaysOut] = useState(5);
  const [dailySalesPerLine, setDailySalesPerLine] = useState(300);
  const [marginPct, setMarginPct] = useState(45);

  const r = useMemo(
    () => calcStock({ stockValue, slowPct, carryingPct, stockoutsPerMonth, daysOut, dailySalesPerLine, marginPct }),
    [stockValue, slowPct, carryingPct, stockoutsPerMonth, daysOut, dailySalesPerLine, marginPct]
  );

  const max = Math.max(1, r.carryingCost, r.lostMargin);
  const summary = `Slow stock of ${currency.money(r.slowStockValue)} costs ${currency.money(r.carryingCost)} a year to hold. Stockouts lose ${currency.money(r.lostSales)} in sales and ${currency.money(r.lostMargin)} in margin a year. Total ${currency.money(r.total)} a year.`;

  return (
    <ToolShell
      slug="stock-cost"
      currency={currency}
      intro="Stock goes wrong in two directions: too much of what does not sell, and too little of what does. Enter your figures to see what each costs in a year."
      summary={summary}
      method={
        <>
          <p>Cost of slow stock = stock value × share that is slow × yearly holding cost.</p>
          <p>Margin lost to stockouts = lines that run out per month × days out × daily sales of one of those lines × 12 × gross margin.</p>
          <p>
            The holding cost is your own estimate of what it costs to keep stock for a year: the
            money tied up, storage, insurance, damage and write-offs. Change it to match your
            business.
          </p>
        </>
      }
    >
      <ToolColumns
        inputs={
          <>
            <Panel title="Stock that does not move">
              <FieldGrid>
                <NumberField label="Stock held, at cost" value={stockValue} onChange={setStockValue} prefix={currency.symbol} step={1000} />
                <NumberField
                  label="Share that is slow or dead"
                  value={slowPct}
                  onChange={setSlowPct}
                  suffix="%"
                  max={100}
                  hint="For example, anything that has not sold in 90 days."
                />
                <NumberField
                  label="Yearly cost of holding stock"
                  value={carryingPct}
                  onChange={setCarryingPct}
                  suffix="% of value"
                  max={100}
                  hint="Your estimate. See how this is worked out, below."
                />
              </FieldGrid>
            </Panel>

            <Panel title="Stock that runs out">
              <FieldGrid>
                <NumberField label="Lines that run out each month" value={stockoutsPerMonth} onChange={setStockoutsPerMonth} />
                <NumberField label="Days a line stays out" value={daysOut} onChange={setDaysOut} suffix="days" step={0.5} />
                <NumberField
                  label="Daily sales of one of those lines"
                  value={dailySalesPerLine}
                  onChange={setDailySalesPerLine}
                  prefix={currency.symbol}
                  step={10}
                />
                <NumberField label="Gross margin" value={marginPct} onChange={setMarginPct} suffix="%" max={100} />
              </FieldGrid>
            </Panel>
          </>
        }
        result={
          <Panel>
            <Headline label="Stock problems cost you each year" value={currency.money(r.total)} />
            <div className="space-y-5 mt-8">
              <Bar label="Holding slow stock" value={currency.money(r.carryingCost)} share={(r.carryingCost / max) * 100} highlight={r.bigger === 'slow'} />
              <Bar label="Margin lost to stockouts" value={currency.money(r.lostMargin)} share={(r.lostMargin / max) * 100} highlight={r.bigger === 'stockout'} />
            </div>
            <Rows
              rows={[
                { label: 'Cash tied up in slow stock', value: currency.money(r.slowStockValue), strong: true },
                { label: 'Sales lost to stockouts each year', value: currency.money(r.lostSales) },
              ]}
            />
            <Insight>
              {r.bigger === 'slow'
                ? 'Your bigger problem is stock that does not move. Clearing it and buying to demand frees cash before it saves cost.'
                : 'Your bigger problem is running out. Reordering on live sales figures, not a weekly count, is where the money is.'}
            </Insight>
          </Panel>
        }
      />
    </ToolShell>
  );
}
