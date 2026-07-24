import { PDFDocument, StandardFonts, rgb, PDFFont } from 'pdf-lib';
import { RoiCalculatorInputs, RoiCalculatorResults, COST_BRACKET_LABELS } from '@/lib/calculators/roi';
import { IndustryContext } from '@/lib/calculators/industry-context';

export interface RoiReportParams {
  inputs: RoiCalculatorInputs;
  results: RoiCalculatorResults;
  industry: IndustryContext;
}

const GOLD = rgb(0.788, 0.659, 0.298); // #C9A84C
const INK = rgb(0.09, 0.09, 0.09);
const MUTED = rgb(0.4, 0.4, 0.4);
const PAGE_WIDTH = 612; // US Letter, points
const PAGE_HEIGHT = 792;
const MARGIN = 56;

function formatCurrency(value: number): string {
  return `$${value.toLocaleString('en-US')}`;
}

export async function generateRoiReportPdf(params: RoiReportParams): Promise<Uint8Array> {
  const { inputs, results, industry } = params;

  const doc = await PDFDocument.create();
  const page = doc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const regular = await doc.embedFont(StandardFonts.Helvetica);

  let y = PAGE_HEIGHT - MARGIN;

  const drawLine = (
    text: string,
    opts: { font?: PDFFont; size?: number; color?: ReturnType<typeof rgb>; gap?: number }
  ) => {
    const font = opts.font ?? regular;
    const size = opts.size ?? 11;
    page.drawText(text, { x: MARGIN, y, size, font, color: opts.color ?? INK });
    y -= opts.gap ?? size + 8;
  };

  drawLine('ROI CALCULATOR REPORT', { font: bold, size: 12, color: GOLD, gap: 20 });
  drawLine('Arslan Rehmani — Operational AI Systems', { size: 10, color: MUTED, gap: 32 });

  drawLine(`Industry: ${industry.label}`, { font: bold, size: 13, gap: 24 });

  drawLine('Your Inputs', { font: bold, size: 13, color: GOLD, gap: 20 });
  drawLine(`Team members on manual work: ${inputs.teamMembers}`, { gap: 16 });
  drawLine(`Hours per week per person: ${inputs.hoursPerWeek}`, { gap: 16 });
  drawLine(`Cost bracket: ${COST_BRACKET_LABELS[inputs.costBracket]}`, { gap: 32 });

  drawLine('Results', { font: bold, size: 13, color: GOLD, gap: 20 });
  drawLine(`Current annual cost: ${formatCurrency(results.currentAnnualCost)}`, { gap: 16 });
  drawLine(`Projected annual cost after automation: ${formatCurrency(results.automatedAnnualCost)}`, { gap: 16 });
  drawLine(`Annual savings: ${formatCurrency(results.annualSavings)}`, { font: bold, size: 14, color: GOLD, gap: 16 });
  drawLine(`Estimated payback period: ${results.paybackPeriodMonths} months`, { gap: 32 });

  drawLine(`${industry.label} Context`, { font: bold, size: 13, color: GOLD, gap: 20 });

  const words = industry.paragraph.split(' ');
  const maxCharsPerLine = 78;
  let line = '';
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (candidate.length > maxCharsPerLine) {
      drawLine(line, { size: 10, color: MUTED, gap: 15 });
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) drawLine(line, { size: 10, color: MUTED, gap: 15 });

  y -= 8;
  drawLine(
    `Typical automation reduction in this range: ${industry.automationReductionRange} of current manual hours.`,
    { size: 10, color: MUTED, gap: 24 }
  );

  drawLine('Want to talk through what this looks like for your business?', { font: bold, size: 12, gap: 16 });
  drawLine('arslanrehmani.com/contact', { size: 11, color: GOLD, gap: 16 });

  return doc.save();
}
