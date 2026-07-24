// app/api/calculator/route.ts
import { NextResponse } from 'next/server';
import { calculateRoi, CostBracket, COST_BRACKET_SALARY } from '@/lib/calculators/roi';
import { INDUSTRY_CONTEXT, Industry } from '@/lib/calculators/industry-context';
import { generateRoiReportPdf } from '@/lib/pdf/roi-report';
import { insertLead } from '@/lib/supabase';

function isValidCostBracket(value: unknown): value is CostBracket {
  return typeof value === 'string' && value in COST_BRACKET_SALARY;
}

function isValidIndustry(value: unknown): value is Industry {
  return typeof value === 'string' && value in INDUSTRY_CONTEXT;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { teamMembers, hoursPerWeek, costBracket, industry, email } = body;

    const tm = Number(teamMembers);
    const hpw = Number(hoursPerWeek);

    if (!Number.isFinite(tm) || tm < 1) {
      return NextResponse.json({ error: 'teamMembers must be a number >= 1' }, { status: 400 });
    }
    if (!Number.isFinite(hpw) || hpw < 0) {
      return NextResponse.json({ error: 'hoursPerWeek must be a number >= 0' }, { status: 400 });
    }
    if (!isValidCostBracket(costBracket)) {
      return NextResponse.json({ error: 'Invalid costBracket' }, { status: 400 });
    }
    if (!isValidIndustry(industry)) {
      return NextResponse.json({ error: 'Invalid industry' }, { status: 400 });
    }
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }

    const inputs = { teamMembers: tm, hoursPerWeek: hpw, costBracket };
    const results = calculateRoi(inputs);
    const industryContext = INDUSTRY_CONTEXT[industry];

    const pdfBytes = await generateRoiReportPdf({ inputs, results, industry: industryContext });

    try {
      await insertLead(email, 'ROI Calculator PDF', {
        sourceTool: 'roi_calculator',
        toolData: { inputs, industry, results },
      });
    } catch (leadError) {
      console.error('Failed to save ROI calculator lead:', leadError);
    }

    return new NextResponse(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="roi-calculator-report.pdf"',
      },
    });
  } catch (error: any) {
    console.error('Error in calculator API:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
