'use client';

import { useMemo, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import ToolShell from '@/components/tools/tool-shell';
import { Bar, FieldGrid, Headline, Insight, NumberField, Panel, Rows, TextField, ToolColumns, num, useCurrency } from '@/components/tools/ui';
import { calcChannels, type ChannelInput } from '@/lib/tools/calc';

const MAX_CHANNELS = 5;

const starting: ChannelInput[] = [
  { id: 'a', name: 'Own store', revenue: 60000, orders: 1000, costOfGoodsPct: 40, feePct: 3, fulfilmentPerOrder: 6, adSpend: 12000, returnPct: 8 },
  { id: 'b', name: 'Marketplace', revenue: 40000, orders: 800, costOfGoodsPct: 40, feePct: 15, fulfilmentPerOrder: 7, adSpend: 4000, returnPct: 12 },
];

export default function ChannelProfitTool() {
  const currency = useCurrency();
  const [channels, setChannels] = useState<ChannelInput[]>(starting);

  const update = (id: string, patch: Partial<ChannelInput>) =>
    setChannels((list) => list.map((c) => (c.id === id ? { ...c, ...patch } : c)));

  const add = () =>
    setChannels((list) => [
      ...list,
      { id: `${Date.now()}`, name: `Channel ${list.length + 1}`, revenue: 0, orders: 0, costOfGoodsPct: 40, feePct: 0, fulfilmentPerOrder: 0, adSpend: 0, returnPct: 0 },
    ]);

  const remove = (id: string) => setChannels((list) => list.filter((c) => c.id !== id));

  const r = useMemo(() => calcChannels(channels), [channels]);
  const maxAbsProfit = Math.max(1, ...r.rows.map((row) => Math.abs(row.profit)));

  const summary =
    r.rows.map((row) => `${row.name}: ${currency.money(row.profit)} profit a month on ${currency.money(row.revenue)} revenue (${num(row.margin, 1)}%)`).join('. ') +
    `. Total ${currency.money(r.totalProfit)} a month.`;

  const gap = r.worst && r.best ? r.best.margin - r.worst.margin : 0;

  return (
    <ToolShell
      slug="channel-profit"
      currency={currency}
      intro="Revenue tells you which channel is biggest. Enter one month of figures for each channel to see which one is actually paying you."
      summary={summary}
      method={
        <>
          <p>Kept revenue = revenue − refunds. Cost of goods is charged on kept revenue, on the assumption that returned goods go back into stock.</p>
          <p>Fees and fulfilment are charged on every order, including the ones that come back.</p>
          <p>Profit = kept revenue − cost of goods − fees − fulfilment − advertising. Overheads such as salaries and rent are not included.</p>
        </>
      }
    >
      <ToolColumns
        inputs={
          <>
            {channels.map((c) => (
              <Panel key={c.id}>
                <div className="flex items-end gap-4 mb-6">
                  <div className="flex-grow">
                    <TextField label="Channel" value={c.name} onChange={(name) => update(c.id, { name })} />
                  </div>
                  {channels.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(c.id)}
                      aria-label={`Remove ${c.name}`}
                      className="btn-ghost !px-3 !rounded-xl min-h-[50px]"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <FieldGrid>
                  <NumberField label="Revenue per month" value={c.revenue} onChange={(revenue) => update(c.id, { revenue })} prefix={currency.symbol} step={100} />
                  <NumberField label="Orders per month" value={c.orders} onChange={(orders) => update(c.id, { orders })} />
                  <NumberField label="Cost of goods" value={c.costOfGoodsPct} onChange={(costOfGoodsPct) => update(c.id, { costOfGoodsPct })} suffix="% of sales" max={100} />
                  <NumberField label="Channel and payment fees" value={c.feePct} onChange={(feePct) => update(c.id, { feePct })} suffix="% of sales" max={100} step={0.5} />
                  <NumberField label="Fulfilment per order" value={c.fulfilmentPerOrder} onChange={(fulfilmentPerOrder) => update(c.id, { fulfilmentPerOrder })} prefix={currency.symbol} step={0.5} hint="Picking, packing and shipping." />
                  <NumberField label="Advertising per month" value={c.adSpend} onChange={(adSpend) => update(c.id, { adSpend })} prefix={currency.symbol} step={100} />
                  <NumberField label="Returns" value={c.returnPct} onChange={(returnPct) => update(c.id, { returnPct })} suffix="% of sales" max={100} step={0.5} />
                </FieldGrid>
              </Panel>
            ))}

            {channels.length < MAX_CHANNELS && (
              <button type="button" onClick={add} className="btn-ghost gap-2 !rounded-xl">
                <Plus className="w-4 h-4" />
                <span>Add a channel</span>
              </button>
            )}
          </>
        }
        result={
          <Panel>
            <Headline
              label="Profit per month, all channels"
              value={currency.money(r.totalProfit)}
              note={`${num(r.totalMargin, 1)}% of ${currency.money(r.totalRevenue)} revenue, before overheads.`}
            />

            <div className="space-y-5 mt-8">
              {r.rows.map((row) => (
                <Bar
                  key={row.id}
                  label={`${row.name} · ${num(row.margin, 1)}%`}
                  value={currency.money(row.profit)}
                  share={(Math.abs(row.profit) / maxAbsProfit) * 100}
                  highlight={row.id === r.best?.id}
                />
              ))}
            </div>

            <Rows
              rows={r.rows.flatMap((row) => [
                { label: `${row.name}: share of revenue`, value: `${num(row.revenueShare)}%` },
                { label: `${row.name}: profit per order`, value: currency.money(row.profitPerOrder), strong: true },
              ])}
            />

            {r.worst && r.best && r.worst.id !== r.best.id && (
              <Insight>
                {r.worst.profit < 0
                  ? `${r.worst.name} is losing ${currency.money(Math.abs(r.worst.profit))} a month. Every order there costs you ${currency.money(Math.abs(r.worst.profitPerOrder))}.`
                  : `${r.best.name} keeps ${num(gap, 1)} points more of every sale than ${r.worst.name}. Growth on ${r.worst.name} is worth less than it looks.`}
              </Insight>
            )}
          </Panel>
        }
      />
    </ToolShell>
  );
}
