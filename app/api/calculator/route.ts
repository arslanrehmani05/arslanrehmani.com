// app/api/calculator/route.ts
import { NextResponse } from 'next/server';
import { calculateRoi, CostBracket } from '@/lib/calculators/roi';
import { INDUSTRY_CONTEXTS, IndustryType } from '@/lib/calculators/industry-context';
import { insertLead } from '@/lib/supabase';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { teamMembers, hoursPerWeek, costBracket, industry, email } = body;

    if (!teamMembers || !hoursPerWeek || !costBracket || !email) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    const results = calculateRoi({
      teamMembers: Number(teamMembers),
      hoursPerWeek: Number(hoursPerWeek),
      costBracket: costBracket as CostBracket,
    });

    const indContext = INDUSTRY_CONTEXTS[industry as IndustryType] || INDUSTRY_CONTEXTS.manufacturing;

    // Generate PDF
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595.28, 841.89]);
    const { height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    page.drawRectangle({
      x: 0,
      y: 0,
      width: 595.28,
      height: 841.89,
      color: rgb(0.04, 0.04, 0.04),
    });

    page.drawRectangle({
      x: 40,
      y: height - 40,
      width: 515.28,
      height: 4,
      color: rgb(0.79, 0.66, 0.3),
    });

    page.drawText('OPERATIONAL ROI BREAKDOWN REPORT', {
      x: 40,
      y: height - 75,
      size: 18,
      font: fontBold,
      color: rgb(0.96, 0.96, 0.94),
    });

    page.drawText(`Prepared for: ${email} | Industry: ${indContext.label}`, {
      x: 40,
      y: height - 95,
      size: 10,
      font,
      color: rgb(0.79, 0.66, 0.3),
    });

    // Results Card
    page.drawRectangle({
      x: 40,
      y: height - 210,
      width: 515.28,
      height: 100,
      color: rgb(0.07, 0.07, 0.07),
      borderColor: rgb(0.14, 0.14, 0.14),
      borderWidth: 1,
    });

    page.drawText('PROJECTED ANNUAL SAVINGS', {
      x: 60,
      y: height - 135,
      size: 9,
      font: fontBold,
      color: rgb(0.6, 0.6, 0.6),
    });

    page.drawText(`$${results.annualSavings.toLocaleString()} / year`, {
      x: 60,
      y: height - 170,
      size: 28,
      font: fontBold,
      color: rgb(0.79, 0.66, 0.3),
    });

    page.drawText(`Current Manual Cost: $${results.currentAnnualCost.toLocaleString()}/yr`, {
      x: 270,
      y: height - 145,
      size: 10,
      font,
      color: rgb(0.8, 0.8, 0.8),
    });

    page.drawText(`Post-Automation Cost: $${results.automatedAnnualCost.toLocaleString()}/yr`, {
      x: 270,
      y: height - 165,
      size: 10,
      font,
      color: rgb(0.8, 0.8, 0.8),
    });

    page.drawText(`Payback Period: ${results.paybackPeriodMonths} Months`, {
      x: 270,
      y: height - 185,
      size: 10,
      font: fontBold,
      color: rgb(0.79, 0.66, 0.3),
    });

    // Industry Analysis
    page.drawText('SECTOR ANALYSIS & TYPICAL BOTTLENECKS', {
      x: 40,
      y: height - 240,
      size: 11,
      font: fontBold,
      color: rgb(0.96, 0.96, 0.94),
    });

    page.drawText(indContext.typicalDrag, {
      x: 40,
      y: height - 265,
      size: 9.5,
      font,
      color: rgb(0.7, 0.7, 0.7),
    });

    page.drawText('AUTOMATION OPPORTUNITY:', {
      x: 40,
      y: height - 300,
      size: 11,
      font: fontBold,
      color: rgb(0.79, 0.66, 0.3),
    });

    page.drawText(indContext.automationPotential, {
      x: 40,
      y: height - 325,
      size: 9.5,
      font,
      color: rgb(0.7, 0.7, 0.7),
    });

    page.drawText(indContext.commentary, {
      x: 40,
      y: height - 365,
      size: 9.5,
      font,
      color: rgb(0.7, 0.7, 0.7),
    });

    // Save lead to Supabase
    try {
      await insertLead(email, 'roi-calculator', {
        sourceTool: 'roi_calculator',
        toolData: {
          inputs: { teamMembers, hoursPerWeek, costBracket, industry },
          results,
        },
      });
    } catch {
      // Graceful fallback
    }

    const pdfBytes = await pdfDoc.save();
    return new NextResponse(Buffer.from(pdfBytes), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="ROI-Operational-Breakdown.pdf"',
      },
    });
  } catch (error: any) {
    console.error('Error in ROI calculator API:', error);
    return NextResponse.json({ error: error.message || 'Calculation failed' }, { status: 500 });
  }
}
