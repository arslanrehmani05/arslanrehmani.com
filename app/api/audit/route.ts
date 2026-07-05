// app/api/audit/route.ts
import { NextResponse } from 'next/server';
import { insertToolSubmission } from '@/lib/supabase';

// Helper to compile dynamic audit report based on answers when mock is active
function generateMockReport(answers: any) {
  const teamSize = parseInt(answers.teamSize) || 1;
  const reportingHours = parseInt(answers.reportingHours) || 0;
  const disconnectedTools = parseInt(answers.disconnectedTools) || 0;
  const isExcelInventory = answers.excelInventory === 'yes';
  const reconcillationMethod = answers.reconcillationMethod || 'manual';
  
  // Calculate a simulated score
  let score = 85;
  if (reportingHours > 5) score -= 15;
  if (disconnectedTools > 3) score -= 10;
  if (isExcelInventory) score -= 15;
  if (reconcillationMethod.toLowerCase().includes('manual')) score -= 15;
  if (teamSize > 5) score -= 10;
  
  score = Math.max(20, score);
  
  // Estimate waste
  const hoursWastedPerYear = (reportingHours * 52) + (isExcelInventory ? 200 : 0);
  const potentialSavings = hoursWastedPerYear * 45 * teamSize; // assume average internal cost $45/hr
  
  return {
    score,
    summary: `Your operations are currently running at ${score}% efficiency. There are significant manual loops that drain administrative resources.`,
    metrics: {
      hoursWastedPerYear,
      potentialSavings: `$${potentialSavings.toLocaleString()}`,
    },
    bottlenecks: [
      isExcelInventory ? 'Spreadsheet-based inventory tracking represents a major data synchronization bottleneck.' : null,
      reportingHours > 3 ? 'Manual reporting blocks dynamic management decisions and wastes core staff hours.' : null,
      disconnectedTools > 2 ? 'Disconnected software suites force your team to act as manual data bridges.' : null
    ].filter(Boolean),
    recommendations: [
      'Centralize core operations into a single-source database (Next.js ERP integration).',
      'Replace manual spreadsheet exports with scheduled cron jobs matching banking and order APIs.',
      'Deploy automated data bridges between your disjointed systems to eliminate manual data entry.'
    ]
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { answers, email } = body;

    if (!answers) {
      return NextResponse.json({ error: 'Answers are required' }, { status: 400 });
    }

    // Process using Anthropic if API Key is configured and not placeholder
    const apiKey = process.env.ANTHROPIC_API_KEY;
    let reportData;

    if (apiKey && apiKey !== 'placeholder-key') {
      try {
        // Prepare prompt for Claude Sonnet
        const prompt = `Analyze these 10 operational parameters for a business and provide a structured JSON audit report:
        - Team size handling operations: ${answers.teamSize}
        - Hours per week spent on manual reporting: ${answers.reportingHours}
        - Number of disconnected tools: ${answers.disconnectedTools}
        - Inventory in spreadsheets: ${answers.excelInventory}
        - How daily performance is compiled: ${answers.performanceCompilation}
        - Support uses knowledge base: ${answers.supportKb}
        - Onboarding time for new staff: ${answers.onboardingTime}
        - Social media manual: ${answers.socialMediaManual}
        - Reconciliation method: ${answers.reconcillationMethod}
        - Biggest time sink: ${answers.biggestTimeSink}
        
        Return ONLY a JSON object with this exact structure:
        {
          "score": number (0-100),
          "summary": "string summary",
          "metrics": {
            "hoursWastedPerYear": number,
            "potentialSavings": "string"
          },
          "bottlenecks": ["string"],
          "recommendations": ["string"]
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
            max_tokens: 1500,
            messages: [{ role: 'user', content: prompt }],
          }),
        });

        if (response.ok) {
          const resJson = await response.json();
          const responseText = resJson.content[0]?.text || '{}';
          reportData = JSON.parse(responseText);
        } else {
          throw new Error('Claude API error status: ' + response.status);
        }
      } catch (err) {
        console.warn('Claude API request failed, falling back to local calculation:', err);
        reportData = generateMockReport(answers);
      }
    } else {
      // Return mock report for local dev
      reportData = generateMockReport(answers);
    }

    // Save to Supabase lead tracking
    await insertToolSubmission('AI Readiness Audit', answers, JSON.stringify(reportData), email);

    return NextResponse.json({ success: true, report: reportData });
  } catch (error: any) {
    console.error('Error in audit API:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
