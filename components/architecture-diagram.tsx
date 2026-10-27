// components/architecture-diagram.tsx
import React from 'react';

interface ArchitectureDiagramProps {
  type?: string;
  className?: string;
}

export default function ArchitectureDiagram({ type, className = '' }: ArchitectureDiagramProps) {
  if (type === 'textilemode-diagram') {
    return (
      <div className={`p-6 sm:p-8 rounded-2xl bg-bg-primary border border-border-color space-y-4 ${className}`}>
        <div className="flex items-center justify-between text-xs font-mono text-text-subtle border-b border-border-color/60 pb-3">
          <span>Architecture Blueprint: TextileMode Production ERP</span>
          <span className="text-emerald-400">Zero-Loss Data Pipeline</span>
        </div>
        <svg viewBox="0 0 760 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          {/* Step 1: Input */}
          <rect x="20" y="40" width="140" height="130" rx="12" fill="#111113" stroke="#2a2a2e" strokeWidth="1.5" />
          <text x="35" y="70" fill="#f0f0f2" fontSize="13" fontWeight="bold" fontFamily="monospace">01. Floor Intake</text>
          <text x="35" y="95" fill="#8e8e93" fontSize="11" fontFamily="sans-serif">Rugged floor tablets</text>
          <text x="35" y="115" fill="#8e8e93" fontSize="11" fontFamily="sans-serif">Shift supervisor PIN</text>
          <text x="35" y="135" fill="#8e8e93" fontSize="11" fontFamily="sans-serif">Touch-numeric input</text>
          <rect x="35" y="145" width="80" height="16" rx="4" fill="#1e1e24" />
          <text x="42" y="157" fill="#c9a84c" fontSize="9" fontFamily="monospace">27 Looms</text>

          {/* Arrow 1 */}
          <path d="M 160 105 L 210 105" stroke="#c9a84c" strokeWidth="2" strokeDasharray="4 4" />
          <polygon points="210,100 220,105 210,110" fill="#c9a84c" />

          {/* Step 2: Validation Guard */}
          <rect x="220" y="40" width="150" height="130" rx="12" fill="#111113" stroke="#c9a84c" strokeWidth="1.5" />
          <text x="235" y="70" fill="#f0f0f2" fontSize="13" fontWeight="bold" fontFamily="monospace">02. Validation Guard</text>
          <text x="235" y="95" fill="#8e8e93" fontSize="11" fontFamily="sans-serif">Range &amp; density check</text>
          <text x="235" y="115" fill="#8e8e93" fontSize="11" fontFamily="sans-serif">Loom allocation state</text>
          <text x="235" y="135" fill="#8e8e93" fontSize="11" fontFamily="sans-serif">Duplicate lot reject</text>
          <rect x="235" y="145" width="100" height="16" rx="4" fill="#1c2d22" />
          <text x="242" y="157" fill="#4ade80" fontSize="9" fontFamily="monospace">Zero-Corrupt Gate</text>

          {/* Arrow 2 */}
          <path d="M 370 105 L 420 105" stroke="#c9a84c" strokeWidth="2" />
          <polygon points="420,100 430,105 420,110" fill="#c9a84c" />

          {/* Step 3: Postgres Ledger */}
          <rect x="430" y="40" width="150" height="130" rx="12" fill="#111113" stroke="#2a2a2e" strokeWidth="1.5" />
          <text x="445" y="70" fill="#f0f0f2" fontSize="13" fontWeight="bold" fontFamily="monospace">03. Core Ledger</text>
          <text x="445" y="95" fill="#8e8e93" fontSize="11" fontFamily="sans-serif">Postgres RLS engine</text>
          <text x="445" y="115" fill="#8e8e93" fontSize="11" fontFamily="sans-serif">Double-entry journals</text>
          <text x="445" y="135" fill="#8e8e93" fontSize="11" fontFamily="sans-serif">Immutable audit log</text>
          <rect x="445" y="145" width="110" height="16" rx="4" fill="#1e1e24" />
          <text x="452" y="157" fill="#8e8e93" fontSize="9" fontFamily="monospace">Encrypted at rest</text>

          {/* Arrow 3 */}
          <path d="M 580 105 L 630 105" stroke="#c9a84c" strokeWidth="2" />
          <polygon points="630,100 640,105 630,110" fill="#c9a84c" />

          {/* Step 4: Executive Reports */}
          <rect x="640" y="40" width="100" height="130" rx="12" fill="#111113" stroke="#2a2a2e" strokeWidth="1.5" />
          <text x="652" y="70" fill="#f0f0f2" fontSize="13" fontWeight="bold" fontFamily="monospace">04. Close</text>
          <text x="652" y="95" fill="#8e8e93" fontSize="11" fontFamily="sans-serif">11 reports</text>
          <text x="652" y="115" fill="#8e8e93" fontSize="11" fontFamily="sans-serif">Real-time P&amp;L</text>
          <text x="652" y="135" fill="#8e8e93" fontSize="11" fontFamily="sans-serif">Piece wages</text>
          <rect x="652" y="145" width="75" height="16" rx="4" fill="#2d221c" />
          <text x="658" y="157" fill="#c9a84c" fontSize="9" fontFamily="monospace">Audited close</text>
        </svg>
      </div>
    );
  }

  if (type === 'reconciliation-diagram') {
    return (
      <div className={`p-6 sm:p-8 rounded-2xl bg-bg-primary border border-border-color space-y-4 ${className}`}>
        <div className="flex items-center justify-between text-xs font-mono text-text-subtle border-b border-border-color/60 pb-3">
          <span>Architecture Blueprint: Deterministic Reconciliation Suite</span>
          <span className="text-emerald-400">Cent-Accurate Match Engine</span>
        </div>
        <svg viewBox="0 0 760 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          {/* Step 1: Disconnected Inputs */}
          <rect x="20" y="40" width="140" height="130" rx="12" fill="#111113" stroke="#2a2a2e" strokeWidth="1.5" />
          <text x="35" y="70" fill="#f0f0f2" fontSize="13" fontWeight="bold" fontFamily="monospace">01. Raw Feeds</text>
          <text x="35" y="95" fill="#8e8e93" fontSize="11" fontFamily="sans-serif">Banking API feeds</text>
          <text x="35" y="115" fill="#8e8e93" fontSize="11" fontFamily="sans-serif">Stripe payout batches</text>
          <text x="35" y="135" fill="#8e8e93" fontSize="11" fontFamily="sans-serif">Supplier invoices</text>
          <rect x="35" y="145" width="90" height="16" rx="4" fill="#1e1e24" />
          <text x="42" y="157" fill="#c9a84c" fontSize="9" fontFamily="monospace">Multi-currency</text>

          {/* Arrow 1 */}
          <path d="M 160 105 L 210 105" stroke="#c9a84c" strokeWidth="2" strokeDasharray="4 4" />
          <polygon points="210,100 220,105 210,110" fill="#c9a84c" />

          {/* Step 2: Normalization */}
          <rect x="220" y="40" width="150" height="130" rx="12" fill="#111113" stroke="#2a2a2e" strokeWidth="1.5" />
          <text x="235" y="70" fill="#f0f0f2" fontSize="13" fontWeight="bold" fontFamily="monospace">02. Normalizer</text>
          <text x="235" y="95" fill="#8e8e93" fontSize="11" fontFamily="sans-serif">FX rate anchoring</text>
          <text x="235" y="115" fill="#8e8e93" fontSize="11" fontFamily="sans-serif">Supplier name fuzzy clean</text>
          <text x="235" y="135" fill="#8e8e93" fontSize="11" fontFamily="sans-serif">Transaction UUID hash</text>
          <rect x="235" y="145" width="90" height="16" rx="4" fill="#1e1e24" />
          <text x="242" y="157" fill="#8e8e93" fontSize="9" fontFamily="monospace">Parsed &amp; typed</text>

          {/* Arrow 2 */}
          <path d="M 370 105 L 420 105" stroke="#c9a84c" strokeWidth="2" />
          <polygon points="420,100 430,105 420,110" fill="#c9a84c" />

          {/* Step 3: Match Engine */}
          <rect x="430" y="40" width="150" height="130" rx="12" fill="#111113" stroke="#c9a84c" strokeWidth="1.5" />
          <text x="445" y="70" fill="#f0f0f2" fontSize="13" fontWeight="bold" fontFamily="monospace">03. Deterministic</text>
          <text x="445" y="95" fill="#8e8e93" fontSize="11" fontFamily="sans-serif">Exact cent matching</text>
          <text x="445" y="115" fill="#8e8e93" fontSize="11" fontFamily="sans-serif">Wire fee auto-detect</text>
          <text x="445" y="135" fill="#8e8e93" fontSize="11" fontFamily="sans-serif">98% instant pairing</text>
          <rect x="445" y="145" width="110" height="16" rx="4" fill="#1c2d22" />
          <text x="452" y="157" fill="#4ade80" fontSize="9" fontFamily="monospace">98% Auto-Matched</text>

          {/* Arrow 3 */}
          <path d="M 580 105 L 630 105" stroke="#c9a84c" strokeWidth="2" />
          <polygon points="630,100 640,105 630,110" fill="#c9a84c" />

          {/* Step 4: Ledger & Exception Queue */}
          <rect x="640" y="40" width="100" height="130" rx="12" fill="#111113" stroke="#2a2a2e" strokeWidth="1.5" />
          <text x="652" y="70" fill="#f0f0f2" fontSize="13" fontWeight="bold" fontFamily="monospace">04. Ledger</text>
          <text x="652" y="95" fill="#8e8e93" fontSize="11" fontFamily="sans-serif">Matched rows</text>
          <text x="652" y="115" fill="#8e8e93" fontSize="11" fontFamily="sans-serif">Exceptions UI</text>
          <text x="652" y="135" fill="#8e8e93" fontSize="11" fontFamily="sans-serif">Audit report</text>
          <rect x="652" y="145" width="75" height="16" rx="4" fill="#2d221c" />
          <text x="658" y="157" fill="#c9a84c" fontSize="9" fontFamily="monospace">45 min close</text>
        </svg>
      </div>
    );
  }

  // Default: Agent Staging Pipeline Diagram
  return (
    <div className={`p-6 sm:p-8 rounded-2xl bg-bg-primary border border-border-color space-y-4 ${className}`}>
      <div className="flex items-center justify-between text-xs font-mono text-text-subtle border-b border-border-color/60 pb-3">
        <span>Architecture Blueprint: Deterministic Agent Staging Pipeline</span>
        <span className="text-emerald-400">Zero Direct Database Writes</span>
      </div>
      <svg viewBox="0 0 760 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
        {/* Step 1: Input Document */}
        <rect x="20" y="40" width="130" height="130" rx="12" fill="#111113" stroke="#2a2a2e" strokeWidth="1.5" />
        <text x="35" y="70" fill="#f0f0f2" fontSize="13" fontWeight="bold" fontFamily="monospace">01. Unstructured</text>
        <text x="35" y="95" fill="#8e8e93" fontSize="11" fontFamily="sans-serif">PDF invoices</text>
        <text x="35" y="115" fill="#8e8e93" fontSize="11" fontFamily="sans-serif">Email orders</text>
        <text x="35" y="135" fill="#8e8e93" fontSize="11" fontFamily="sans-serif">Delivery receipts</text>
        <rect x="35" y="145" width="80" height="16" rx="4" fill="#1e1e24" />
        <text x="42" y="157" fill="#8e8e93" fontSize="9" fontFamily="monospace">Raw inputs</text>

        {/* Arrow 1 */}
        <path d="M 150 105 L 190 105" stroke="#c9a84c" strokeWidth="2" strokeDasharray="4 4" />
        <polygon points="190,100 200,105 190,110" fill="#c9a84c" />

        {/* Step 2: Model Proposes */}
        <rect x="200" y="40" width="140" height="130" rx="12" fill="#111113" stroke="#2a2a2e" strokeWidth="1.5" />
        <text x="215" y="70" fill="#f0f0f2" fontSize="13" fontWeight="bold" fontFamily="monospace">02. LLM Proposes</text>
        <text x="215" y="95" fill="#8e8e93" fontSize="11" fontFamily="sans-serif">Structured JSON</text>
        <text x="215" y="115" fill="#8e8e93" fontSize="11" fontFamily="sans-serif">Extracts line items</text>
        <text x="215" y="135" fill="#8e8e93" fontSize="11" fontFamily="sans-serif">Identifies amounts</text>
        <rect x="215" y="145" width="110" height="16" rx="4" fill="#2d221c" />
        <text x="222" y="157" fill="#c9a84c" fontSize="9" fontFamily="monospace">Staging proposal</text>

        {/* Arrow 2 */}
        <path d="M 340 105 L 380 105" stroke="#c9a84c" strokeWidth="2" />
        <polygon points="380,100 390,105 380,110" fill="#c9a84c" />

        {/* Step 3: Deterministic Gate */}
        <rect x="390" y="40" width="170" height="130" rx="12" fill="#111113" stroke="#c9a84c" strokeWidth="1.5" />
        <text x="405" y="70" fill="#f0f0f2" fontSize="13" fontWeight="bold" fontFamily="monospace">03. Deterministic Gate</text>
        <text x="405" y="95" fill="#8e8e93" fontSize="11" fontFamily="sans-serif">Strict Python/Pydantic types</text>
        <text x="405" y="115" fill="#8e8e93" fontSize="11" fontFamily="sans-serif">Math sum == invoice total</text>
        <text x="405" y="135" fill="#8e8e93" fontSize="11" fontFamily="sans-serif">Supplier tax ID verification</text>
        <rect x="405" y="145" width="120" height="16" rx="4" fill="#1c2d22" />
        <text x="412" y="157" fill="#4ade80" fontSize="9" fontFamily="monospace">Zero Corrupt Rows</text>

        {/* Arrow 3 */}
        <path d="M 560 105 L 600 105" stroke="#c9a84c" strokeWidth="2" />
        <polygon points="600,100 610,105 600,110" fill="#c9a84c" />

        {/* Step 4: Production Ledger or Review */}
        <rect x="610" y="40" width="130" height="130" rx="12" fill="#111113" stroke="#2a2a2e" strokeWidth="1.5" />
        <text x="625" y="70" fill="#f0f0f2" fontSize="13" fontWeight="bold" fontFamily="monospace">04. Execution</text>
        <text x="625" y="95" fill="#8e8e93" fontSize="11" fontFamily="sans-serif">Pass &rarr; Core Ledger</text>
        <text x="625" y="115" fill="#8e8e93" fontSize="11" fontFamily="sans-serif">Fail &rarr; Human Queue</text>
        <text x="625" y="135" fill="#8e8e93" fontSize="11" fontFamily="sans-serif">Permanent audit log</text>
        <rect x="625" y="145" width="100" height="16" rx="4" fill="#1e1e24" />
        <text x="632" y="157" fill="#8e8e93" fontSize="9" fontFamily="monospace">Audit verified</text>
      </svg>
    </div>
  );
}
