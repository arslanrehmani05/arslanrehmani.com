// components/diagnostics/cost-estimator.tsx
'use client';

import { useState, useMemo } from 'react';
import { LayoutGrid, Cpu, Database, RefreshCw, Layers, Check, ArrowRight } from 'lucide-react';

const capabilityCards = [
  { id: 'dashboard', label: 'Executive Analytics Dashboard', baseCost: 3500, desc: 'Real-time KPI & profit tracking control panel' },
  { id: 'ai_briefings', label: 'AI Daily Operational Briefings', baseCost: 2500, desc: 'Server-side LLM summaries & daily email/chat alerts' },
  { id: 'erp_modules', label: 'Production / Inventory ERP Modules', baseCost: 7500, desc: 'Stock management, floor scheduling & order tracking' },
  { id: 'ecom_sync', label: 'Multi-Channel API Sync (Shopify + Amazon)', baseCost: 4500, desc: 'Unified inventory & order pipeline across sales channels' },
  { id: 'scraping', label: 'Automated Scraping & Background Pipelines', baseCost: 3000, desc: 'Supplier price tracking & automated data pipelines' },
];

export default function DiagnosticsCostEstimator() {
  const [selectedCapabilities, setSelectedCapabilities] = useState<string[]>(['dashboard', 'erp_modules']);
  const [complexity, setComplexity] = useState(1); // 1: Single Location/Store, 2: Multi-location, 3: Enterprise Scale

  const toggleCapability = (id: string) => {
    if (selectedCapabilities.includes(id)) {
      if (selectedCapabilities.length > 1) {
        setSelectedCapabilities(selectedCapabilities.filter((item) => item !== id));
      }
    } else {
      setSelectedCapabilities([...selectedCapabilities, id]);
    }
  };

  const estimatedRange = useMemo(() => {
    let baseSum = selectedCapabilities.reduce((acc, currId) => {
      const card = capabilityCards.find((c) => c.id === currId);
      return acc + (card?.baseCost || 3000);
    }, 0);

    const multiplier = complexity === 1 ? 1.0 : complexity === 2 ? 1.4 : 1.8;
    const min = Math.round((baseSum * multiplier * 0.9) / 500) * 500;
    const max = Math.round((baseSum * multiplier * 1.2) / 500) * 500;

    return { min, max };
  }, [selectedCapabilities, complexity]);

  return (
    <div className="bg-bg-secondary border border-border-color rounded-2xl p-8 md:p-12 space-y-10">
      {/* Header */}
      <div>
        <span className="eyebrow mb-2">Scope & Budget Estimator</span>
        <h2 className="headline text-2xl md:text-4xl text-text-primary">
          Custom System Cost Estimator
        </h2>
        <p className="text-sm text-text-muted mt-2">
          Select your required operational capabilities and complexity to compute a preliminary fixed investment range.
        </p>
      </div>

      {/* Visual Multi-Select Capability Cards */}
      <div className="space-y-4">
        <span className="text-xs font-semibold text-text-primary uppercase tracking-wider block">
          1. Select Required Capabilities (Multi-Select):
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {capabilityCards.map((card) => {
            const isSelected = selectedCapabilities.includes(card.id);
            return (
              <button
                key={card.id}
                type="button"
                onClick={() => toggleCapability(card.id)}
                className={`p-5 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                  isSelected
                    ? 'bg-accent-gold-dim border-border-gold ring-1 ring-border-gold'
                    : 'bg-bg-primary border-border-color hover:border-border-gold'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold text-text-primary">{card.label}</span>
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${isSelected ? 'bg-accent-gold text-black' : 'border border-border-color'}`}>
                      {isSelected && <Check className="w-3 h-3" />}
                    </span>
                  </div>
                  <p className="text-xs text-text-muted leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Complexity Slider */}
      <div className="space-y-4 pt-4 border-t border-border-color max-w-xl">
        <div className="flex justify-between items-center text-xs font-semibold text-text-primary">
          <span>2. Operational Complexity & Scale:</span>
          <span className="text-accent-gold font-bold font-mono">
            {complexity === 1 ? 'Single Location / Store' : complexity === 2 ? 'Multi-Location / Multi-Store' : 'Enterprise Multi-Plant'}
          </span>
        </div>
        <input
          type="range"
          min={1}
          max={3}
          step={1}
          value={complexity}
          onChange={(e) => setComplexity(Number(e.target.value))}
          className="w-full h-2 bg-bg-primary rounded-lg appearance-none cursor-pointer accent-accent-gold"
        />
      </div>

      {/* Result Cost Range Box */}
      <div className="bg-bg-primary border border-border-color rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs font-mono text-text-subtle uppercase block mb-1">
            Estimated Investment Range
          </span>
          <span className="text-3xl md:text-4xl font-black font-sans text-accent-gold block">
            ${estimatedRange.min.toLocaleString()} – ${estimatedRange.max.toLocaleString()}
          </span>
          <p className="text-xs text-text-muted mt-2 max-w-md">
            Typical investment range for this scope — exact fixed quote delivered after a 15-minute operational call.
          </p>
        </div>

        <a href="/contact" className="btn-primary !px-6 !py-3.5 !text-xs shrink-0 flex items-center gap-2">
          <span>Request Fixed Quote</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
