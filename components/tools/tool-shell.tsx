'use client';

// The frame every framework tool sits in: breadcrumb, title, currency switch,
// the tool itself, how the figure is worked out, and the handoff to /contact.

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Copy } from 'lucide-react';
import { getTool, relatedTools } from '@/lib/tools/registry';
import { CURRENCIES, type Currency } from '@/components/tools/ui';

interface ToolShellProps {
  slug: string;
  /** One or two sentences under the title. */
  intro: string;
  /** Plain-text result, carried to the contact form and used by "Copy result". */
  summary: string;
  /** Pass the currency to show the switch. Omit for tools with no money in them. */
  currency?: Currency;
  /** How the figures are worked out, in plain words. */
  method: React.ReactNode;
  children: React.ReactNode;
}

export default function ToolShell({ slug, intro, summary, currency, method, children }: ToolShellProps) {
  const tool = getTool(slug);
  const related = relatedTools(slug);
  const [copied, setCopied] = useState(false);

  const fullSummary = `${tool.name}: ${summary}`;
  const contactHref = `/contact?tool=${encodeURIComponent(slug)}&summary=${encodeURIComponent(fullSummary)}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(fullSummary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked. The result is still on screen.
    }
  };

  return (
    <div>
      <section className="pt-12 md:pt-20 pb-20 md:pb-28">
        <div className="max-w-6xl mx-auto px-6">
          <nav aria-label="Breadcrumb" className="text-sm text-text-muted">
            <Link href="/tools" className="hover:text-text-primary transition-colors">
              Tools
            </Link>
            <span className="mx-2 text-text-subtle" aria-hidden="true">/</span>
            <span className="text-text-primary">{tool.name}</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mt-8 mb-10">
            <div className="max-w-2xl">
              <h1 className="headline text-3xl sm:text-5xl">{tool.question}</h1>
              <p className="text-base md:text-lg text-text-muted leading-relaxed mt-5">{intro}</p>
            </div>

            {currency && (
              <fieldset className="shrink-0">
                <legend className="sr-only">Currency</legend>
                <div className="inline-flex rounded-xl border border-border-color p-1">
                  {CURRENCIES.map((c) => {
                    const active = c.code === currency.code;
                    return (
                      <label
                        key={c.code}
                        className={`cursor-pointer rounded-lg px-3 py-2 text-sm min-w-[44px] min-h-[40px] inline-flex items-center justify-center transition-colors ${
                          active ? 'bg-text-primary text-bg-primary' : 'text-text-muted hover:text-text-primary'
                        }`}
                      >
                        <input
                          type="radio"
                          name="currency"
                          value={c.code}
                          checked={active}
                          onChange={() => currency.setCode(c.code)}
                          className="sr-only"
                        />
                        <span aria-hidden="true">{c.symbol}</span>
                        <span className="sr-only">{c.code}</span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            )}
          </div>

          {children}

          <details className="mt-6 rounded-2xl border border-border-color p-6 md:p-8 group">
            <summary className="cursor-pointer text-sm text-text-primary list-none flex items-center justify-between min-h-[24px]">
              <span>How this is worked out</span>
              <span className="text-text-subtle group-open:rotate-45 transition-transform text-lg leading-none" aria-hidden="true">+</span>
            </summary>
            <div className="text-sm text-text-muted leading-relaxed mt-5 space-y-3 max-w-3xl">
              {method}
              <p>
                Every figure comes from the numbers you entered. Nothing is sent anywhere or saved
                unless you choose to start a conversation.
              </p>
            </div>
          </details>
        </div>
      </section>

      <section className="py-20 md:py-28 border-t border-border-color">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-6">
            <h2 className="headline text-3xl sm:text-4xl">Want this fixed, not just measured?</h2>
            <p className="text-base text-text-muted leading-relaxed mt-4 max-w-md">
              Send me your result and I will tell you what I would build first, and what I would
              leave alone.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-8">
              <Link href={contactHref} className="btn-primary !px-7 !py-3.5 gap-2">
                <span>Start a conversation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button type="button" onClick={copy} className="btn-ghost !px-6 !py-3.5 gap-2">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied' : 'Copy result'}</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <p className="eyebrow mb-4">More tools</p>
            <ul className="divide-y divide-border-color border-y border-border-color">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/tools/${r.slug}`}
                    className="group flex items-center justify-between gap-4 py-4 min-h-[44px]"
                  >
                    <span>
                      <span className="block text-base text-text-primary">{r.name}</span>
                      <span className="block text-sm text-text-muted mt-1">{r.question}</span>
                    </span>
                    <ArrowRight className="w-4 h-4 text-text-subtle shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
