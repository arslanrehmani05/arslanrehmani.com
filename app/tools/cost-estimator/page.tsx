// app/tools/cost-estimator/page.tsx
'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  DollarSign,
  Printer,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  TrendingUp,
  RotateCcw,
  Sliders,
} from 'lucide-react';

interface ModelPricing {
  id: string;
  name: string;
  provider: string;
  inputPerMillion: number;
  outputPerMillion: number;
  asOfDate: string;
  recommendedFor: string;
}

const MODEL_PRICING_CATALOG: ModelPricing[] = [
  {
    id: 'gemini-flash',
    name: 'Gemini 2.5 / 3.5 Flash',
    provider: 'Google',
    inputPerMillion: 0.10,
    outputPerMillion: 0.40,
    asOfDate: 'March 2026',
    recommendedFor: 'High-throughput document intake, schema staging, OCR extraction',
  },
  {
    id: 'gpt-4o-mini',
    name: 'GPT-4o mini',
    provider: 'OpenAI',
    inputPerMillion: 0.15,
    outputPerMillion: 0.60,
    asOfDate: 'March 2026',
    recommendedFor: 'Lightweight structured extraction and basic classification',
  },
  {
    id: 'claude-haiku',
    name: 'Claude 3.5 Haiku',
    provider: 'Anthropic',
    inputPerMillion: 0.80,
    outputPerMillion: 4.00,
    asOfDate: 'March 2026',
    recommendedFor: 'Fast contextual reasoning and policy checking',
  },
  {
    id: 'claude-sonnet',
    name: 'Claude 3.5 Sonnet',
    provider: 'Anthropic',
    inputPerMillion: 3.00,
    outputPerMillion: 15.00,
    asOfDate: 'March 2026',
    recommendedFor: 'Complex multi-page contract interpretation and multi-step agent reasoning',
  },
];

export default function AgentCostEstimatorPage() {
  const [selectedModelId, setSelectedModelId] = useState<string>('gemini-flash');
  const [monthlyVolume, setMonthlyVolume] = useState<number>(5000); // 5,000 documents or tasks / mo
  const [inputTokensPerRun, setInputTokensPerRun] = useState<number>(1800); // prompt + system prompt + sample document
  const [outputTokensPerRun, setOutputTokensPerRun] = useState<number>(450); // structured JSON extraction response
  const [retryRatePercent, setRetryRatePercent] = useState<number>(8); // 8% retries due to deterministic schema rejection
  const [humanReviewPercent, setHumanReviewPercent] = useState<number>(5); // 5% flagged for human review
  const [humanReviewCostPerItem, setHumanReviewCostPerItem] = useState<number>(3.50); // staff review time
  const [showFormula, setShowFormula] = useState<boolean>(true);

  const selectedModel =
    MODEL_PRICING_CATALOG.find((m) => m.id === selectedModelId) || MODEL_PRICING_CATALOG[0];

  const resetDefaults = () => {
    setSelectedModelId('gemini-flash');
    setMonthlyVolume(5000);
    setInputTokensPerRun(1800);
    setOutputTokensPerRun(450);
    setRetryRatePercent(8);
    setHumanReviewPercent(5);
    setHumanReviewCostPerItem(3.50);
  };

  const costBreakdown = useMemo(() => {
    // Total runs including deterministic schema retries
    const retryMultiplier = 1 + retryRatePercent / 100;
    const totalRunsWithRetries = monthlyVolume * retryMultiplier;

    const totalInputTokens = totalRunsWithRetries * inputTokensPerRun;
    const totalOutputTokens = totalRunsWithRetries * outputTokensPerRun;

    const monthlyApiInputCost = (totalInputTokens / 1_000_000) * selectedModel.inputPerMillion;
    const monthlyApiOutputCost = (totalOutputTokens / 1_000_000) * selectedModel.outputPerMillion;
    const totalApiCost = monthlyApiInputCost + monthlyApiOutputCost;

    // Human in the loop labor cost
    const humanReviewItems = Math.round((monthlyVolume * humanReviewPercent) / 100);
    const monthlyHumanReviewCost = humanReviewItems * humanReviewCostPerItem;

    const totalMonthlyCost = totalApiCost + monthlyHumanReviewCost;
    const costPerSuccessfulItem = totalMonthlyCost / monthlyVolume;

    // Range estimates (±12% variance)
    const lowRange = Math.round(totalMonthlyCost * 0.88);
    const highRange = Math.round(totalMonthlyCost * 1.12);

    return {
      totalRunsWithRetries: Math.round(totalRunsWithRetries),
      totalInputTokens: Math.round(totalInputTokens),
      totalOutputTokens: Math.round(totalOutputTokens),
      monthlyApiInputCost,
      monthlyApiOutputCost,
      totalApiCost,
      humanReviewItems,
      monthlyHumanReviewCost,
      totalMonthlyCost,
      costPerSuccessfulItem,
      lowRange,
      highRange,
    };
  }, [
    selectedModel,
    monthlyVolume,
    inputTokensPerRun,
    outputTokensPerRun,
    retryRatePercent,
    humanReviewPercent,
    humanReviewCostPerItem,
  ]);

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary pt-24 pb-24 px-6 print:bg-white print:text-black print:p-0">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Navigation & Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-text-muted print:hidden">
            <Link href="/tools" className="hover:text-text-primary transition-colors">
              Tools Suite
            </Link>
            <span>/</span>
            <span className="text-text-primary">Agent Cost Estimator</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bg-secondary border border-border-color text-xs font-mono text-emerald-400 mb-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Dated API Pricing &bull; Includes Schema Retries & Human Review</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-text-primary">
                Agent Cost Estimator
              </h1>
            </div>

            <div className="flex items-center gap-2 print:hidden">
              <button
                type="button"
                onClick={resetDefaults}
                className="btn-ghost !px-4 !py-2 !text-xs font-mono flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="btn-primary !px-4 !py-2 !text-xs font-mono flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / Export PDF</span>
              </button>
            </div>
          </div>

          <p className="text-sm sm:text-base text-text-muted leading-relaxed max-w-3xl">
            A production AI agent does not just consume raw API tokens. It triggers deterministic schema rejections, retry calls, and human review exceptions. This estimator computes your true operational bill without surprise overages.
          </p>
        </div>

        {/* Two Columns: Configuration & Results */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Model Selector Card */}
            <div className="rounded-2xl bg-bg-secondary border border-border-color p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-text-primary">
                  1. LLM Model & Dated Pricing
                </h2>
                <span className="text-xs font-mono text-text-subtle">
                  As of: {selectedModel.asOfDate}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {MODEL_PRICING_CATALOG.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setSelectedModelId(m.id)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      selectedModelId === m.id
                        ? 'bg-bg-primary border-border-gold shadow-sm'
                        : 'bg-bg-primary/50 border-border-color hover:border-border-color/80'
                    }`}
                  >
                    <div className="text-xs font-semibold text-text-primary">{m.name}</div>
                    <div className="text-[11px] font-mono text-text-muted mt-0.5">
                      ${m.inputPerMillion.toFixed(2)} in / ${m.outputPerMillion.toFixed(2)} out per 1M
                    </div>
                  </button>
                ))}
              </div>
              <p className="text-xs text-text-subtle italic">
                Recommended for: {selectedModel.recommendedFor}
              </p>
            </div>

            {/* Volume & Tokens Card */}
            <div className="rounded-2xl bg-bg-secondary border border-border-color p-6 sm:p-8 space-y-6">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-text-primary pb-2 border-b border-border-color">
                2. Execution Volume & Token Budget
              </h2>

              {/* Monthly Volume */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <label className="text-text-muted font-medium">Monthly document / transaction volume:</label>
                  <span className="font-mono text-text-primary font-bold">{monthlyVolume.toLocaleString()} items</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="50000"
                  step="500"
                  value={monthlyVolume}
                  onChange={(e) => setMonthlyVolume(parseInt(e.target.value))}
                  className="w-full accent-accent-gold cursor-pointer"
                />
              </div>

              {/* Input Tokens */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <label className="text-text-muted font-medium">Avg input tokens per item (prompt + source document):</label>
                  <span className="font-mono text-text-primary font-bold">{inputTokensPerRun} tokens</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="10000"
                  step="100"
                  value={inputTokensPerRun}
                  onChange={(e) => setInputTokensPerRun(parseInt(e.target.value))}
                  className="w-full accent-accent-gold cursor-pointer"
                />
                <span className="text-[11px] text-text-subtle block">
                  ~1,800 tokens ≈ 1 full-page supplier invoice with line-item detail and system instructions.
                </span>
              </div>

              {/* Output Tokens */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <label className="text-text-muted font-medium">Avg output tokens per item (JSON extraction):</label>
                  <span className="font-mono text-text-primary font-bold">{outputTokensPerRun} tokens</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="2500"
                  step="50"
                  value={outputTokensPerRun}
                  onChange={(e) => setOutputTokensPerRun(parseInt(e.target.value))}
                  className="w-full accent-accent-gold cursor-pointer"
                />
              </div>
            </div>

            {/* Validation Retries & Human in the Loop */}
            <div className="rounded-2xl bg-bg-secondary border border-border-color p-6 sm:p-8 space-y-6">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-text-primary pb-2 border-b border-border-color">
                3. Guardrails & Human In The Loop
              </h2>

              {/* Retry Rate Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <label className="text-text-muted font-medium">Deterministic validation retry rate (%):</label>
                  <span className="font-mono text-amber-400 font-bold">{retryRatePercent}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="25"
                  step="1"
                  value={retryRatePercent}
                  onChange={(e) => setRetryRatePercent(parseInt(e.target.value))}
                  className="w-full accent-accent-gold cursor-pointer"
                />
                <span className="text-[11px] text-text-subtle block">
                  Rate of schema mismatches where deterministic code requests an immediate reprompt.
                </span>
              </div>

              {/* Human Review Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <label className="text-text-muted font-medium">Human exception review rate (%):</label>
                  <span className="font-mono text-text-primary font-bold">{humanReviewPercent}%</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="1"
                  value={humanReviewPercent}
                  onChange={(e) => setHumanReviewPercent(parseInt(e.target.value))}
                  className="w-full accent-accent-gold cursor-pointer"
                />
                <span className="text-[11px] text-text-subtle block">
                  Items with balance discrepancies routed to human staff ({costBreakdown.humanReviewItems} items / mo).
                </span>
              </div>

              {/* Human Cost Per Item */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <label className="text-text-muted font-medium">Labor cost per human exception review ($):</label>
                  <span className="font-mono text-text-primary font-bold">${humanReviewCostPerItem.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="1.00"
                  max="15.00"
                  step="0.50"
                  value={humanReviewCostPerItem}
                  onChange={(e) => setHumanReviewCostPerItem(parseFloat(e.target.value))}
                  className="w-full accent-accent-gold cursor-pointer"
                />
              </div>
            </div>

            {/* Formula Block */}
            <div className="rounded-2xl bg-bg-secondary border border-border-color p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-text-primary uppercase tracking-wider">
                  Formula & Source Documentation
                </span>
                <button
                  type="button"
                  onClick={() => setShowFormula(!showFormula)}
                  className="text-xs font-mono text-text-muted hover:text-text-primary flex items-center gap-1"
                >
                  <span>{showFormula ? 'Hide Formula' : 'Show Formula'}</span>
                  {showFormula ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>

              {showFormula && (
                <div className="p-4 rounded-xl bg-bg-primary border border-border-color text-xs font-mono text-text-muted space-y-1">
                  <div>• Runs_Effective = Volume × (1 + Retry_Rate)</div>
                  <div>• API_Bill = (Runs × Input_Tok × Rate_In) + (Runs × Output_Tok × Rate_Out)</div>
                  <div>• Human_Cost = Volume × Review_Rate × Unit_Review_Cost</div>
                  <div>• Monthly_Total = API_Bill + Human_Cost</div>
                  <div className="text-[11px] text-text-subtle pt-1 border-t border-border-color">
                    Pricing source: Public developer rates published by Google Cloud and Anthropic, dated {selectedModel.asOfDate}.
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Results Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="sticky top-24 rounded-2xl bg-bg-secondary border border-border-color p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-mono text-text-muted uppercase">Monthly Projection</span>
                <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider">
                  Total Operational Cost
                </h3>
              </div>

              {/* Monthly Cost Estimate */}
              <div className="p-6 rounded-2xl bg-bg-primary border border-border-color space-y-2">
                <div className="text-xs font-mono text-text-subtle uppercase">Expected Monthly Range:</div>
                <div className="text-3xl sm:text-4xl font-bold font-mono text-text-primary">
                  ${costBreakdown.lowRange.toLocaleString()} – ${costBreakdown.highRange.toLocaleString()}
                </div>
                <div className="text-xs font-mono text-emerald-400">
                  Unit Cost: ~${costBreakdown.costPerSuccessfulItem.toFixed(3)} / successful transaction
                </div>
              </div>

              {/* Breakdown */}
              <div className="space-y-3 pt-2 text-xs font-mono">
                <div className="flex justify-between py-2 border-b border-border-color">
                  <span className="text-text-muted">Direct LLM Token API Bill:</span>
                  <span className="text-text-primary font-semibold">
                    ${costBreakdown.totalApiCost.toFixed(2)} / mo
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-border-color">
                  <span className="text-text-muted">Schema Validation Retries:</span>
                  <span className="text-amber-400 font-semibold">
                    +{costBreakdown.totalRunsWithRetries - monthlyVolume} API calls ({retryRatePercent}%)
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-border-color">
                  <span className="text-text-muted">Human Exception Reviews:</span>
                  <span className="text-text-primary font-semibold">
                    ${costBreakdown.monthlyHumanReviewCost.toFixed(2)} / mo
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-border-color">
                  <span className="text-text-muted">Input / Output Tokens Total:</span>
                  <span className="text-text-subtle">
                    {(costBreakdown.totalInputTokens / 1_000_000).toFixed(2)}M / {(costBreakdown.totalOutputTokens / 1_000_000).toFixed(2)}M
                  </span>
                </div>
              </div>

              {/* Architectural Reality Note */}
              <div className="p-4 rounded-xl bg-bg-primary/60 border border-border-color text-xs text-text-muted leading-relaxed">
                <strong className="text-text-primary block mb-1">Notice the cost split:</strong>
                In production, token API bills are frequently tiny compared to human review time. This is why strict deterministic validation schemas that catch 90% of formatting slips automatically before human triage save the most money.
              </div>

              {/* Conversion CTA */}
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="btn-primary w-full !py-3 !text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <span>Build Guarded Agent Pipeline</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <span className="text-[11px] text-text-subtle text-center block mt-2 font-mono">
                  Fixed scope &bull; No subscription lock-in
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
