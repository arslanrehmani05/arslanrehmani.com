'use client';

import { useState } from 'react';
import { ArrowRight, Check, Mail, Phone, Calendar, ShieldCheck } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [bottleneck, setBottleneck] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !name.trim()) return;

    setLoading(true);
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          company: company.trim(),
          bottleneck: bottleneck.trim(),
          source: 'contact_page',
        }),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-6 space-y-12">
        <div className="space-y-4">
          <span className="eyebrow">Direct Channel</span>
          <h1 className="headline text-4xl sm:text-5xl text-text-primary">
            Initiate an Operational Systems Review
          </h1>
          <p className="text-base text-text-muted leading-relaxed max-w-2xl">
            Direct access to Arslan Rehmani. No sales intermediaries, no junior account reps. Tell me your highest-drag manual bottleneck, and we will schedule a 20-minute technical architectural audit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-7 bg-bg-secondary/70 border border-border-color rounded-2xl p-8">
            {submitted ? (
              <div className="space-y-4 py-8 text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="headline text-2xl text-text-primary">Audit Request Received</h3>
                <p className="text-xs text-text-muted max-w-md mx-auto leading-relaxed">
                  Thank you. I personally review every technical submission and will respond via email within 4 business hours with scheduling times.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-mono text-text-subtle uppercase block mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Marcus Vance"
                    className="w-full bg-bg-primary border border-border-color rounded-xl px-4 py-3 text-xs text-text-primary focus:border-accent-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-text-subtle uppercase block mb-1">Work Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="marcus@company.com"
                    className="w-full bg-bg-primary border border-border-color rounded-xl px-4 py-3 text-xs text-text-primary focus:border-accent-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-text-subtle uppercase block mb-1">Company & Industry</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Apex Industrial Logistics"
                    className="w-full bg-bg-primary border border-border-color rounded-xl px-4 py-3 text-xs text-text-primary focus:border-accent-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-text-subtle uppercase block mb-1">Primary Operational Bottleneck</label>
                  <textarea
                    rows={4}
                    value={bottleneck}
                    onChange={(e) => setBottleneck(e.target.value)}
                    placeholder="Describe your current manual spreadsheet drag, tool fragmentation, or accounting leakage..."
                    className="w-full bg-bg-primary border border-border-color rounded-xl p-4 text-xs text-text-primary focus:border-accent-gold focus:outline-none leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full !py-3.5 !text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <span>{loading ? 'Submitting...' : 'Request Architectural Discovery Call'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          <div className="md:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-bg-secondary/40 border border-border-color space-y-4">
              <span className="text-xs font-mono text-accent-gold uppercase font-bold block">What happens next:</span>
              <ul className="space-y-3 text-xs text-text-muted leading-relaxed">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Direct reply within 4 hours with technical review notes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>20-minute Zoom call exploring your database and workflow bottlenecks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Clear architecture proposal with fixed timeline and quantified ROI.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-bg-secondary/40 border border-border-color space-y-2 text-xs font-mono text-text-subtle">
              <span className="text-text-primary font-bold block">Engineering Directives:</span>
              <div>• Zero sales pressure</div>
              <div>• Absolute data confidentiality</div>
              <div>• Fixed-scope outcome guarantees</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
