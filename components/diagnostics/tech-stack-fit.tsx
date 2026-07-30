// components/diagnostics/tech-stack-fit.tsx
'use client';

import { useState } from 'react';
import { Share2, Sparkles, Check, FileSpreadsheet, Layers, Server, RefreshCw } from 'lucide-react';

const setupArchetypes = [
  {
    id: 'survivor',
    title: 'The Spreadsheet Survivor',
    icon: FileSpreadsheet,
    badge: 'Manual Drag High',
    description: 'Operations depend primarily on Excel or Google Sheets passed manually back and forth between employees.',
    diagnosis: 'Your bottleneck is manual double data entry. Implementing a single Next.js database portal cuts admin overhead by 80%+',
  },
  {
    id: 'patchwork',
    title: 'The SaaS Patchwork',
    icon: Layers,
    badge: 'Tool Fragmentation',
    description: 'Juggling 8 to 12 subscription SaaS applications (Shopify, QuickBooks, Zapier, Airtable, Monday) with fragile syncs.',
    diagnosis: 'Your bottleneck is disconnected API syncs. Replacing third-party glue with a custom unified ERP dashboard restores real-time control.',
  },
  {
    id: 'prisoner',
    title: 'The Legacy Prisoner',
    icon: Server,
    badge: 'On-Premise Lock-In',
    description: 'Trapped on a desktop ERP built in 2008 that requires manual exports, VPNs, and slow on-premise hardware.',
    diagnosis: 'Your bottleneck is accessibility and reporting lag. Migrating key operational modules to cloud Next.js architecture enables instant multi-device visibility.',
  },
  {
    id: 'hybrid',
    title: 'The Hybrid Struggler',
    icon: RefreshCw,
    badge: 'Channel Disconnect',
    description: 'Mixing paper clipboards on the floor with online Shopify sales and manual WhatsApp communication.',
    diagnosis: 'Your bottleneck is floor-to-executive communication lag. Deploys real-time floor scheduling modules like TextileMode ERP.',
  },
];

export default function DiagnosticsTechStackFit() {
  const [selectedId, setSelectedId] = useState<string>('survivor');

  const activeArchetype = setupArchetypes.find((a) => a.id === selectedId) || setupArchetypes[0];

  return (
    <div className="bg-bg-secondary border border-border-color rounded-2xl p-8 md:p-12 space-y-10">
      {/* Header */}
      <div>
        <span className="eyebrow mb-2">Operational Maturity Profile</span>
        <h2 className="headline text-2xl md:text-4xl text-text-primary">
          Tech Stack Fit & Maturity Profile
        </h2>
        <p className="text-sm text-text-muted mt-2">
          Select which setup matches your current operation to see your maturity profile card (designed for high screenshot-ability).
        </p>
      </div>

      {/* Visual Selection Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {setupArchetypes.map((item) => {
          const Icon = item.icon;
          const isSelected = item.id === selectedId;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedId(item.id)}
              className={`p-6 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                isSelected
                  ? 'bg-accent-gold-dim border-border-gold ring-1 ring-border-gold'
                  : 'bg-bg-primary border-border-color hover:border-border-gold'
              }`}
            >
              <div>
                <span className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${isSelected ? 'bg-accent-gold text-black' : 'bg-bg-secondary text-accent-gold'}`}>
                  <Icon className="w-5 h-5" />
                </span>
                <span className="text-xs font-mono font-bold text-accent-gold uppercase block mb-1">
                  {item.badge}
                </span>
                <h3 className="headline text-base text-text-primary mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-text-muted leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-border-color/50 text-[11px] font-mono text-accent-gold flex items-center gap-1">
                {isSelected ? '✓ Active Profile' : 'Select Setup →'}
              </div>
            </button>
          );
        })}
      </div>

      {/* Screenshot-Worthy Profile Result Card */}
      <div className="bg-bg-primary border border-border-gold rounded-2xl p-8 max-w-3xl mx-auto space-y-6 relative overflow-hidden">
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-border-color">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-accent-gold" />
            <span className="text-xs font-mono text-text-primary font-bold uppercase">
              Operational Maturity Profile: {activeArchetype.title}
            </span>
          </div>
          <span className="text-[10px] font-mono text-accent-gold bg-accent-gold-dim border border-border-gold px-2.5 py-1 rounded-full">
            arslanrehmani.com
          </span>
        </div>

        <div className="space-y-3">
          <h4 className="headline text-xl text-text-primary">
            Diagnostic Outcome & Software Remedy
          </h4>
          <p className="text-sm text-text-muted leading-relaxed">
            {activeArchetype.diagnosis}
          </p>
        </div>

        <div className="pt-4 border-t border-border-color flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <span className="text-text-subtle">Want to discuss building a custom remedy system?</span>
          <a href="/contact" className="btn-primary !px-5 !py-2.5 !text-xs shrink-0">
            Book Discovery Session →
          </a>
        </div>
      </div>
    </div>
  );
}
