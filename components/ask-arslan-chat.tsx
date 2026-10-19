// components/ask-arslan-chat.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Bot, Calendar } from 'lucide-react';
import Link from 'next/link';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const PRESET_QUESTIONS = [
  'How did TextileMode ERP replace 5 roles?',
  'What is included in an operational audit?',
  'What are typical project timelines?',
];

export default function AskArslanChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: 'Hello. I am Arslan Rehmani’s AI Digital Twin. Ask me about custom ERP builds, operational audits, or how TextileMode ERP eliminated 40+ hours of weekly manual work.',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (messages.length > 1) {
      scrollToBottom();
    }
  }, [messages]);

  const sendMessage = async (contentToSend: string) => {
    if (!contentToSend.trim() || isTyping) return;

    const userMsg: ChatMessage = { role: 'user', content: contentToSend.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/ask-arslan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      if (res.ok && data.reply) {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: 'I specialize in engineering custom operational software. Visit /contact to book a direct 30-minute discovery call.',
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Direct contact is available via arslan@arslanrehmani.com or on our /contact page.',
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const userMessageCount = messages.filter((m) => m.role === 'user').length;

  return (
    <div className="w-full bg-bg-secondary border border-border-color hover:border-border-gold/60 rounded-2xl p-6 md:p-8 transition-colors flex flex-col justify-between">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between gap-4 mb-4 pb-4 border-b border-border-color">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-accent-gold-dim border border-border-gold flex items-center justify-center text-accent-gold shrink-0">
              <Bot className="w-4 h-4" />
            </span>
            <div>
              <h3 className="headline text-lg text-text-primary">Ask Arslan (AI Twin)</h3>
              <span className="text-[11px] text-accent-gold font-mono block">Interactive Operational Systems Consultant</span>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-accent-gold bg-accent-gold-dim border border-border-gold/40 px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-gold animate-pulse" />
            Live Gemini Twin
          </span>
        </div>

        {/* Quick Question Chips */}
        <div className="flex flex-wrap gap-2 mb-4">
          {PRESET_QUESTIONS.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => sendMessage(q)}
              disabled={isTyping}
              className="text-[11px] font-mono text-text-muted hover:text-accent-gold bg-bg-primary hover:bg-bg-primary/80 border border-border-color hover:border-border-gold px-3 py-1.5 rounded-lg transition-colors text-left disabled:opacity-50"
            >
              {q} →
            </button>
          ))}
        </div>

        {/* Messages Stream */}
        <div className="bg-bg-primary/60 border border-border-color rounded-xl p-4 max-h-[260px] overflow-y-auto space-y-3 text-xs leading-relaxed mb-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] p-3 rounded-xl ${
                  msg.role === 'user'
                    ? 'bg-accent-gold text-black font-semibold'
                    : 'bg-bg-secondary border border-border-color/80 text-text-muted'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-text-subtle italic text-[11px] bg-bg-secondary p-2 rounded-lg w-max">
              <Sparkles className="w-3 h-3 text-accent-gold animate-spin" />
              <span>Arslan AI is formulating response...</span>
            </div>
          )}

          {userMessageCount >= 2 && (
            <div className="p-3 bg-accent-gold-dim border border-border-gold rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-text-primary font-medium">Ready to discuss your specific operational drag in detail?</span>
              <Link
                href="/contact"
                className="btn-primary !py-2 !px-4 !text-xs shrink-0 flex items-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book 30-Min Discovery</span>
              </Link>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          placeholder="Ask a question about systems, audits, or ERP architecture..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-bg-primary border border-border-color rounded-xl px-4 py-2.5 text-xs text-text-primary placeholder:text-text-subtle focus:border-accent-gold focus:outline-none transition-colors"
        />
        <button
          type="submit"
          disabled={isTyping || !input.trim()}
          className="btn-primary !px-5 !py-2.5 !text-xs shrink-0 flex items-center gap-1.5 disabled:opacity-50"
        >
          <span>Ask</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
