import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { calculateRoi, CostBracket } from '@/lib/calculators/roi';
import { INDUSTRY_CONTEXTS, IndustryType } from '@/lib/calculators/industry-context';

export async function POST(req: NextRequest) {
  try {
    const { teamMembers, hoursPerWeek, costBracket, industry, email } = await req.json();

    const roi = calculateRoi({
      teamMembers: Number(teamMembers) || 3,
      hoursPerWeek: Number(hoursPerWeek) || 15,
      costBracket: (costBracket as CostBracket) || '60_80k',
    });

    const indContext = INDUSTRY_CONTEXTS[industry as IndustryType] || INDUSTRY_CONTEXTS.manufacturing;

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
      color: rgb(0.06, 0.06, 0.07),
    });

    // Top gold line
    page.drawRectangle({
      x: 40,
      y: height - 40,
      width: 515.28,
      height: 3,
      color: rgb(0.94, 0.94, 0.95),
    });

    page.drawText('OPERATIONAL ROI & AUTOMATION AUDIT', {
      x: 40,
      y: height - 75,
      size: 18,
      font: fontBold,
      color: rgb(0.94, 0.94, 0.95),
    });

    page.drawText(`Prepared for: ${email || 'Executive Inquiry'} | Sector: ${indContext.label}`, {
      x: 40,
      y: height - 95,
      size: 10,
      font,
      color: rgb(0.65, 0.65, 0.7),
    });

    // Summary Box
    page.drawRectangle({
      x: 40,
      y: height - 210,
      width: 515.28,
      height: 95,
      color: rgb(0.1, 0.1, 0.12),
      borderColor: rgb(0.2, 0.2, 0.24),
      borderWidth: 1,
    });

    page.drawText('PROJECTED ANNUAL SAVINGS', {
      x: 60,
      y: height - 145,
      size: 9,
      font: fontBold,
      color: rgb(0.6, 0.6, 0.65),
    });

    page.drawText(`$${roi.annualSavings.toLocaleString()} / year`, {
      x: 60,
      y: height - 180,
      size: 28,
      font: fontBold,
      color: rgb(0.94, 0.94, 0.95),
    });

    page.drawText(`Current Manual Overhead: $${roi.currentAnnualCost.toLocaleString()}/yr`, {
      x: 280,
      y: height - 150,
      size: 11,
      font,
      color: rgb(0.8, 0.8, 0.8),
    });

    page.drawText(`Estimated Payback Period: ~${roi.paybackPeriodMonths} Months`, {
      x: 280,
      y: height - 175,
      size: 11,
      font: fontBold,
      color: rgb(0.3, 0.8, 0.5),
    });

    // Sector Analysis
    page.drawText('SECTOR OPERATIONAL LEAKAGE ANALYSIS:', {
      x: 40,
      y: height - 250,
      size: 12,
      font: fontBold,
      color: rgb(0.94, 0.94, 0.95),
    });

    page.drawText(indContext.commentary, {
      x: 40,
      y: height - 280,
      size: 10,
      font,
      color: rgb(0.75, 0.75, 0.75),
    });

    page.drawText(`Typical Leakage Points: ${indContext.typicalLeakage}`, {
      x: 40,
      y: height - 315,
      size: 10,
      font,
      color: rgb(0.85, 0.85, 0.85),
    });

    page.drawText(`Target Architecture: ${indContext.commonTarget}`, {
      x: 40,
      y: height - 345,
      size: 10,
      font: fontBold,
      color: rgb(0.94, 0.94, 0.95),
    });

    page.drawText('Engineered by Arslan Rehmani | arslanrehmani.com', {
      x: 40,
      y: 40,
      size: 9,
      font,
      color: rgb(0.5, 0.5, 0.5),
    });

    const pdfBytes = await pdfDoc.save();

    return new NextResponse(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="ROI-Report.pdf"`,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 });
  }
}
