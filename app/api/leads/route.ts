import { NextRequest, NextResponse } from 'next/server';
import { insertLead } from '@/lib/supabase';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown, max: number): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
  }

  const email = clean(body.email, 254);
  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ success: false, error: 'A valid email is required' }, { status: 400 });
  }

  const source = clean(body.source, 60) || 'website';
  const details = {
    name: clean(body.name, 120),
    company: clean(body.company, 160),
    message: clean(body.message ?? body.bottleneck, 4000),
    service: clean(body.service, 60),
    tool: clean(body.tool, 60),
  };

  // Always log first, so a lead is never lost even if the database write fails.
  console.log('[Lead]', { timestamp: new Date().toISOString(), email, source, ...details });

  // Tools send their own structured payload; the contact form sends the fields above.
  const toolData =
    body.tool_data && typeof body.tool_data === 'object'
      ? (body.tool_data as Record<string, unknown>)
      : details;
  const sourceTool = clean(body.source_tool, 60) || source;

  try {
    await insertLead(email, source, { sourceTool, toolData });
  } catch (firstError) {
    // The leads table may not have the optional detail columns. Retry with the base columns.
    try {
      await insertLead(email, source);
    } catch (secondError) {
      console.error('[Lead] Database write failed', firstError, secondError);
      return NextResponse.json({ success: false, error: 'Could not save' }, { status: 500 });
    }
  }

  return NextResponse.json({ success: true });
}
