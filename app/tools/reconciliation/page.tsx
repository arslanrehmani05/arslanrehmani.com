// app/tools/reconciliation/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Scale,
  Upload,
  AlertCircle,
  CheckCircle2,
  Printer,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  RefreshCw,
} from 'lucide-react';

interface ReconRow {
  key: string;
  fileAValue?: number;
  fileBValue?: number;
  difference?: number;
  status: 'matched' | 'variance' | 'missing_in_b' | 'missing_in_a';
}

interface ReconSummary {
  totalKeysA: number;
  totalKeysB: number;
  perfectMatches: number;
  varianceMatches: number;
  missingInB: number;
  missingInA: number;
  totalSumA: number;
  totalSumB: number;
  netDifference: number;
  rows: ReconRow[];
}

export default function ReconciliationGapCheckerPage() {
  const [csvA, setCsvA] = useState<string>('');
  const [csvB, setCsvB] = useState<string>('');
  const [fileAName, setFileAName] = useState<string>('System_Ledger.csv');
  const [fileBName, setFileBName] = useState<string>('Bank_Statement.csv');
  const [keyColA, setKeyColA] = useState<string>('Transaction_ID');
  const [valColA, setValColA] = useState<string>('Amount');
  const [keyColB, setKeyColB] = useState<string>('Ref_Number');
  const [valColB, setValColB] = useState<string>('Credit_Amount');
  const [tolerance, setTolerance] = useState<number>(0.01);
  const [showFormula, setShowFormula] = useState<boolean>(true);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [results, setResults] = useState<ReconSummary | null>(null);

  // Load realistic synthetic sample for quick testing
  const loadSampleReconciliation = () => {
    const sampleA = `Transaction_ID,Amount,Entity,Date
TXN-101,1540.00,Delta Corp,2026-03-01
TXN-102,892.50,Apex Textiles,2026-03-02
TXN-103,4500.00,Balfour Mills,2026-03-03
TXN-104,120.00,Office Supplies,2026-03-04
TXN-105,780.25,Logistics Haul,2026-03-05
TXN-106,3100.00,Greige Yarn,2026-03-06`;

    const sampleB = `Ref_Number,Credit_Amount,Posting_Date
TXN-101,1540.00,2026-03-01
TXN-102,890.00,2026-03-02
TXN-103,4500.00,2026-03-03
TXN-105,780.25,2026-03-05
TXN-107,640.00,2026-03-07`;

    setCsvA(sampleA);
    setCsvB(sampleB);
    setFileAName('Synthetic_ERP_Ledger.csv');
    setFileBName('Synthetic_Bank_Feed.csv');
    setKeyColA('Transaction_ID');
    setValColA('Amount');
    setKeyColB('Ref_Number');
    setValColB('Credit_Amount');
  };

  const handleFileUpload = (file: File, target: 'A' | 'B') => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      if (target === 'A') {
        setCsvA(text);
        setFileAName(file.name);
      } else {
        setCsvB(text);
        setFileBName(file.name);
      }
    };
    reader.readAsText(file);
  };

  const executeReconciliation = () => {
    if (!csvA.trim() || !csvB.trim()) return;
    setIsProcessing(true);

    setTimeout(() => {
      try {
        const parseCsv = (text: string) => {
          const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
          if (lines.length < 2) return { headers: [], records: [] };
          const headers = lines[0].split(',').map((h) => h.trim().replace(/^["']|["']$/g, ''));
          const records = lines.slice(1).map((line) => {
            const cells = line.split(',').map((c) => c.trim().replace(/^["']|["']$/g, ''));
            const rowObj: Record<string, string> = {};
            headers.forEach((h, idx) => {
              rowObj[h] = cells[idx] ?? '';
            });
            return rowObj;
          });
          return { headers, records };
        };

        const parsedA = parseCsv(csvA);
        const parsedB = parseCsv(csvB);

        const mapA = new Map<string, number>();
        let sumA = 0;
        parsedA.records.forEach((rec) => {
          const key = rec[keyColA]?.trim();
          const val = parseFloat(rec[valColA] ?? '0');
          if (key) {
            mapA.set(key, (mapA.get(key) ?? 0) + (isNaN(val) ? 0 : val));
            if (!isNaN(val)) sumA += val;
          }
        });

        const mapB = new Map<string, number>();
        let sumB = 0;
        parsedB.records.forEach((rec) => {
          const key = rec[keyColB]?.trim();
          const val = parseFloat(rec[valColB] ?? '0');
          if (key) {
            mapB.set(key, (mapB.get(key) ?? 0) + (isNaN(val) ? 0 : val));
            if (!isNaN(val)) sumB += val;
          }
        });

        const allKeys = new Set([...Array.from(mapA.keys()), ...Array.from(mapB.keys())]);
        const reconRows: ReconRow[] = [];

        let perfect = 0;
        let variance = 0;
        let missingB = 0;
        let missingA = 0;

        allKeys.forEach((key) => {
          const hasA = mapA.has(key);
          const hasB = mapB.has(key);
          const valA = mapA.get(key);
          const valB = mapB.get(key);

          if (hasA && hasB) {
            const diff = Math.abs((valA ?? 0) - (valB ?? 0));
            if (diff <= tolerance) {
              perfect++;
              reconRows.push({
                key,
                fileAValue: valA,
                fileBValue: valB,
                difference: 0,
                status: 'matched',
              });
            } else {
              variance++;
              reconRows.push({
                key,
                fileAValue: valA,
                fileBValue: valB,
                difference: (valA ?? 0) - (valB ?? 0),
                status: 'variance',
              });
            }
          } else if (hasA && !hasB) {
            missingB++;
            reconRows.push({
              key,
              fileAValue: valA,
              difference: valA,
              status: 'missing_in_b',
            });
          } else if (!hasA && hasB) {
            missingA++;
            reconRows.push({
              key,
              fileBValue: valB,
              difference: -(valB ?? 0),
              status: 'missing_in_a',
            });
          }
        });

        // Sort rows: variances and missing first
        reconRows.sort((a, b) => {
          const priority = { variance: 1, missing_in_b: 2, missing_in_a: 3, matched: 4 };
          return priority[a.status] - priority[b.status];
        });

        setResults({
          totalKeysA: mapA.size,
          totalKeysB: mapB.size,
          perfectMatches: perfect,
          varianceMatches: variance,
          missingInB: missingB,
          missingInA: missingA,
          totalSumA: sumA,
          totalSumB: sumB,
          netDifference: sumA - sumB,
          rows: reconRows,
        });
      } catch (err) {
        console.error('Reconciliation error:', err);
        alert('Failed to parse columns. Please check your key and value column names.');
      } finally {
        setIsProcessing(false);
      }
    }, 250);
  };

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
            <span className="text-text-primary">Reconciliation Gap Checker</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bg-secondary border border-border-color text-xs font-mono text-emerald-400 mb-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Deterministic Client-Side Matcher &bull; No Server Upload</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-text-primary">
                Reconciliation Gap Checker
              </h1>
            </div>

            <div className="flex items-center gap-2 print:hidden">
              <button
                type="button"
                onClick={loadSampleReconciliation}
                className="btn-ghost !px-4 !py-2 !text-xs font-mono"
              >
                Load Synthetic Pair
              </button>
              {results && (
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="btn-primary !px-4 !py-2 !text-xs font-mono flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print / Export PDF</span>
                </button>
              )}
            </div>
          </div>

          <p className="text-sm sm:text-base text-text-muted leading-relaxed max-w-3xl">
            Compare two independent financial files (e.g. your ERP transaction journal against a bank statement or supplier invoice log). Computes exact row matches, identifies surplus records, and flags cent-level line variances in memory.
          </p>
        </div>

        {/* Input Cards: Two Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print:hidden">
          {/* File A Card */}
          <div className="rounded-2xl bg-bg-secondary border border-border-color p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-text-muted font-semibold">
                File A: Primary Ledger
              </span>
              <label className="text-xs font-mono text-accent-gold hover:underline cursor-pointer">
                Upload CSV
                <input
                  type="file"
                  accept=".csv,text/csv"
                  onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'A')}
                  className="hidden"
                />
              </label>
            </div>
            <div className="text-xs font-mono text-text-primary truncate">{fileAName}</div>
            <textarea
              value={csvA}
              onChange={(e) => setCsvA(e.target.value)}
              placeholder="Paste File A CSV..."
              rows={5}
              className="w-full rounded-xl bg-bg-primary border border-border-color p-3 text-xs font-mono text-text-primary placeholder:text-text-subtle focus:outline-none focus:border-border-gold transition-colors"
            />
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="text-text-subtle font-mono block mb-1">Key Column:</label>
                <input
                  type="text"
                  value={keyColA}
                  onChange={(e) => setKeyColA(e.target.value)}
                  className="w-full rounded-lg bg-bg-primary border border-border-color p-2 font-mono text-xs text-text-primary"
                />
              </div>
              <div>
                <label className="text-text-subtle font-mono block mb-1">Amount Column:</label>
                <input
                  type="text"
                  value={valColA}
                  onChange={(e) => setValColA(e.target.value)}
                  className="w-full rounded-lg bg-bg-primary border border-border-color p-2 font-mono text-xs text-text-primary"
                />
              </div>
            </div>
          </div>

          {/* File B Card */}
          <div className="rounded-2xl bg-bg-secondary border border-border-color p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-text-muted font-semibold">
                File B: Target / Bank Feed
              </span>
              <label className="text-xs font-mono text-accent-gold hover:underline cursor-pointer">
                Upload CSV
                <input
                  type="file"
                  accept=".csv,text/csv"
                  onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'B')}
                  className="hidden"
                />
              </label>
            </div>
            <div className="text-xs font-mono text-text-primary truncate">{fileBName}</div>
            <textarea
              value={csvB}
              onChange={(e) => setCsvB(e.target.value)}
              placeholder="Paste File B CSV..."
              rows={5}
              className="w-full rounded-xl bg-bg-primary border border-border-color p-3 text-xs font-mono text-text-primary placeholder:text-text-subtle focus:outline-none focus:border-border-gold transition-colors"
            />
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="text-text-subtle font-mono block mb-1">Key Column:</label>
                <input
                  type="text"
                  value={keyColB}
                  onChange={(e) => setKeyColB(e.target.value)}
                  className="w-full rounded-lg bg-bg-primary border border-border-color p-2 font-mono text-xs text-text-primary"
                />
              </div>
              <div>
                <label className="text-text-subtle font-mono block mb-1">Amount Column:</label>
                <input
                  type="text"
                  value={valColB}
                  onChange={(e) => setValColB(e.target.value)}
                  className="w-full rounded-lg bg-bg-primary border border-border-color p-2 font-mono text-xs text-text-primary"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Assumptions & Tolerance Bar */}
        <div className="rounded-2xl bg-bg-secondary border border-border-color p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-text-primary uppercase tracking-wider">
              Reconciliation Rules & Tolerance
            </span>
            <button
              type="button"
              onClick={() => setShowFormula(!showFormula)}
              className="text-xs font-mono text-text-muted hover:text-text-primary flex items-center gap-1"
            >
              <span>{showFormula ? 'Hide Rules' : 'Show Rules'}</span>
              {showFormula ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <label className="text-xs text-text-muted flex items-center gap-2">
                <span>Variance Tolerance (Absolute Value):</span>
                <span className="font-mono text-text-primary font-semibold">${tolerance.toFixed(2)}</span>
              </label>
              <input
                type="range"
                min="0.00"
                max="5.00"
                step="0.01"
                value={tolerance}
                onChange={(e) => setTolerance(parseFloat(e.target.value))}
                className="w-64 accent-accent-gold cursor-pointer"
              />
              <span className="text-[11px] text-text-subtle block">
                Values differing by less than ${tolerance.toFixed(2)} are classified as matched (e.g. minor FX or rounding noise).
              </span>
            </div>

            <button
              type="button"
              onClick={executeReconciliation}
              disabled={isProcessing || !csvA.trim() || !csvB.trim()}
              className="btn-primary !px-6 !py-3 !text-xs font-semibold flex items-center gap-2 disabled:opacity-50 self-start sm:self-auto"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isProcessing ? 'animate-spin' : ''}`} />
              <span>{isProcessing ? 'Reconciling Keys...' : 'Compare Ledgers'}</span>
            </button>
          </div>

          {showFormula && (
            <div className="mt-3 p-3 rounded-lg bg-bg-primary/80 border border-border-color text-xs font-mono text-text-muted space-y-1">
              <div className="text-text-primary font-semibold">Join & Variance Logic:</div>
              <div>• Key Hash: Outer join on normalized string keys (trimmed of whitespace and quotes).</div>
              <div>• Net Discrepancy: Σ Amount_A - Σ Amount_B across all matching and orphan keys.</div>
              <div>• Output Label: Deterministic operational estimate.</div>
            </div>
          )}
        </div>

        {/* Results View */}
        {results && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Metric KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-bg-secondary border border-border-color space-y-1">
                <span className="text-xs font-mono text-text-muted uppercase">Perfect Matches</span>
                <div className="text-2xl font-bold font-mono text-emerald-400">{results.perfectMatches}</div>
                <span className="text-[11px] text-text-subtle">Within ${tolerance.toFixed(2)} tolerance</span>
              </div>

              <div className="p-5 rounded-2xl bg-bg-secondary border border-border-color space-y-1">
                <span className="text-xs font-mono text-text-muted uppercase">Line Variances</span>
                <div className={`text-2xl font-bold font-mono ${results.varianceMatches > 0 ? 'text-amber-400' : 'text-text-primary'}`}>
                  {results.varianceMatches}
                </div>
                <span className="text-[11px] text-text-subtle">Key matched, amount differs</span>
              </div>

              <div className="p-5 rounded-2xl bg-bg-secondary border border-border-color space-y-1">
                <span className="text-xs font-mono text-text-muted uppercase">Missing in File B</span>
                <div className="text-2xl font-bold font-mono text-rose-400">{results.missingInB}</div>
                <span className="text-[11px] text-text-subtle">Recorded in A, omitted in B</span>
              </div>

              <div className="p-5 rounded-2xl bg-bg-secondary border border-border-color space-y-1">
                <span className="text-xs font-mono text-text-muted uppercase">Net Ledger Gap</span>
                <div className={`text-2xl font-bold font-mono ${results.netDifference !== 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                  ${results.netDifference.toFixed(2)}
                </div>
                <span className="text-[11px] text-text-subtle">
                  Total A (${results.totalSumA.toFixed(2)}) vs B (${results.totalSumB.toFixed(2)})
                </span>
              </div>
            </div>

            {/* Reconciliation Detail Table */}
            <div className="rounded-2xl bg-bg-secondary border border-border-color overflow-hidden">
              <div className="p-6 border-b border-border-color flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-text-primary">Keyed Comparison Ledger</h3>
                  <p className="text-xs text-text-muted">Filtered by discrepancy priority</p>
                </div>
                <span className="text-xs font-mono text-text-subtle">Total Keys Audited: {results.rows.length}</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono border-collapse">
                  <thead>
                    <tr className="border-b border-border-color bg-bg-primary/50 text-text-muted">
                      <th className="py-3 px-4 font-semibold">Key</th>
                      <th className="py-3 px-4 font-semibold">File A Amount</th>
                      <th className="py-3 px-4 font-semibold">File B Amount</th>
                      <th className="py-3 px-4 font-semibold">Delta</th>
                      <th className="py-3 px-4 font-semibold">Audit Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-color">
                    {results.rows.map((row) => (
                      <tr key={row.key} className="hover:bg-bg-primary/30 transition-colors">
                        <td className="py-3 px-4 text-text-primary font-semibold">{row.key}</td>
                        <td className="py-3 px-4 text-text-muted">
                          {row.fileAValue !== undefined ? `$${row.fileAValue.toFixed(2)}` : '—'}
                        </td>
                        <td className="py-3 px-4 text-text-muted">
                          {row.fileBValue !== undefined ? `$${row.fileBValue.toFixed(2)}` : '—'}
                        </td>
                        <td className="py-3 px-4 font-semibold">
                          {row.difference !== undefined ? (
                            <span className={row.difference === 0 ? 'text-text-muted' : 'text-amber-400'}>
                              {row.difference > 0 ? `+$${row.difference.toFixed(2)}` : `-$${Math.abs(row.difference).toFixed(2)}`}
                            </span>
                          ) : (
                            '—'
                          )}
                        </td>
                        <td className="py-3 px-4">
                          {row.status === 'matched' && (
                            <span className="inline-flex items-center gap-1 text-emerald-400">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Reconciled
                            </span>
                          )}
                          {row.status === 'variance' && (
                            <span className="inline-flex items-center gap-1 text-amber-400">
                              <AlertCircle className="w-3.5 h-3.5" /> Variance
                            </span>
                          )}
                          {row.status === 'missing_in_b' && (
                            <span className="inline-flex items-center gap-1 text-rose-400">
                              <AlertCircle className="w-3.5 h-3.5" /> Missing in B
                            </span>
                          )}
                          {row.status === 'missing_in_a' && (
                            <span className="inline-flex items-center gap-1 text-sky-400">
                              <AlertCircle className="w-3.5 h-3.5" /> Missing in A
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Next Steps CTA */}
            <div className="p-6 rounded-2xl bg-bg-secondary border border-border-color flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 print:hidden">
              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-text-primary">
                  Tired of running spreadsheet VLOOKUPs at month-end close?
                </h4>
                <p className="text-xs text-text-muted">
                  I build automated double-entry ledger pipelines that reconcile bank, ERP, and payment gateway feeds daily with immutable audit logging.
                </p>
              </div>
              <Link
                href="/contact"
                className="btn-primary !px-5 !py-2.5 !text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-1.5 whitespace-nowrap"
              >
                <span>Book Reconciliation Review</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
