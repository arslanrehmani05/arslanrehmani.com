// app/tools/scanner/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Upload, FileSpreadsheet, AlertTriangle, CheckCircle2, ShieldCheck, Download, Sliders } from 'lucide-react';

interface ScanReport {
  fileName: string;
  rowCount: number;
  colCount: number;
  duplicateRows: number;
  missingValues: { column: string; count: number; percentage: number }[];
  typeMismatches: { column: string; detectedType: string; anomalies: number }[];
  outliers: { column: string; outlierCount: number; min: number; max: number; avg: number }[];
  suspiciousDates: { column: string; invalidCount: number }[];
  estimatedFixTimeHours: string;
}

export default function DataQualityScannerPage() {
  const [report, setReport] = useState<ScanReport | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [zScoreThreshold, setZScoreThreshold] = useState(2.5);
  const [sampleLoaded, setSampleLoaded] = useState(false);

  // Client-side parser running 100% locally in the browser
  const processCSVText = (csvText: string, fileName: string) => {
    setIsProcessing(true);
    setTimeout(() => {
      const lines = csvText.trim().split('\n').filter((l) => l.trim().length > 0);
      if (lines.length < 2) {
        setIsProcessing(false);
        return;
      }

      const headers = lines[0].split(',').map((h) => h.trim().replace(/^["']|["']$/g, ''));
      const rows = lines.slice(1).map((line) => line.split(',').map((cell) => cell.trim().replace(/^["']|["']$/g, '')));

      // Check duplicates
      const rowStrings = rows.map((r) => r.join('||'));
      const uniqueRows = new Set(rowStrings);
      const duplicateCount = rows.length - uniqueRows.size;

      // Check missing values
      const missingValues = headers.map((col, colIdx) => {
        let missing = 0;
        rows.forEach((row) => {
          const val = row[colIdx];
          if (!val || val === '' || val.toLowerCase() === 'null' || val.toLowerCase() === 'nan') {
            missing += 1;
          }
        });
        return {
          column: col,
          count: missing,
          percentage: Math.round((missing / rows.length) * 100),
        };
      }).filter((m) => m.count > 0);

      // Check type mismatches & outliers
      const typeMismatches: ScanReport['typeMismatches'] = [];
      const outliers: ScanReport['outliers'] = [];
      const suspiciousDates: ScanReport['suspiciousDates'] = [];

      headers.forEach((col, colIdx) => {
        const colVals = rows.map((r) => r[colIdx]).filter(Boolean);
        const numericVals: number[] = [];
        let dateErrors = 0;

        colVals.forEach((val) => {
          const num = Number(val);
          if (!isNaN(num) && val.trim() !== '') {
            numericVals.push(num);
          }
          // Date heuristic
          if (col.toLowerCase().includes('date') || col.toLowerCase().includes('time')) {
            const parsed = Date.parse(val);
            if (isNaN(parsed) || new Date(parsed).getFullYear() < 1990 || new Date(parsed).getFullYear() > 2030) {
              dateErrors += 1;
            }
          }
        });

        if (dateErrors > 0) {
          suspiciousDates.push({ column: col, invalidCount: dateErrors });
        }

        // If predominantly numeric
        if (numericVals.length > rows.length * 0.7) {
          const nonNumericCount = rows.length - numericVals.length;
          if (nonNumericCount > 0) {
            typeMismatches.push({
              column: col,
              detectedType: 'Numeric / Decimal',
              anomalies: nonNumericCount,
            });
          }

          // Outliers via mean + zScore
          if (numericVals.length > 5) {
            const sum = numericVals.reduce((a, b) => a + b, 0);
            const mean = sum / numericVals.length;
            const variance = numericVals.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / numericVals.length;
            const stdDev = Math.sqrt(variance);

            const outlierItems = numericVals.filter((v) => Math.abs((v - mean) / (stdDev || 1)) > zScoreThreshold);
            if (outlierItems.length > 0) {
              outliers.push({
                column: col,
                outlierCount: outlierItems.length,
                min: Math.min(...numericVals),
                max: Math.max(...numericVals),
                avg: Math.round(mean * 100) / 100,
              });
            }
          }
        }
      });

      // Estimated remediation drag
      const totalAnomalies = duplicateCount + missingValues.reduce((a, b) => a + b.count, 0) + typeMismatches.reduce((a, b) => a + b.anomalies, 0);
      const estHours = (totalAnomalies * 0.08).toFixed(1);

      setReport({
        fileName,
        rowCount: rows.length,
        colCount: headers.length,
        duplicateRows: duplicateCount,
        missingValues,
        typeMismatches,
        outliers,
        suspiciousDates,
        estimatedFixTimeHours: estHours,
      });
      setIsProcessing(false);
    }, 300);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      processCSVText(text, file.name);
    };
    reader.readAsText(file);
  };

  const loadSampleData = () => {
    setSampleLoaded(true);
    const sample = `InvoiceNumber,VendorName,InvoiceDate,Quantity,UnitPrice,TotalAmount
INV-1001,Apex Loom Supplies,2026-05-12,10,150.00,1500.00
INV-1002,Southern Cotton Mills,2026-05-14,25,42.50,1062.50
INV-1003,Industrial Parts Ltd,invalid-date,5,80.00,400.00
INV-1004,Apex Loom Supplies,2026-05-15,12,N/A,99999.00
INV-1001,Apex Loom Supplies,2026-05-12,10,150.00,1500.00
INV-1005,Global Logistics,2026-05-18,1,450.00,450.00
INV-1006,Standard Wire Co,2026-05-20,100,3.20,320.00`;
    processCSVText(sample, 'synthetic_operations_sample.csv');
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

        {/* Tool Header */}
        <div className="space-y-4 border-b border-border-color pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bg-secondary border border-border-color text-xs font-mono text-text-muted">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Runs 100% Client-Side &bull; Nothing Leaves Your Device</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-text-primary">
            Data Quality Scanner
          </h1>

          <p className="text-sm sm:text-base text-text-muted leading-relaxed">
            Drop an operational or financial CSV file. The scanner profiles missing cells, duplicate keys, type mismatches, statistical outliers, and date formatting anomalies entirely in your browser.
          </p>

          <div className="p-4 rounded-xl bg-bg-secondary/40 border border-border-color text-xs font-mono text-text-subtle">
            <strong className="text-text-primary">Underlying Formula: </strong>
            Deterministic profiling using column null ratios, uniqueness checks, and Z-score outlier detection (Z = |x - μ| / σ).
          </div>
        </div>

        {/* Upload Zone & Controls */}
        <div className="space-y-6">
          <div className="p-8 sm:p-12 rounded-3xl bg-bg-secondary/40 border-2 border-dashed border-border-color hover:border-text-primary/40 transition-all text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-bg-primary border border-border-color flex items-center justify-center mx-auto text-text-primary">
              <Upload className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h2 className="text-lg font-bold text-text-primary">
                Drop your CSV file here, or browse
              </h2>
              <p className="text-xs text-text-muted">
                Accepts standard comma-separated files (.csv). Max file size: 25 MB.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <label className="btn-primary !px-5 !py-2.5 !text-xs font-semibold cursor-pointer">
                <span>Select Local CSV File</span>
                <input
                  type="file"
                  accept=".csv,text/csv"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              <button
                type="button"
                onClick={loadSampleData}
                className="btn-ghost !px-5 !py-2.5 !text-xs font-medium"
              >
                Load Synthetic Sample CSV
              </button>
            </div>

            {isProcessing && (
              <p className="text-xs font-mono text-accent-gold animate-pulse pt-2">
                Profiling rows in local browser thread...
              </p>
            )}
          </div>

          {/* User-Editable Assumptions */}
          <div className="p-6 rounded-2xl bg-bg-secondary/30 border border-border-color space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-text-subtle font-bold">
                <Sliders className="w-3.5 h-3.5 text-accent-gold" />
                <span>Editable Statistical Assumptions</span>
              </div>
              <span className="text-[11px] font-mono text-text-subtle">
                Threshold: {zScoreThreshold} σ
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <label htmlFor="zscore-slider" className="text-text-muted">Outlier Sensitivity (Z-score threshold):</label>
              <input
                id="zscore-slider"
                type="range"
                min="1.5"
                max="4.0"
                step="0.5"
                value={zScoreThreshold}
                onChange={(e) => setZScoreThreshold(Number(e.target.value))}
                className="accent-accent-gold cursor-pointer"
              />
              <span className="text-text-primary font-bold">{zScoreThreshold} standard deviations</span>
            </div>
          </div>
        </div>

        {/* Scan Report Display */}
        {report && (
          <div className="space-y-8 rounded-3xl bg-bg-secondary/60 border border-border-color p-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border-color/60 pb-6">
              <div>
                <span className="text-xs font-mono text-text-subtle">Scan Completed Locally</span>
                <h3 className="text-2xl font-bold text-text-primary mt-0.5">
                  Report: {report.fileName}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="btn-ghost !px-4 !py-1.5 !text-xs flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Report (PDF)</span>
                </button>
              </div>
            </div>

            {/* Metric Tiles */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
              <div className="p-4 rounded-xl bg-bg-primary border border-border-color">
                <div className="text-text-subtle">Rows Profiled</div>
                <div className="text-2xl font-bold text-text-primary mt-1">{report.rowCount}</div>
              </div>

              <div className="p-4 rounded-xl bg-bg-primary border border-border-color">
                <div className="text-text-subtle">Columns</div>
                <div className="text-2xl font-bold text-text-primary mt-1">{report.colCount}</div>
              </div>

              <div className="p-4 rounded-xl bg-bg-primary border border-border-color">
                <div className="text-text-subtle">Duplicate Rows</div>
                <div className={`text-2xl font-bold mt-1 ${report.duplicateRows > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {report.duplicateRows}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-bg-primary border border-border-color">
                <div className="text-text-subtle">Estimated Cleanup Drag</div>
                <div className="text-2xl font-bold text-text-primary mt-1">
                  ~{report.estimatedFixTimeHours} hrs
                </div>
              </div>
            </div>

            {/* Findings Details */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-wider text-text-subtle">
                Detailed Anomalies Detected
              </h4>

              {report.missingValues.length > 0 && (
                <div className="p-4 rounded-xl bg-bg-primary border border-border-color space-y-2 text-xs">
                  <div className="font-bold text-amber-400 font-mono">Missing Values:</div>
                  <ul className="space-y-1 text-text-muted">
                    {report.missingValues.map((m) => (
                      <li key={m.column} className="flex justify-between font-mono">
                        <span>Column &ldquo;{m.column}&rdquo;</span>
                        <span>{m.count} empty cells ({m.percentage}%)</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {report.typeMismatches.length > 0 && (
                <div className="p-4 rounded-xl bg-bg-primary border border-border-color space-y-2 text-xs">
                  <div className="font-bold text-amber-400 font-mono">Data Type Mismatches:</div>
                  <ul className="space-y-1 text-text-muted">
                    {report.typeMismatches.map((t) => (
                      <li key={t.column} className="flex justify-between font-mono">
                        <span>Column &ldquo;{t.column}&rdquo; expected {t.detectedType}</span>
                        <span>{t.anomalies} non-conforming cells</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {report.outliers.length > 0 && (
                <div className="p-4 rounded-xl bg-bg-primary border border-border-color space-y-2 text-xs">
                  <div className="font-bold text-amber-400 font-mono">Statistical Outliers (&gt; {zScoreThreshold} σ):</div>
                  <ul className="space-y-1 text-text-muted">
                    {report.outliers.map((o) => (
                      <li key={o.column} className="flex justify-between font-mono">
                        <span>Column &ldquo;{o.column}&rdquo;</span>
                        <span>{o.outlierCount} extreme values (avg: {o.avg}, max: {o.max})</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {report.suspiciousDates.length > 0 && (
                <div className="p-4 rounded-xl bg-bg-primary border border-border-color space-y-2 text-xs">
                  <div className="font-bold text-amber-400 font-mono">Suspicious Date Formats:</div>
                  <ul className="space-y-1 text-text-muted">
                    {report.suspiciousDates.map((d) => (
                      <li key={d.column} className="flex justify-between font-mono">
                        <span>Column &ldquo;{d.column}&rdquo;</span>
                        <span>{d.invalidCount} unparseable date strings</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {report.duplicateRows === 0 && report.missingValues.length === 0 && report.typeMismatches.length === 0 && (
                <div className="p-4 rounded-xl bg-bg-primary border border-emerald-500/30 text-xs font-mono text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>No critical data quality errors detected in this dataset.</span>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-border-color/60 text-xs text-text-subtle font-mono">
              Disclaimer: Output labeled estimate as of October 2026. Formulas and heuristics run on standard client memory limits.
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
