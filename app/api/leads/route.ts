import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // Safely log the structured lead for follow-up
    console.log('[Lead Capture]', {
      timestamp: new Date().toISOString(),
      ...body,
    });

    return NextResponse.json({ success: true, message: 'Lead logged successfully' });
  } catch (error) {
    return NextResponse.json({ success: true }, { status: 200 });
  }
}
