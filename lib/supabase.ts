// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create a client that will fail gracefully if keys are placeholders
export const supabase = supabaseUrl && supabaseAnonKey && supabaseUrl !== 'placeholder-url' && supabaseAnonKey !== 'placeholder-key'
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Expose helper to log operations locally in development if Supabase is offline
export interface LeadExtra {
  sourceTool?: string;
  toolData?: Record<string, unknown>;
}

export async function insertLead(email: string, source: string, extra?: LeadExtra) {
  const row = {
    email,
    source,
    created_at: new Date().toISOString(),
    ...(extra?.sourceTool ? { source_tool: extra.sourceTool } : {}),
    ...(extra?.toolData ? { tool_data: extra.toolData } : {}),
  };

  if (supabase) {
    const { data, error } = await supabase.from('leads').insert([row]).select();
    if (error) throw error;
    return data;
  } else {
    console.log(`[MOCK SUPABASE] Saved Lead: Email=${email}, Source=${source}`, extra ?? '');
    return [{ id: 'mock-uuid', ...row }];
  }
}

export async function insertToolSubmission(tool: string, inputs: any, report: string, email?: string) {
  if (supabase) {
    const { data, error } = await supabase
      .from('tool_submissions')
      .insert([{ 
        tool, 
        inputs, 
        report, 
        email: email || null, 
        created_at: new Date().toISOString() 
      }])
      .select();
    if (error) throw error;
    return data;
  } else {
    console.log(`[MOCK SUPABASE] Saved Tool Submission: Tool=${tool}, Email=${email || 'N/A'}`);
    return [{ id: 'mock-uuid', tool, inputs, report, email, created_at: new Date().toISOString() }];
  }
}
