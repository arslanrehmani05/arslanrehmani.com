// app/tools/reconciliation/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Scale, Upload, AlertTriangle, CheckCircle2, ShieldCheck, Download, Sliders } from 'lucide-react';

interface ReconResult {
  matchedRows: number;
  missingInA: number;
  missingInB: number;
  varianceRows: number;
  netDollarDifference: number;
  discrepancies: {
    key: string;
    valA: number;
    valB: number;
    diff: number;
  }[];
}

export default function ReconciliationGapCheckerPage() {
  const [csvA, setCsvA] = useState<string>('');
  const [csvB, setCsvB] = useState<string>('');
  const [keyColA, setKeyColA] = useState('InvoiceNumber');
  const [valColA, setValColA] = useState('Amount');
  const [keyColB, setKeyColB] = useState('Reference');
  const [valColB, setValColB] = useState('Amount');
  const [tolerance, setTolerance] = useState(0.01);
  const [result, setResult] = useState<ReconResult | null>(null);

  const loadSyntheticRecon = () => {
    // Dataset A: Internal AP Ledger
    const dataA = `InvoiceNumber,Vendor,Amount
INV-881,Apex Looms,1500.00
INV-882,Cotton Yarns Co,4250.00
INV-883,Delta Logistics,680.00
INV-884,Greige Processing,9200.00
INV-885,Wire Components,310.50`;

    // Dataset B: Bank Feed Transactions
    const dataB = `Reference,Description,Amount
INV-881,APEX LOOMS DIRECT WIRE,1500.00
INV-882,COTTON YARNS CO,4235.00
INV-883,DELTA LOGISTICS,680.00
INV-884,GREIGE PROCESSING,9200.00
INV-886,UNKNOWN VENDOR PAYMENT,1150.00`;

    setCsvA(dataA);
    setCsvB(dataB);
    executeRecon(dataA, dataB);
  };

  const executeRecon = (textA: string, textB: string) => {
    const parse = (text: string) => {
      const lines = text.trim().split('\n').filter((l) => l.trim().length > 0);
      if (lines.length < 2) return [];
      const headers = lines[0].split(',').map((h) => h.trim().replace(/^["']|["']$/g, ''));
      return lines.slice(1).map((line) => {
        const parts = line.split(',').map((c) => c.trim().replace(/^["']|["']$/g, ''));
        const obj: Record<string, string> = {};
        headers.forEach((h, i) => {
          obj[h] = parts[i] || '';
        });
        return obj;
      });
    };

    const rowsA = parse(textA);
    const rowsB = parse(textB);

    const mapA = new Map<string, number>();
    rowsA.forEach((r) => {
      const key = (r[keyColA] || Object.values(r)[0] || '').trim();
      const val = parseFloat(r[valColA] || Object.values(r)[2] || '0') || 0;
      mapA.set(key, val);
    });

    const mapB = new Map<string, number>();
    rowsB.forEach((r) => {
      const key = (r[keyColB] || Object.values(r)[0] || '').trim();
      const val = parseFloat(r[valColB] || Object.values(r)[2] || '0') || 0;
      mapB.set(key, val);
    });

    let matched = 0;
    let missingA = 0;
    let missingB = 0;
    let varianceCount = 0;
    let totalDiff = 0;
    const diffs: ReconResult['discrepancies'] = [];

    // Check mapA items against mapB
    mapA.forEach((valA, key) => {
      if (!mapB.has(key)) {
        missingB += 1;
        totalDiff += valA;
        diffs.push({ key, valA, valB: 0, diff: valA });
      } else {
        const valB = mapB.get(key)!;
        const diff = Math.abs(valA - valB);
        if (diff > tolerance) {
          varianceCount += 1;
          totalDiff += diff;
          diffs.push({ key, valA, valB, diff: valA - valB });
        } else {
          matched += 1;
        }
      }
    });

    // Check items present in B but missing in A
    mapB.forEach((valB, key) => {
      if (!mapA.has(key)) {
        missingA += 1;
        totalDiff += valB;
        diffs.push({ key, valA: 0, valB, diff: -valB });
      }
    });

    setResult({
      matchedRows: matched,
      missingInA: missingA,
      missingInB: missingB,
      varianceRows: varianceCount,
      netDollarDifference: Math.round(totalDiff * 100) / 100,
      discrepancies: diffs,
    });
  };

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary pt-24 pb-20 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Back Link */}
        <div>
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 text-xs font-mono text-text-muted hover:text-text-primary transition-colors py-1 px-3 rounded-lg bg-bg-secondary border border-border-color"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Tools Hub</span>
          </Link>
        </div>

        {/* Header Block */}
        <div className="space-y-4 border-b border-border-color pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bg-secondary border border-border-color text-xs font-mono text-text-muted">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Deterministic Key Matcher &bull; Browser Execution</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-text-primary">
            Reconciliation Gap Checker
          </h1>

          <p className="text-sm sm:text-base text-text-muted leading-relaxed">
            Compare two datasets (e.g. Bank Statements vs. Purchase Invoices or Shopify Orders vs. Stripe Payouts). The matcher identifies missing transactions, extra entries, and cent-level line variances client-side.
          </p>

          <div className="p-4 rounded-xl bg-bg-secondary/40 border border-border-color text-xs font-mono text-text-subtle">
            <strong className="text-text-primary">Underlying Formula: </strong>
            Key-indexed outer join with epsilon variance threshold: |Amount_A - Amount_B| &gt; {tolerance}.
          </div>
        </div>

        {/* Data Input Zone */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-bg-secondary/40 border border-border-color space-y-3">
              <div className="text-xs font-mono font-bold text-text-primary uppercase tracking-wider">
                Dataset A: Internal Ledger (CSV)
              </div>
              <textarea
                rows={6}
                value={csvA}
                onChange={(e) => setCsvA(e.target.value)}
                placeholder="Paste CSV A lines here or click Load Synthetic Sample..."
                className="w-full p-3 rounded-xl bg-bg-primary border border-border-color text-xs font-mono text-text-primary placeholder:text-text-subtle focus:outline-none"
              />
            </div>

            <div className="p-6 rounded-2xl bg-bg-secondary/40 border border-border-color space-y-3">
              <div className="text-xs font-mono font-bold text-text-primary uppercase tracking-wider">
                Dataset B: Bank / Gateway Feed (CSV)
              </div>
              <textarea
                rows={6}
                value={csvB}
                onChange={(e) => setCsvB(e.target.value)}
                placeholder="Paste CSV B lines here or click Load Synthetic Sample..."
                className="w-full p-3 rounded-xl bg-bg-primary border border-border-color text-xs font-mono text-text-primary placeholder:text-text-subtle focus:outline-none"
              />
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => executeRecon(csvA, csvB)}
                disabled={!csvA.trim() || !csvB.trim()}
                className="btn-primary !px-6 !py-3 !text-xs font-semibold disabled:opacity-40"
              >
                Execute Local Reconciliation
              </button>

              <button
                type="button"
                onClick={loadSyntheticRecon}
                className="btn-ghost !px-5 !py-3 !text-xs font-medium"
              >
                Load Synthetic AP vs. Bank Sample
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-text-subtle">
              <label htmlFor="tolerance-input">Variance Tolerance:</label>
              <input
                id="tolerance-input"
                type="number"
                step="0.01"
                min="0"
                value={tolerance}
                onChange={(e) => setTolerance(parseFloat(e.target.value) || 0)}
                className="w-16 p-1.5 rounded bg-bg-primary border border-border-color text-center font-mono text-text-primary"
              />
              <span>$</span>
            </div>
          </div>
        </div>

        {/* Results View */}
        {result && (
          <div className="p-8 rounded-3xl bg-bg-secondary/60 border border-border-color space-y-8 font-mono text-xs">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border-color/60 pb-6">
              <div>
                <span className="text-text-subtle">Reconciliation Summary</span>
                <h3 className="text-2xl font-bold text-text-primary font-sans mt-0.5">
                  Variance Report
                </h3>
              </div>

              <button
                type="button"
                onClick={() => window.print()}
                className="btn-ghost !px-4 !py-1.5 !text-xs flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Audit (PDF)</span>
              </button>
            </div>

            {/* Metric Summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-bg-primary border border-border-color">
                <div className="text-text-subtle">Matched Cleanly</div>
                <div className="text-2xl font-bold text-emerald-400 mt-1">{result.matchedRows}</div>
              </div>

              <div className="p-4 rounded-xl bg-bg-primary border border-border-color">
                <div className="text-text-subtle">Amount Variances</div>
                <div className={`text-2xl font-bold mt-1 ${result.varianceRows > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {result.varianceRows}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-bg-primary border border-border-color">
                <div className="text-text-subtle">Missing Records</div>
                <div className="text-2xl font-bold text-amber-400 mt-1">
                  {result.missingInA + result.missingInB}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-bg-primary border border-border-color">
                <div className="text-text-subtle">Net Unreconciled Gap</div>
                <div className="text-2xl font-bold text-text-primary mt-1">
                  ${result.netDollarDifference.toFixed(2)}
                </div>
              </div>
            </div>

            {/* Discrepancy Breakdown Table */}
            <div className="space-y-3">
              <div className="text-xs uppercase font-mono tracking-wider text-text-subtle">
                Identified Discrepancy Lines
              </div>
              <div className="overflow-x-auto rounded-xl border border-border-color bg-bg-primary">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border-color text-text-subtle bg-bg-secondary/40">
                      <th className="p-3">Reference Key</th>
                      <th className="p-3">Ledger Amount (A)</th>
                      <th className="p-3">Bank Amount (B)</th>
                      <th className="p-3">Variance / Gap</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-color/60 text-text-muted">
                    {result.discrepancies.map((d) => (
                      <tr key={d.key} className="hover:bg-bg-secondary/20">
                        <td className="p-3 text-text-primary font-bold">{d.key}</td>
                        <td className="p-3">${d.valA.toFixed(2)}</td>
                        <td className="p-3">${d.valB.toFixed(2)}</td>
                        <td className="p-3 text-amber-400 font-bold">
                          {d.diff > 0 ? `+$${d.diff.toFixed(2)}` : `-$${Math.abs(d.diff).toFixed(2)}`}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="text-[11px] text-text-subtle border-t border-border-color/60 pt-4">
              Estimated calculation as of October 2026. Zero client data uploaded.
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
