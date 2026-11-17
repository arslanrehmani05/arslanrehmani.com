'use client';

import { useMemo, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import ToolShell from '@/components/tools/tool-shell';
import { ChoiceField, FieldGrid, Headline, NumberField, Panel, TextField, num, useCurrency } from '@/components/tools/ui';
import { calcTasks, type InputKind, type MistakeCost, type RuleLevel, type TaskInput } from '@/lib/tools/calc';

const MAX_TASKS = 8;

const starting: TaskInput[] = [
  { id: 'a', name: 'Entering supplier invoices', hoursPerWeek: 12, rules: 'exceptions', input: 'documents', mistake: 'high' },
  { id: 'b', name: 'Copying orders into the stock sheet', hoursPerWeek: 10, rules: 'fixed', input: 'structured', mistake: 'low' },
  { id: 'c', name: 'Building the weekly management report', hoursPerWeek: 6, rules: 'fixed', input: 'structured', mistake: 'low' },
];

const ruleOptions: { value: RuleLevel; label: string }[] = [
  { value: 'fixed', label: 'Same steps every time' },
  { value: 'exceptions', label: 'Mostly rules, some exceptions' },
  { value: 'judgement', label: 'Needs judgement' },
];
const inputOptions: { value: InputKind; label: string }[] = [
  { value: 'structured', label: 'Spreadsheets or system data' },
  { value: 'documents', label: 'Documents, emails or messages' },
];
const mistakeOptions: { value: MistakeCost; label: string }[] = [
  { value: 'low', label: 'Cheap to fix' },
  { value: 'high', label: 'Expensive' },
];

export default function AutomationFinderTool() {
  const currency = useCurrency();
  const [tasks, setTasks] = useState<TaskInput[]>(starting);
  const [hourlyCost, setHourlyCost] = useState(30);
  const [weeksPerYear, setWeeksPerYear] = useState(48);

  const update = (id: string, patch: Partial<TaskInput>) =>
    setTasks((list) => list.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  const add = () =>
    setTasks((list) => [...list, { id: `${Date.now()}`, name: '', hoursPerWeek: 0, rules: 'fixed', input: 'structured', mistake: 'low' }]);
  const remove = (id: string) => setTasks((list) => list.filter((t) => t.id !== id));

  const ranked = useMemo(() => calcTasks(tasks, hourlyCost, weeksPerYear), [tasks, hourlyCost, weeksPerYear]);
  const totalCost = ranked.reduce((s, t) => s + t.annualCost, 0);
  const totalRecoverable = ranked.reduce((s, t) => s + t.recoverableCost, 0);
  const totalRecoverableHours = ranked.reduce((s, t) => s + t.recoverableHours, 0);

  const summary =
    ranked.length === 0
      ? 'No tasks entered.'
      : ranked.map((t, i) => `${i + 1}. ${t.name} (${num(t.hoursPerWeek)} h/week): ${t.approach}, about ${currency.money(t.recoverableCost)} a year recoverable`).join('. ') +
        `. Total about ${currency.money(totalRecoverable)} a year.`;

  return (
    <ToolShell
      slug="automation-finder"
      currency={currency}
      intro="Not every task needs AI, and some should stay with a person. List the manual tasks in your business and see which to automate first, and how."
      summary={summary}
      method={
        <>
          <p>Yearly cost of a task = hours per week × working weeks × cost of one hour.</p>
          <p>
            The approach comes from three answers. Fixed steps on structured data need plain
            software. Documents or exceptions need an AI agent, with a person approving when
            mistakes are expensive. Work that needs judgement stays with a person.
          </p>
          <p>
            The recoverable share is a planning assumption, not a promise: 90% for rule-based
            automation, 75% for a spot-checked agent, 60% for an agent with approval, and 20% for
            judgement work. Tasks are ranked by recoverable cost.
          </p>
        </>
      }
    >
      <div className="space-y-6">
        <Panel title="Your numbers">
          <FieldGrid>
            <NumberField label="Cost of one hour of staff time" value={hourlyCost} onChange={setHourlyCost} prefix={currency.symbol} hint="Salary plus on-costs, divided by hours worked." />
            <NumberField label="Working weeks per year" value={weeksPerYear} onChange={setWeeksPerYear} min={1} max={52} suffix="weeks" />
          </FieldGrid>
        </Panel>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {tasks.map((t, idx) => (
            <Panel key={t.id}>
              <div className="flex items-end gap-4">
                <div className="flex-grow">
                  <TextField label={`Task ${idx + 1}`} value={t.name} onChange={(name) => update(t.id, { name })} placeholder="What is the task?" />
                </div>
                {tasks.length > 1 && (
                  <button type="button" onClick={() => remove(t.id)} aria-label={`Remove task ${idx + 1}`} className="btn-ghost !px-3 !rounded-xl min-h-[50px]">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="space-y-5 mt-5">
                <NumberField
                  label="Hours per week, everyone combined"
                  value={t.hoursPerWeek}
                  onChange={(hoursPerWeek) => update(t.id, { hoursPerWeek })}
                  step={0.5}
                  suffix="hours"
                />
                <ChoiceField label="How is it done?" value={t.rules} onChange={(rules) => update(t.id, { rules })} options={ruleOptions} />
                <ChoiceField label="What does it work from?" value={t.input} onChange={(input) => update(t.id, { input })} options={inputOptions} />
                <ChoiceField label="A mistake is" value={t.mistake} onChange={(mistake) => update(t.id, { mistake })} options={mistakeOptions} />
              </div>
            </Panel>
          ))}
        </div>

        {tasks.length < MAX_TASKS && (
          <button type="button" onClick={add} className="btn-ghost gap-2 !rounded-xl">
            <Plus className="w-4 h-4" />
            <span>Add a task</span>
          </button>
        )}

        <Panel>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Headline
              label="A system could take back, each year"
              value={currency.money(totalRecoverable)}
              note={`About ${num(totalRecoverableHours)} hours, out of ${currency.money(totalCost)} these tasks cost today.`}
            />
            <p className="text-sm text-text-muted leading-relaxed md:pt-6">
              Start at the top of the list. The first task is where a system pays back fastest. Tasks
              marked “keep with a person” are not failures: they are where your people should be
              spending the time the others free up.
            </p>
          </div>

          {ranked.length === 0 ? (
            <p className="text-sm text-text-muted mt-8">Name a task and give it some hours to see it ranked.</p>
          ) : (
            <ol className="mt-8 divide-y divide-border-color border-t border-border-color">
              {ranked.map((t, idx) => (
                <li key={t.id} className="py-5 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6">
                  <div className="md:col-span-5">
                    <span className="text-xs font-mono text-text-subtle">{String(idx + 1).padStart(2, '0')}</span>
                    <p className="text-base text-text-primary mt-1">{t.name}</p>
                    <p className="text-sm text-text-muted mt-1 tabular-nums">
                      {num(t.annualHours)} hours a year · {currency.money(t.annualCost)}
                    </p>
                  </div>
                  <div className="md:col-span-5">
                    <p className="text-sm font-medium text-text-primary">{t.approach}</p>
                    <p className="text-sm text-text-muted leading-relaxed mt-1">{t.reason}</p>
                  </div>
                  <div className="md:col-span-2 md:text-right">
                    <p className="text-xs text-text-subtle">Recoverable</p>
                    <p className="text-base font-semibold text-text-primary tabular-nums">{currency.money(t.recoverableCost)}</p>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </Panel>
      </div>
    </ToolShell>
  );
}
