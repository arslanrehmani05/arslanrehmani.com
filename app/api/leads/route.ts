// app/api/leads/route.ts
import { NextResponse } from 'next/server';
import { insertLead } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, source } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const data = await insertLead(email, source || 'newsletter');
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Error in leads API:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
