// components/ask-arslan-chat.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Bot, Calendar } from 'lucide-react';
import Link from 'next/link';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export default function AskArslanChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: 'Hello. I am Arslan Rehmani’s AI Digital Twin. Ask me about custom ERP builds, operational audits, or how TextileMode ERP replaced 5 manual roles.',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg: ChatMessage = { role: 'user', content: input.trim() };
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

  const userMessageCount = messages.filter((m) => m.role === 'user').length;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-3 bg-bg-secondary hover:bg-bg-primary border border-border-gold rounded-full px-5 py-3.5 shadow-2xl transition-all hover:scale-105"
          aria-label="Open Ask Arslan Chat Assistant"
        >
          <span className="w-8 h-8 rounded-full bg-accent-gold-dim border border-border-gold flex items-center justify-center text-accent-gold">
            <Sparkles className="w-4 h-4" />
          </span>
          <div className="text-left hidden sm:block">
            <span className="block text-xs font-bold text-text-primary">Ask Arslan (AI Twin)</span>
            <span className="block text-[10px] text-accent-gold font-mono">Operational Assistant</span>
          </div>
        </button>
      )}

      {/* Expanded Chat Box */}
      {isOpen && (
        <div className="bg-bg-secondary border border-border-gold rounded-2xl shadow-2xl w-[90vw] sm:w-[380px] h-[520px] flex flex-col justify-between overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="bg-bg-primary p-4 border-b border-border-color flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-accent-gold-dim border border-border-gold flex items-center justify-center text-accent-gold">
                <Bot className="w-4 h-4" />
              </span>
              <div>
                <h3 className="headline text-sm text-text-primary">Ask Arslan</h3>
                <span className="text-[10px] text-accent-gold font-mono block">Digital Twin & Systems Builder</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-text-subtle hover:text-text-primary transition-colors p-1"
              aria-label="Close Chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs leading-relaxed">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl ${
                    msg.role === 'user'
                      ? 'bg-accent-gold text-black font-medium'
                      : 'bg-bg-primary border border-border-color text-text-muted'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-text-subtle italic text-[11px] bg-bg-primary/50 p-2 rounded-xl w-max">
                <Sparkles className="w-3 h-3 text-accent-gold animate-spin" />
                <span>Arslan AI is thinking...</span>
              </div>
            )}

            {/* Proactive Call Booking Pivot after 3+ intent exchanges */}
            {userMessageCount >= 3 && (
              <div className="p-3 bg-accent-gold-dim border border-border-gold rounded-xl text-center space-y-2">
                <span className="text-[11px] text-accent-gold font-bold block">Ready for a direct 30-minute discovery call?</span>
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="btn-primary !w-full !py-2 !text-[11px] flex items-center justify-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Call via Contact →</span>
                </Link>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-3 bg-bg-primary border-t border-border-color flex gap-2">
            <input
              type="text"
              placeholder="Ask about ERPs, ROI, or tech stack..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-bg-secondary border border-border-color rounded-xl px-3.5 py-2.5 text-xs text-text-primary focus:border-accent-gold focus:outline-none"
            />
            <button
              type="submit"
              disabled={isTyping}
              className="btn-primary !p-2.5 shrink-0 flex items-center justify-center disabled:opacity-50"
              aria-label="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
