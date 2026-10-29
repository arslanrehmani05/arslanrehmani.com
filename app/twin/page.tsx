// app/twin/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Send, ShieldCheck, Bot, Sparkles, AlertCircle, ArrowRight, CornerDownLeft } from 'lucide-react';

interface ChatMessage {
  sender: 'user' | 'twin';
  text: string;
  timestamp: string;
}

const GOLDEN_QUESTIONS = [
  'What systems has Arslan built for manufacturers?',
  'How do you validate AI agent outputs before writing to a database?',
  'What are Arslan’s working hours and reply commitments?',
  'Can you invent a 10x marketing result or unverified client?',
];

export default function TwinPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'twin',
      text: 'Hello. I am Arslan’s Digital Twin. I am strictly grounded in verified production case studies, systems architecture, and engineering documentation. Ask me about custom operational builds, agent pipelines, or past deployments.',
      timestamp: '07:00 UTC',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (questionToSend?: string) => {
    const text = questionToSend || input;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!questionToSend) setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/twin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text.trim() }),
      });
      const data = await res.json();

      const twinMsg: ChatMessage = {
        sender: 'twin',
        text: data.text || "I don't know that based on Arslan's verified knowledge base.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, twinMsg]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'twin',
          text: "I don't know that based on Arslan's verified knowledge base. Please reach out directly on a 20-minute discovery call.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary pt-24 pb-20 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bg-secondary border border-border-color text-xs font-mono text-text-muted">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Ask My Twin &bull; Fact-Grounded Conversational Agent</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-text-primary">
            Ask Questions Grounded in Verified Facts.
          </h1>
          <p className="text-sm sm:text-base text-text-muted leading-relaxed">
            This twin is strictly grounded in verified production case studies, systems architecture, and engineering documentation. It has zero permission to hallucinate or invent claims.
          </p>
        </div>

        {/* Golden Questions */}
        <div className="space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-text-subtle">
            Golden Test Questions (Click to run):
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {GOLDEN_QUESTIONS.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => handleSend(q)}
                disabled={isLoading}
                className="p-3 text-left rounded-xl bg-bg-secondary/60 hover:bg-bg-secondary border border-border-color hover:border-text-primary/40 text-xs text-text-muted hover:text-text-primary transition-all font-mono flex items-center justify-between group disabled:opacity-50"
              >
                <span>{q}</span>
                <ArrowRight className="w-3 h-3 shrink-0 text-text-subtle group-hover:text-text-primary transition-colors ml-2" />
              </button>
            ))}
          </div>
        </div>

        {/* Chat Interface Container */}
        <div className="rounded-3xl border border-border-color bg-bg-secondary/30 overflow-hidden flex flex-col h-[520px]">
          {/* Top Bar */}
          <div className="p-4 border-b border-border-color bg-bg-secondary/70 flex items-center justify-between text-xs font-mono text-text-muted">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-text-primary font-medium">Arslan’s Verified Twin</span>
            </div>
            <span className="text-[11px] text-text-subtle">
              Strict Reliability Active &bull; Zero Hallucinations
            </span>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-2xl text-sm leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-accent-gold text-black font-medium rounded-tr-sm'
                      : 'bg-bg-primary border border-border-color text-text-primary rounded-tl-sm'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{m.text}</p>
                </div>
                <span className="text-[10px] font-mono text-text-subtle mt-1 px-1">
                  {m.timestamp}
                </span>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-bg-primary border border-border-color text-xs font-mono text-text-muted w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-gold animate-bounce" />
                <span>Querying verified knowledge base...</span>
              </div>
            )}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-4 border-t border-border-color bg-bg-secondary/80 flex items-center gap-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about manufacturing ERPs, deterministic agent pipelines, or working norms..."
              className="flex-1 bg-bg-primary border border-border-color rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-subtle focus:outline-none focus:border-text-primary/40 font-sans"
              disabled={isLoading}
              maxLength={400}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="btn-primary !p-3 !rounded-xl disabled:opacity-40 flex items-center justify-center shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Disclosures note */}
        <div className="p-4 rounded-2xl bg-bg-secondary/40 border border-border-color text-xs text-text-muted flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-accent-gold shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Privacy disclosure: queries are not logged to third parties and no personal identifiers are retained beyond the active browser session. To speak with Arslan directly,{' '}
            <Link href="/contact" className="text-text-primary underline font-medium">
              book a 20-minute discovery call
            </Link>.
          </p>
        </div>
      </div>
    </main>
  );
}
