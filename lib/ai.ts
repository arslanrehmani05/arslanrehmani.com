// lib/ai.ts
import { GoogleGenAI } from '@google/genai';
import Groq from 'groq-sdk';

const geminiApiKey = process.env.GEMINI_API_KEY || '';
const groqApiKey = process.env.GROQ_API_KEY || '';

const ai = geminiApiKey ? new GoogleGenAI({ apiKey: geminiApiKey }) : null;
const groq = groqApiKey ? new Groq({ apiKey: groqApiKey }) : null;

export async function generateAiCompletion(
  prompt: string,
  systemInstruction?: string
): Promise<string> {
  // 1. Try Gemini
  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: systemInstruction ? { systemInstruction } : undefined,
      });

      const text = response.text;
      if (text && text.trim().length > 0) {
        return text;
      }
    } catch (err) {
      console.warn('[AI UTILITY] Gemini call failed, attempting Groq fallback...', err);
    }
  }

  // 2. Fallback to Groq API
  if (groq) {
    try {
      const completion = await groq.chat.completions.create({
        messages: [
          ...(systemInstruction ? [{ role: 'system' as const, content: systemInstruction }] : []),
          { role: 'user' as const, content: prompt },
        ],
        model: 'llama-3.3-70b-versatile',
        temperature: 0.7,
      });

      const content = completion.choices[0]?.message?.content;
      if (content && content.trim().length > 0) {
        return content;
      }
    } catch (err) {
      console.warn('[AI UTILITY] Groq fallback call failed:', err);
    }
  }

  // 3. Graceful Mock Fallback (when API keys are unconfigured or offline)
  return mockAiResponse(prompt);
}

function mockAiResponse(prompt: string): string {
  if (prompt.toLowerCase().includes('site scan') || prompt.toLowerCase().includes('operational scan')) {
    return JSON.stringify({
      recommendation1: 'Replace manual spreadsheet data transfers between sales and production floor with a real-time Next.js operational portal.',
      recommendation2: 'Implement automated API synchronization between your primary platform and inventory database to eliminate stock disconnects.',
      recommendation3: 'Deploy automated daily executive AI briefings to track key operational metrics without manual report compilation.',
    });
  }

  if (prompt.toLowerCase().includes('ask arslan') || prompt.toLowerCase().includes('digital twin')) {
    return "I build custom operational software and ERPs that replace manual work permanently. For example, TextileMode ERP replaced 5 full-time administrative roles at a textile manufacturer and eliminated 40+ hours of weekly manual work. How can I help streamline your operation?";
  }

  return "Based on your operational inputs, your primary bottlenecks stem from manual data entry and disconnected tools. Implementing custom ERP modules and automated API pipelines typically eliminates 80%+ of recurring administrative drag within 4 to 8 weeks.";
}
