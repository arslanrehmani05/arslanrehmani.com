'use client';

// Shared building blocks for the framework tools. See TOOLS-SYSTEM.md.

import { useCallback, useEffect, useId, useState } from 'react';

/* --------------------------------- Currency -------------------------------- */

export const CURRENCIES = [
  { code: 'USD', symbol: '$' },
  { code: 'GBP', symbol: '£' },
  { code: 'EUR', symbol: '€' },
] as const;

export type CurrencyCode = (typeof CURRENCIES)[number]['code'];

export interface Currency {
  code: CurrencyCode;
  symbol: string;
  setCode: (code: CurrencyCode) => void;
  /** Whole-number money, e.g. $12,400. */
  money: (n: number) => string;
}

const STORAGE_KEY = 'tools-currency';

export function useCurrency(): Currency {
  const [code, setCodeState] = useState<CurrencyCode>('USD');

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved && CURRENCIES.some((c) => c.code === saved)) setCodeState(saved as CurrencyCode);
    } catch {
      // Storage can be unavailable. The default currency is fine.
    }
  }, []);

  const setCode = useCallback((next: CurrencyCode) => {
    setCodeState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignore: the choice simply will not persist.
    }
  }, []);

  const symbol = CURRENCIES.find((c) => c.code === code)?.symbol ?? '$';
  const money = useCallback(
    (n: number) => {
      const rounded = Math.round(Number.isFinite(n) ? n : 0);
      const sign = rounded < 0 ? '-' : '';
      return `${sign}${symbol}${Math.abs(rounded).toLocaleString('en-US')}`;
    },
    [symbol]
  );

  return { code, symbol, setCode, money };
}

export const num = (n: number, digits = 0) =>
  (Number.isFinite(n) ? n : 0).toLocaleString('en-US', { maximumFractionDigits: digits, minimumFractionDigits: 0 });

/* ---------------------------------- Fields --------------------------------- */

const inputBase =
  'w-full bg-bg-primary border border-border-color rounded-xl px-4 py-3 text-base text-text-primary placeholder:text-text-subtle focus:border-border-gold focus:outline-none';

interface NumberFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  hint?: string;
  prefix?: string;
  suffix?: string;
  min?: number;
  max?: number;
  step?: number;
}

export function NumberField({ label, value, onChange, hint, prefix, suffix, min = 0, max, step = 1 }: NumberFieldProps) {
  const id = useId();
  // Keep the raw text so the field can be empty while the visitor is typing.
  const [text, setText] = useState(String(value));

  useEffect(() => {
    setText((current) => (Number(current) === value ? current : String(value)));
  }, [value]);

  return (
    <div>
      <label htmlFor={id} className="block text-sm text-text-primary mb-2">
        {label}
      </label>
      <div className="relative">
        {prefix && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-subtle pointer-events-none">{prefix}</span>
        )}
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={min}
          max={max}
          step={step}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            const parsed = parseFloat(e.target.value);
            if (!Number.isFinite(parsed)) return onChange(0);
            const clamped = Math.max(min, max !== undefined ? Math.min(max, parsed) : parsed);
            onChange(clamped);
          }}
          onBlur={() => setText(String(value))}
          aria-describedby={hint ? `${id}-hint` : undefined}
          className={`${inputBase} ${prefix ? 'pl-9' : ''} ${suffix ? 'pr-16' : ''}`}
        />
        {suffix && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-text-subtle pointer-events-none">
            {suffix}
          </span>
        )}
      </div>
      {hint && (
        <p id={`${id}-hint`} className="text-xs text-text-subtle mt-2 leading-relaxed">
          {hint}
        </p>
      )}
    </div>
  );
}

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function TextField({ label, value, onChange, placeholder }: TextFieldProps) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="block text-sm text-text-primary mb-2">
        {label}
      </label>
      <input
        id={id}
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={inputBase}
      />
    </div>
  );
}

interface ChoiceFieldProps<T extends string> {
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: string }[];
}

export function ChoiceField<T extends string>({ label, value, onChange, options }: ChoiceFieldProps<T>) {
  const id = useId();
  return (
    <fieldset>
      <legend className="block text-sm text-text-primary mb-2">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const checked = option.value === value;
          return (
            <label
              key={option.value}
              className={`cursor-pointer rounded-xl border px-4 py-2.5 text-sm transition-colors min-h-[44px] inline-flex items-center ${
                checked
                  ? 'border-text-primary bg-bg-surface text-text-primary'
                  : 'border-border-color text-text-muted hover:border-border-gold'
              }`}
            >
              <input
                type="radio"
                name={id}
                value={option.value}
                checked={checked}
                onChange={() => onChange(option.value)}
                className="sr-only"
              />
              {option.label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

/* ---------------------------------- Layout --------------------------------- */

export function Panel({ title, children, className = '' }: { title?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl bg-bg-secondary border border-border-color p-6 md:p-8 ${className}`}>
      {title && <h2 className="text-lg font-medium text-text-primary mb-6">{title}</h2>}
      {children}
    </div>
  );
}

export function FieldGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">{children}</div>;
}

/** Two columns on desktop: inputs on the left, a sticky result on the right. */
export function ToolColumns({ inputs, result }: { inputs: React.ReactNode; result: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      <div className="lg:col-span-7 space-y-6">{inputs}</div>
      <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">{result}</div>
    </div>
  );
}

/* ---------------------------------- Results -------------------------------- */

export function Headline({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div aria-live="polite">
      <p className="text-sm text-text-muted">{label}</p>
      <p className="text-4xl md:text-5xl font-semibold tracking-tight text-text-primary mt-2 break-words">{value}</p>
      {note && <p className="text-sm text-text-muted leading-relaxed mt-3">{note}</p>}
    </div>
  );
}

export function Rows({ rows }: { rows: { label: string; value: string; strong?: boolean }[] }) {
  return (
    <dl className="divide-y divide-border-color border-t border-border-color mt-6">
      {rows.map((row) => (
        <div key={row.label} className="flex items-baseline justify-between gap-4 py-3">
          <dt className="text-sm text-text-muted">{row.label}</dt>
          <dd className={`text-sm text-right tabular-nums ${row.strong ? 'font-semibold text-text-primary' : 'text-text-primary'}`}>
            {row.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function Insight({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm text-text-primary leading-relaxed border-l-2 border-text-primary pl-4 mt-6">{children}</p>
  );
}

/** A horizontal bar for comparing a handful of values. `share` is 0 to 100. */
export function Bar({ label, value, share, highlight }: { label: string; value: string; share: number; highlight?: boolean }) {
  const width = Math.max(2, Math.min(100, Number.isFinite(share) ? share : 0));
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4 text-sm">
        <span className={highlight ? 'text-text-primary font-medium' : 'text-text-muted'}>{label}</span>
        <span className="text-text-primary tabular-nums">{value}</span>
      </div>
      <div className="h-2 rounded-full bg-bg-surface mt-2 overflow-hidden" aria-hidden="true">
        <div
          className={`h-full rounded-full ${highlight ? 'bg-text-primary' : 'bg-text-subtle'}`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}
