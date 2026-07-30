// app/api/audit/route.ts
import { NextResponse } from 'next/server';
import { generateAiCompletion } from '@/lib/ai';
import { insertLead, insertToolSubmission } from '@/lib/supabase';

function generateLocalReport(answers: any) {
  const teamSize = parseInt(answers.teamSize) || 2;
  const reportingHours = parseInt(answers.reportingHours) || 10;
  const disconnectedTools = parseInt(answers.disconnectedTools) || 3;
  const isExcelInventory = answers.excelInventory === 'yes';

  let score = 82;
  if (reportingHours > 5) score -= 15;
  if (disconnectedTools > 3) score -= 10;
  if (isExcelInventory) score -= 15;
  score = Math.max(30, score);

  const hoursWastedPerYear = (reportingHours * 52) + (isExcelInventory ? 200 : 0);
  const potentialSavings = hoursWastedPerYear * 45 * teamSize;

  return {
    score,
    summary: `Your operations are currently running at ${score}% efficiency baseline. There are noticeable administrative drag factors due to manual data transfers.`,
    metrics: {
      hoursWastedPerYear,
      potentialSavings: `$${potentialSavings.toLocaleString()}`,
    },
    bottlenecks: [
      isExcelInventory ? 'Spreadsheet inventory tracking represents a major synchronization bottleneck.' : 'Disconnected tools force manual data entry between systems.',
      reportingHours > 3 ? 'Manual reporting blocks real-time executive decision making.' : 'Fragmented tools create administrative overhead.',
    ],
    recommendations: [
      'Centralize core operations into a unified single-source database (Next.js ERP integration).',
      'Replace manual spreadsheet exports with background API synchronization jobs.',
      'Deploy automated daily AI executive briefings to track operational performance.',
    ],
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { answers, email } = body;

    if (!answers) {
      return NextResponse.json({ error: 'Answers are required' }, { status: 400 });
    }

    let reportData: any;

    try {
      const prompt = `Analyze these operational parameters for a business and provide a structured JSON operational readiness report:
      - Team size: ${answers.teamSize || 3}
      - Hours spent per week on manual reporting: ${answers.reportingHours || 12}
      - Number of disconnected tools: ${answers.disconnectedTools || 4}
      - Excel/Spreadsheet inventory: ${answers.excelInventory || 'yes'}
      - Primary bottleneck: ${answers.biggestTimeSink || 'Manual Data Entry'}
      
      Return ONLY a raw valid JSON object (no markdown, no backticks) matching this structure:
      {
        "score": 52,
        "summary": "Short 2-sentence summary",
        "metrics": {
          "hoursWastedPerYear": 600,
          "potentialSavings": "$27,000"
        },
        "bottlenecks": ["Bottleneck 1", "Bottleneck 2"],
        "recommendations": ["Recommendation 1", "Recommendation 2", "Recommendation 3"]
      }`;

      const aiText = await generateAiCompletion(prompt);
      const cleanJson = aiText.replace(/```json/g, '').replace(/```/g, '').trim();
      reportData = JSON.parse(cleanJson);
    } catch {
      reportData = generateLocalReport(answers);
    }

    // Lead Capture to Supabase
    try {
      if (email) {
        await insertLead(email, 'operational-audit', {
          sourceTool: 'operational_audit',
          toolData: { answers, report: reportData },
        });
      }
      await insertToolSubmission('Operational Readiness Audit', answers, JSON.stringify(reportData), email);
    } catch {
      // Graceful fallback
    }

    return NextResponse.json({ success: true, report: reportData });
  } catch (error: any) {
    console.error('Error in audit API:', error);
    return NextResponse.json({ error: error.message || 'Audit execution failed' }, { status: 500 });
  }
}
