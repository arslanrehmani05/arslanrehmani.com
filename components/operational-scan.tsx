// components/operational-scan.tsx
'use client';

import { useState, useEffect } from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import {
  Search,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Download,
  Building2,
  Layers,
  Sparkles,
  RefreshCw,
  TrendingDown,
  Check,
} from 'lucide-react';
import { INDUSTRY_CONTEXTS, IndustryType } from '@/lib/calculators/industry-context';

interface DetectedProfile {
  platform: string;
  catalogSize: string;
  serviceChannels: string;
  freshness: string;
}

interface ScanAnswers {
  teamMembers: number;
  hoursPerWeek: number;
  sector: IndustryType;
  disconnectedTools: number;
  inventorySync: string;
  commChannel: string;
  schedulingMethod: string;
  revenueRange: string;
  headache: string;
  automationLevel: string;
}

const defaultAnswers: ScanAnswers = {
  teamMembers: 4,
  hoursPerWeek: 15,
  sector: 'manufacturing',
  disconnectedTools: 4,
  inventorySync: 'Weekly Manual Count',
  commChannel: 'Email & WhatsApp',
  schedulingMethod: 'Spreadsheets',
  revenueRange: '$50k - $200k / mo',
  headache: 'High Admin Overhead & Double Data Entry',
  automationLevel: 'Basic Zapier / Manual Scripts',
};

const questions = [
  {
    id: 'teamMembers',
    title: 'How many team members perform manual data entry or spreadsheet updates?',
    subtitle: 'Question 1 of 10 — Team Overhead',
    type: 'slider',
    min: 1,
    max: 25,
    step: 1,
    unit: 'people',
  },
  {
    id: 'hoursPerWeek',
    title: 'How many hours per week does each person spend on manual status reporting?',
    subtitle: 'Question 2 of 10 — Time Drag',
    type: 'slider',
    min: 1,
    max: 40,
    step: 1,
    unit: 'hours/week',
  },
  {
    id: 'sector',
    title: 'What is your primary operating sector?',
    subtitle: 'Question 3 of 10 — Industry Profile',
    type: 'cards',
    options: [
      { value: 'manufacturing', label: 'SMB Manufacturing & Textiles', desc: 'Plant operations, floor tracking, inventory' },
      { value: 'ecommerce', label: 'Multi-Channel Ecommerce', desc: 'Shopify, Amazon, inventory sync' },
      { value: 'logistics', label: 'Logistics & Supply Chain', desc: 'Freight dispatch, shipment tracking' },
      { value: 'services', label: 'Professional & B2B Services', desc: 'Client deliverables, billing, admin' },
      { value: 'retail', label: 'Omnichannel Retail', desc: 'POS, store inventory, supplier orders' },
      { value: 'other', label: 'General Commercial Operation', desc: 'Custom workflows and administrative systems' },
    ],
  },
  {
    id: 'disconnectedTools',
    title: 'How many disconnected software tools or channels does your team juggle daily?',
    subtitle: 'Question 4 of 10 — Tool Fragmentation',
    type: 'slider',
    min: 1,
    max: 12,
    step: 1,
    unit: 'tools',
  },
  {
    id: 'inventorySync',
    title: 'How frequently is inventory or operational stock reconciled?',
    subtitle: 'Question 5 of 10 — Data Freshness',
    type: 'cards',
    options: [
      { value: 'Real-Time Automated', label: 'Real-Time API Sync', desc: 'Automated database updates' },
      { value: 'Daily Manual', label: 'Daily Manual Count', desc: 'End-of-day spreadsheet update' },
      { value: 'Weekly Manual Count', label: 'Weekly Manual Count', desc: 'Batch reconciliation' },
      { value: 'Monthly / Rarely', label: 'Monthly or Rarely', desc: 'High risk of stock disconnects' },
    ],
  },
  {
    id: 'commChannel',
    title: 'Primary customer & internal status update channel:',
    subtitle: 'Question 6 of 10 — Communication Channels',
    type: 'cards',
    options: [
      { value: 'Self-Serve Client Portal', label: 'Automated Portal', desc: 'Clients check status live online' },
      { value: 'Email & WhatsApp', label: 'Email & WhatsApp', desc: 'Manual status threads and calls' },
      { value: 'Phone & Direct Calls', label: 'Phone & Meetings', desc: 'Constant manual interruptions' },
    ],
  },
  {
    id: 'schedulingMethod',
    title: 'How is order fulfillment or production scheduling managed?',
    subtitle: 'Question 7 of 10 — Schedule Controls',
    type: 'cards',
    options: [
      { value: 'Automated ERP Schedule', label: 'Automated Custom ERP', desc: 'Real-time production scheduling' },
      { value: 'Spreadsheets', label: 'Excel / Google Sheets', desc: 'Shared files edited manually' },
      { value: 'Whiteboard & Paper', label: 'Whiteboard & Paper', desc: 'Physical floor boards and clipboards' },
    ],
  },
  {
    id: 'revenueRange',
    title: 'What is your approximate monthly revenue range?',
    subtitle: 'Question 8 of 10 — Scale Context',
    type: 'cards',
    options: [
      { value: 'Under $50k / mo', label: 'Under $50k / month', desc: 'Early-stage growth' },
      { value: '$50k - $200k / mo', label: '$50k – $200k / month', desc: 'Scaling operations' },
      { value: '$200k - $1M / mo', label: '$200k – $1M / month', desc: 'Mid-market business' },
      { value: '$1M+ / mo', label: '$1M+ / month', desc: 'High-volume operation' },
    ],
  },
  {
    id: 'headache',
    title: 'What is your single biggest operational bottleneck?',
    subtitle: 'Question 9 of 10 — Primary Drag',
    type: 'cards',
    options: [
      { value: 'High Admin Overhead & Double Data Entry', label: 'Manual Admin Drag', desc: 'Re-entering data between tools' },
      { value: 'Inventory Miscounts & Order Errors', label: 'Fulfillment & Stock Errors', desc: 'Shipping mistakes and stockouts' },
      { value: 'Reporting Lag & No Real-Time Profit View', label: 'Reporting & Profit Lag', desc: 'Decisions delayed by old data' },
      { value: 'Customer Inquiry Overload', label: 'Customer Status Overload', desc: '"Where is my order?" inquiries' },
    ],
  },
  {
    id: 'automationLevel',
    title: 'What is your current level of operational software automation?',
    subtitle: 'Question 10 of 10 — Technology Baseline',
    type: 'cards',
    options: [
      { value: 'Zero Automation', label: 'Zero Automation', desc: '100% manual employee execution' },
      { value: 'Basic Zapier / Manual Scripts', label: 'Basic Zapier / Scripts', desc: 'Fragile third-party glue' },
      { value: 'Custom In-House Systems', label: 'Custom ERP / Pipelines', desc: 'Dedicated operational software' },
    ],
  },
];

export default function OperationalScan() {
  const [targetUrl, setTargetUrl] = useState('');
  const [scanStep, setScanStep] = useState<number>(0); // 0: landing preview, 1: scanning steps, 2: detected + questions, 3: ungated score, 4: gated report
  const [stagedIndex, setStagedIndex] = useState(0);
  const [detectedProfile, setDetectedProfile] = useState<DetectedProfile | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<ScanAnswers>(defaultAnswers);
  const [score, setScore] = useState(52);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [dollarGapRange, setDollarGapRange] = useState({ min: 42000, max: 58000 });
  const [email, setEmail] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [unlockedReport, setUnlockedReport] = useState<any>(null);

  // Staged scanning animation sequence
  const stagedSteps = [
    'Reading site structure & public HTML headers...',
    'Detecting platform & technology stack...',
    'Analyzing customer touchpoints & content signals...',
    'Calculating baseline Efficiency Score...',
  ];

  const handleStartScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetUrl.trim()) return;

    setScanStep(1);
    setStagedIndex(0);

    // Fetch site data in parallel with staged steps
    let detectedData: DetectedProfile = {
      platform: 'Custom Web Platform',
      catalogSize: 'Mid-Scale Digital Footprint',
      serviceChannels: 'Standard Contact Form & Email',
      freshness: 'Active Production Signals',
    };

    try {
      const res = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: targetUrl.trim() }),
      });
      const data = await res.json();
      if (res.ok && data.detected) {
        detectedData = data.detected;
      }
    } catch {
      // Graceful fallback
    }

    setDetectedProfile(detectedData);

    // Staged step timers
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < stagedSteps.length) {
        setStagedIndex(step);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setScanStep(2);
          setCurrentQuestionIndex(0);
        }, 600);
      }
    }, 900);
  };

  const handleAnswerSelect = (field: keyof ScanAnswers, value: any) => {
    const nextAnswers = { ...answers, [field]: value };
    setAnswers(nextAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // All 10 questions answered -> Calculate final score & dollar gap
      calculateFinalResults(nextAnswers);
      setScanStep(3);
    }
  };

  const calculateFinalResults = (finalAnswers: ScanAnswers) => {
    const salary = 70000;
    const hourly = salary / 2080;
    const annualCost = finalAnswers.teamMembers * finalAnswers.hoursPerWeek * hourly * 52;

    const minGap = Math.round(annualCost * 0.7);
    const maxGap = Math.round(annualCost * 1.1);
    setDollarGapRange({ min: minGap, max: maxGap });

    // Weighted Score Formula (40-65 target for standard visitors)
    let baseScore = 80;
    baseScore -= finalAnswers.teamMembers * 3.5;
    baseScore -= finalAnswers.hoursPerWeek * 1.2;
    baseScore -= finalAnswers.disconnectedTools * 2.5;

    if (finalAnswers.inventorySync.includes('Manual')) baseScore -= 8;
    if (finalAnswers.commChannel.includes('WhatsApp')) baseScore -= 5;
    if (finalAnswers.schedulingMethod.includes('Spreadsheets')) baseScore -= 10;
    if (finalAnswers.automationLevel.includes('Zero')) baseScore -= 12;

    const finalCalculatedScore = Math.max(28, Math.min(88, Math.round(baseScore)));
    setScore(finalCalculatedScore);
  };

  // Count-up score animation effect
  useEffect(() => {
    if (scanStep === 3) {
      let current = 0;
      const duration = 1200;
      const stepTime = Math.abs(Math.floor(duration / score));
      const timer = setInterval(() => {
        current += 1;
        setAnimatedScore(current);
        if (current >= score) {
          clearInterval(timer);
        }
      }, Math.max(stepTime, 15));
      return () => clearInterval(timer);
    }
  }, [scanStep, score]);

  const generatePDFReport = async (
    targetEmail: string,
    recs: { rec1: string; rec2: string; rec3: string }
  ) => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595.28, 841.89]); // A4
    const { height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    // Background
    page.drawRectangle({
      x: 0,
      y: 0,
      width: 595.28,
      height: 841.89,
      color: rgb(0.04, 0.04, 0.04), // #0A0A0A
    });

    // Gold Top Border Line
    page.drawRectangle({
      x: 40,
      y: height - 40,
      width: 515.28,
      height: 4,
      color: rgb(0.79, 0.66, 0.3), // #C9A84C
    });

    // Title
    page.drawText('OPERATIONAL SCAN REPORT', {
      x: 40,
      y: height - 75,
      size: 20,
      font: fontBold,
      color: rgb(0.96, 0.96, 0.94),
    });

    page.drawText(`Prepared for: ${targetEmail} | Domain: ${targetUrl || 'Client Site'}`, {
      x: 40,
      y: height - 95,
      size: 10,
      font,
      color: rgb(0.79, 0.66, 0.3),
    });

    // Score Card Box
    page.drawRectangle({
      x: 40,
      y: height - 200,
      width: 515.28,
      height: 85,
      color: rgb(0.07, 0.07, 0.07),
      borderColor: rgb(0.14, 0.14, 0.14),
      borderWidth: 1,
    });

    page.drawText('EFFICIENCY SCORE', {
      x: 60,
      y: height - 140,
      size: 9,
      font: fontBold,
      color: rgb(0.6, 0.6, 0.6),
    });

    page.drawText(`${score} / 100`, {
      x: 60,
      y: height - 180,
      size: 32,
      font: fontBold,
      color: rgb(0.79, 0.66, 0.3),
    });

    page.drawText(`Estimated Annual Drag: $${dollarGapRange.min.toLocaleString()} - $${dollarGapRange.max.toLocaleString()}`, {
      x: 240,
      y: height - 160,
      size: 12,
      font: fontBold,
      color: rgb(0.96, 0.96, 0.94),
    });

    // Recommendations Section
    page.drawText('3 HIGH-IMPACT AUTOMATION ACTION ITEMS:', {
      x: 40,
      y: height - 240,
      size: 12,
      font: fontBold,
      color: rgb(0.96, 0.96, 0.94),
    });

    const recommendationsList = [
      `1. ${recs.rec1}`,
      `2. ${recs.rec2}`,
      `3. ${recs.rec3}`,
    ];

    let currentY = height - 275;
    recommendationsList.forEach((rec) => {
      page.drawText(rec.slice(0, 85), {
        x: 40,
        y: currentY,
        size: 10,
        font,
        color: rgb(0.8, 0.8, 0.8),
      });
      currentY -= 30;
    });

    // Industry Context Paragraph
    const ctx = INDUSTRY_CONTEXTS[answers.sector] || INDUSTRY_CONTEXTS.manufacturing;
    page.drawText('SECTOR CONTEXT:', {
      x: 40,
      y: currentY - 20,
      size: 11,
      font: fontBold,
      color: rgb(0.79, 0.66, 0.3),
    });

    page.drawText(ctx.commentary.slice(0, 110), {
      x: 40,
      y: currentY - 45,
      size: 9.5,
      font,
      color: rgb(0.7, 0.7, 0.7),
    });

    // Footer
    page.drawText('Engineered by Arslan Rehmani | Operational AI Systems Builder | arslanrehmani.com', {
      x: 40,
      y: 40,
      size: 9,
      font,
      color: rgb(0.5, 0.5, 0.5),
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = `Operational-Scan-Report-${targetUrl || 'Analysis'}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleUnlockReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return;

    setIsGenerating(true);

    const recs = {
      rec1: `Replace manual ${answers.schedulingMethod} with a custom Next.js operational portal to eliminate double data entry.`,
      rec2: `Automate ${answers.inventorySync} via unified API background pipelines for real-time inventory visibility.`,
      rec3: `Deploy automated daily AI executive briefings to track operational drag without manual report compilation.`,
    };

    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          source: 'operational-scan',
          source_tool: 'operational_scan',
          tool_data: {
            url: targetUrl,
            score,
            dollarGapRange,
            answers,
            detectedProfile,
          },
        }),
      });
    } catch {
      // Graceful fallback
    }

    setUnlockedReport(recs);
    await generatePDFReport(email.trim(), recs);
    setIsGenerating(false);
    setScanStep(4);
  };

  return (
    <section className="bg-bg-primary py-20 md:py-32 border-y border-border-color relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Eyebrow & Title */}
        <div className="max-w-3xl mb-12">
          <span className="eyebrow mb-3">Homepage Flagship Scanner</span>
          <h2 className="headline text-3xl md:text-5xl leading-[1.1]">
            Run an Operational Scan on your business.
          </h2>
          <p className="text-base md:text-lg text-text-muted leading-relaxed mt-4">
            Detect your technology stack, expose manual administrative drag, and calculate your annual efficiency gap in under 90 seconds.
          </p>
        </div>

        {/* STEP 0: Initial URL Input + Animated Sample Analysis Preview */}
        {scanStep === 0 && (
          <div className="space-y-8">
            <form onSubmit={handleStartScan} className="max-w-3xl">
              <div className="flex flex-col sm:flex-row gap-3 p-2 bg-bg-secondary border border-border-color hover:border-border-gold rounded-2xl transition-colors">
                <div className="relative flex-1 flex items-center px-4">
                  <Search className="w-5 h-5 text-accent-gold shrink-0 mr-3" />
                  <label htmlFor="homepage-scan-url" className="sr-only">Website URL</label>
                  <input
                    id="homepage-scan-url"
                    type="text"
                    required
                    placeholder="Enter your website URL (e.g. company.com)"
                    value={targetUrl}
                    onChange={(e) => setTargetUrl(e.target.value)}
                    className="w-full bg-transparent text-text-primary text-base placeholder:text-text-subtle focus:outline-none py-3"
                  />
                </div>
                <button
                  type="submit"
                  className="btn-primary !px-8 !py-4 shrink-0 flex items-center justify-center gap-2"
                >
                  <span>Scan My Business</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Payoff Before Input: Sample Live Analysis Preview */}
            <div className="bg-bg-secondary border border-border-color rounded-2xl p-6 md:p-8 max-w-4xl relative overflow-hidden">
              <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-border-color">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-mono text-text-subtle uppercase tracking-wider">
                    Live Sample Scan Preview
                  </span>
                </div>
                <span className="text-xs font-mono text-accent-gold bg-accent-gold-dim border border-border-gold px-2.5 py-1 rounded-full">
                  Target: apex-textiles.com (Example)
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-bg-primary/80 border border-border-color p-4 rounded-xl">
                  <span className="text-[11px] font-mono text-text-subtle uppercase block mb-1">Detected Stack</span>
                  <span className="text-sm font-bold text-text-primary font-mono block">Shopify + Custom API</span>
                </div>
                <div className="bg-bg-primary/80 border border-border-color p-4 rounded-xl">
                  <span className="text-[11px] font-mono text-text-subtle uppercase block mb-1">Estimated Annual Drag</span>
                  <span className="text-sm font-bold text-accent-gold font-mono block">$48,500 / year</span>
                </div>
                <div className="bg-bg-primary/80 border border-border-color p-4 rounded-xl">
                  <span className="text-[11px] font-mono text-text-subtle uppercase block mb-1">Sample Score</span>
                  <span className="text-sm font-bold text-amber-400 font-mono block">52 / 100 (Moderate Drag)</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-text-subtle pt-2">
                <span>Enter your URL above to run this analysis live on your domain.</span>
                <span className="font-mono text-accent-gold">90-Sec Automated Scan →</span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 1: Staged Scan Sequence with Animated Checkmarks */}
        {scanStep === 1 && (
          <div className="bg-bg-secondary border border-border-color rounded-2xl p-8 md:p-12 max-w-2xl mx-auto text-center space-y-8">
            <div className="flex justify-center">
              <span className="w-16 h-16 rounded-full bg-accent-gold-dim border border-border-gold flex items-center justify-center text-accent-gold animate-spin">
                <RefreshCw className="w-8 h-8" />
              </span>
            </div>
            <div>
              <span className="eyebrow mb-2 justify-center">Automated Scanner</span>
              <h3 className="headline text-2xl text-text-primary">
                Analyzing {targetUrl}...
              </h3>
            </div>

            <div className="space-y-4 text-left max-w-md mx-auto">
              {stagedSteps.map((stepText, idx) => (
                <div
                  key={stepText}
                  className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all duration-300 ${
                    idx <= stagedIndex
                      ? 'bg-bg-primary border-border-gold text-text-primary'
                      : 'bg-bg-primary/40 border-border-color/50 text-text-subtle opacity-50'
                  }`}
                >
                  {idx <= stagedIndex ? (
                    <CheckCircle2 className="w-5 h-5 text-accent-gold shrink-0" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border border-border-color shrink-0" />
                  )}
                  <span className="text-xs font-mono">{stepText}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: Detected Profile & 10 Single-Question-at-a-Time Refinement Flow */}
        {scanStep === 2 && (
          <div className="space-y-8 max-w-3xl mx-auto">
            {/* Detected Profile Cards */}
            {detectedProfile && (
              <div className="bg-bg-secondary border border-border-color rounded-2xl p-6">
                <span className="text-xs font-bold text-accent-gold uppercase tracking-wider block mb-3">
                  Here is what we detected about your site ({targetUrl}):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="bg-bg-primary border border-border-color p-3 rounded-xl">
                    <span className="text-[10px] text-text-subtle uppercase block">Platform</span>
                    <span className="text-xs font-bold text-text-primary font-mono">{detectedProfile.platform}</span>
                  </div>
                  <div className="bg-bg-primary border border-border-color p-3 rounded-xl">
                    <span className="text-[10px] text-text-subtle uppercase block">Catalog Footprint</span>
                    <span className="text-xs font-bold text-text-primary font-mono">{detectedProfile.catalogSize}</span>
                  </div>
                  <div className="bg-bg-primary border border-border-color p-3 rounded-xl">
                    <span className="text-[10px] text-text-subtle uppercase block">Service Channels</span>
                    <span className="text-xs font-bold text-text-primary font-mono">{detectedProfile.serviceChannels}</span>
                  </div>
                  <div className="bg-bg-primary border border-border-color p-3 rounded-xl">
                    <span className="text-[10px] text-text-subtle uppercase block">Content Signals</span>
                    <span className="text-xs font-bold text-text-primary font-mono">{detectedProfile.freshness}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Single Question Focused Container */}
            <div className="bg-bg-secondary border border-border-color rounded-2xl p-8 md:p-10 space-y-8">
              {/* Progress Bar */}
              <div>
                <div className="flex justify-between items-center text-xs font-mono text-text-subtle mb-2">
                  <span>{questions[currentQuestionIndex].subtitle}</span>
                  <span>{currentQuestionIndex + 1} / 10</span>
                </div>
                <div className="w-full bg-bg-primary rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-accent-gold h-full transition-all duration-300"
                    style={{ width: `${((currentQuestionIndex + 1) / 10) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question Title */}
              <h3 className="headline text-xl md:text-2xl text-text-primary">
                {questions[currentQuestionIndex].title}
              </h3>

              {/* Question Input: Sliders vs Visual Option Cards */}
              {questions[currentQuestionIndex].type === 'slider' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-black font-sans text-accent-gold">
                      {answers[questions[currentQuestionIndex].id as keyof ScanAnswers] as number}{' '}
                      <span className="text-sm font-normal text-text-muted">{questions[currentQuestionIndex].unit}</span>
                    </span>
                  </div>
                  <input
                    type="range"
                    min={questions[currentQuestionIndex].min}
                    max={questions[currentQuestionIndex].max}
                    step={questions[currentQuestionIndex].step}
                    value={answers[questions[currentQuestionIndex].id as keyof ScanAnswers] as number}
                    onChange={(e) =>
                      setAnswers({
                        ...answers,
                        [questions[currentQuestionIndex].id]: Number(e.target.value),
                      })
                    }
                    className="w-full h-2 bg-bg-primary rounded-lg appearance-none cursor-pointer accent-accent-gold"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      handleAnswerSelect(
                        questions[currentQuestionIndex].id as keyof ScanAnswers,
                        answers[questions[currentQuestionIndex].id as keyof ScanAnswers]
                      )
                    }
                    className="btn-primary w-full !py-3 !text-xs"
                  >
                    Confirm & Next →
                  </button>
                </div>
              )}

              {questions[currentQuestionIndex].type === 'cards' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {questions[currentQuestionIndex].options?.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() =>
                        handleAnswerSelect(questions[currentQuestionIndex].id as keyof ScanAnswers, opt.value)
                      }
                      className="text-left bg-bg-primary hover:bg-bg-primary/80 border border-border-color hover:border-border-gold rounded-xl p-5 transition-all group"
                    >
                      <span className="block text-sm font-bold text-text-primary group-hover:text-accent-gold transition-colors">
                        {opt.label}
                      </span>
                      <span className="block text-xs text-text-muted mt-1 leading-relaxed">
                        {opt.desc}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 3: Instant Ungated Score & Annual Dollar Gap Reveal */}
        {scanStep === 3 && (
          <div className="bg-bg-secondary border border-border-color rounded-2xl p-8 md:p-12 max-w-3xl mx-auto text-center space-y-8">
            <span className="eyebrow justify-center mb-2">Scan Results</span>
            <h3 className="headline text-3xl md:text-4xl text-text-primary">
              Your Operational Efficiency Baseline
            </h3>

            {/* Score Count-Up Card */}
            <div className="bg-bg-primary border border-border-color rounded-2xl p-8 max-w-sm mx-auto">
              <span className="text-xs font-mono text-text-subtle uppercase block mb-2">Efficiency Score</span>
              <span className={`text-6xl md:text-7xl font-black font-sans block ${score < 40 ? 'text-red-400' : score < 70 ? 'text-accent-gold' : 'text-emerald-400'}`}>
                {animatedScore}
              </span>
              <span className="text-xs text-text-muted mt-2 block">
                {score < 40 ? 'High Operational Drag' : score < 70 ? 'Moderate Administrative Drag' : 'Optimized Workflow'}
              </span>
            </div>

            {/* Dollar Gap Calculation Box */}
            <div className="bg-bg-primary/80 border border-border-gold/50 rounded-2xl p-6 text-left max-w-xl mx-auto space-y-2">
              <span className="text-xs font-bold text-accent-gold uppercase tracking-wider block">Estimated Financial Overhead</span>
              <p className="text-lg md:text-xl font-bold text-text-primary">
                Based on your scan, businesses like yours lose approximately{' '}
                <span className="text-accent-gold font-sans">${dollarGapRange.min.toLocaleString()} – ${dollarGapRange.max.toLocaleString()}</span> annually to manual operational drag.
              </p>
            </div>

            {/* Gating Gate Form */}
            <div className="bg-bg-primary border border-border-color rounded-2xl p-6 md:p-8 max-w-xl mx-auto text-left space-y-4">
              <h4 className="headline text-lg text-text-primary">
                Unlock Your 3 High-Impact Automation Recommendations
              </h4>
              <p className="text-xs text-text-muted leading-relaxed">
                Enter your work email to view your personalized recommendations on screen and download the PDF report instantly.
              </p>

              <form onSubmit={handleUnlockReport} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  placeholder="your.email@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-bg-secondary border border-border-color rounded-xl px-4 py-3 text-xs text-text-primary focus:border-accent-gold focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="btn-primary !px-6 !py-3 !text-xs shrink-0 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isGenerating ? 'Generating Report...' : 'Unlock & Download PDF'}
                  <Download className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        )}

        {/* STEP 4: Gated Report On-Screen Display */}
        {scanStep === 4 && unlockedReport && (
          <div className="bg-bg-secondary border border-border-color rounded-2xl p-8 md:p-12 max-w-3xl mx-auto space-y-8">
            <div className="flex items-center justify-between pb-6 border-b border-border-color">
              <div>
                <span className="eyebrow mb-1">Full Report Unlocked</span>
                <h3 className="headline text-2xl text-text-primary">
                  Recommended Action Plan
                </h3>
              </div>
              <span className="text-xs text-accent-gold font-mono bg-accent-gold-dim border border-border-gold px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                <Check className="w-4 h-4" /> PDF Downloaded
              </span>
            </div>

            <div className="space-y-4">
              <div className="bg-bg-primary border border-border-color p-5 rounded-xl">
                <span className="text-xs font-mono text-accent-gold font-bold uppercase block mb-1">01 / Priority Action</span>
                <p className="text-sm text-text-primary font-semibold">{unlockedReport.rec1}</p>
              </div>
              <div className="bg-bg-primary border border-border-color p-5 rounded-xl">
                <span className="text-xs font-mono text-accent-gold font-bold uppercase block mb-1">02 / Pipeline Action</span>
                <p className="text-sm text-text-primary font-semibold">{unlockedReport.rec2}</p>
              </div>
              <div className="bg-bg-primary border border-border-color p-5 rounded-xl">
                <span className="text-xs font-mono text-accent-gold font-bold uppercase block mb-1">03 / Executive Briefing Action</span>
                <p className="text-sm text-text-primary font-semibold">{unlockedReport.rec3}</p>
              </div>
            </div>

            <div className="pt-6 border-t border-border-color flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-text-muted">Want to walk through implementing these systems?</span>
              <a href="/contact" className="btn-primary !px-6 !py-3 !text-xs shrink-0">
                Book a 30-Min Discovery Call →
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
