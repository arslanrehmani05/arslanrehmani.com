// app/api/calculator/route.ts
import { NextResponse } from 'next/server';
import { insertToolSubmission } from '@/lib/supabase';

// Helper to perform local mock calculations
function performLocalCalculations(headcount: number, manualHours: number, averageSalary: number) {
  // 2080 is the standard working hours in a year for full-time employees
  const hourlyRate = averageSalary / 2080;
  
  // Calculate current manual cost
  const currentWeeklyCost = headcount * manualHours * hourlyRate;
  const currentAnnualCost = currentWeeklyCost * 52;
  
  // Under automation, we reduce manual time by 85%
  const automatedManualHours = manualHours * 0.15;
  const automatedWeeklyCost = headcount * automatedManualHours * hourlyRate;
  const automatedAnnualLaborCost = automatedWeeklyCost * 52;
  
  // Add estimated SaaS platform subscription overhead
  const platformOverhead = 2400; 
  const automatedAnnualCost = automatedAnnualLaborCost + platformOverhead;
  
  // Net Savings
  const annualSavings = Math.max(0, currentAnnualCost - automatedAnnualCost);
  
  // Estimated custom agency system development investment
  const customDevInvestment = 15000;
  
  // Payback period (in months)
  const paybackPeriodMonths = annualSavings > 0 
    ? parseFloat(((customDevInvestment / annualSavings) * 12).toFixed(1)) 
    : 0;

  return {
    currentAnnualCost: Math.round(currentAnnualCost),
    automatedAnnualCost: Math.round(automatedAnnualCost),
    annualSavings: Math.round(annualSavings),
    paybackPeriod: paybackPeriodMonths <= 12 ? `${paybackPeriodMonths} months` : `${(paybackPeriodMonths/12).toFixed(1)} years`,
    roiPercent: annualSavings > 0 ? Math.round((annualSavings / customDevInvestment) * 100) : 0,
    devInvestment: customDevInvestment
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { headcount, manualHours, averageSalary, email } = body;

    if (headcount === undefined || manualHours === undefined || averageSalary === undefined) {
      return NextResponse.json({ error: 'All input parameters are required' }, { status: 400 });
    }

    const hc = parseFloat(headcount);
    const mh = parseFloat(manualHours);
    const sal = parseFloat(averageSalary);

    const apiKey = process.env.ANTHROPIC_API_KEY;
    let calculationReport;

    if (apiKey && apiKey !== 'placeholder-key') {
      try {
        const prompt = `Perform an ROI analysis for automating operational processes. Here are the inputs:
        - Headcount affected: ${hc}
        - Manual hours per week per head: ${mh}
        - Average annual salary per head: ${sal}
        
        Calculate current manual labor cost per year vs automated execution cost (assume 85% time reduction, plus $2,400/yr systems maintenance cost). Estimate custom agency development setup at $15,000.
        
        Return ONLY a JSON object with this exact structure:
        {
          "currentAnnualCost": number,
          "automatedAnnualCost": number,
          "annualSavings": number,
          "paybackPeriod": "string (e.g. '3.2 months')",
          "roiPercent": number (percentage),
          "devInvestment": number
        }`;

        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01',
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 1000,
            messages: [{ role: 'user', content: prompt }],
          }),
        });

        if (response.ok) {
          const resJson = await response.json();
          const responseText = resJson.content[0]?.text || '{}';
          calculationReport = JSON.parse(responseText);
        } else {
          throw new Error('Claude API error status: ' + response.status);
        }
      } catch (err) {
        console.warn('Claude API request failed, falling back to local calculation:', err);
        calculationReport = performLocalCalculations(hc, mh, sal);
      }
    } else {
      calculationReport = performLocalCalculations(hc, mh, sal);
    }

    // Save lead calculation to Supabase
    await insertToolSubmission('Automation ROI Calculator', { headcount: hc, manualHours: mh, averageSalary: sal }, JSON.stringify(calculationReport), email);

    return NextResponse.json({ success: true, report: calculationReport });
  } catch (error: any) {
    console.error('Error in calculator API:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
