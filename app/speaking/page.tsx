// app/speaking/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { Mic, Radio, Users, CheckCircle2, Mail, ArrowUpRight } from 'lucide-react';
import { BUSINESS_EMAILS } from '@/lib/emails';

export const metadata: Metadata = {
  title: 'Speaking & Keynotes | Arslan Rehmani',
  description: 'Book Arslan Rehmani for keynote talks, panels, and podcasts on practical operational AI, custom ERP builds, and eliminating manual overhead.',
  alternates: {
    canonical: '/speaking',
  },
  openGraph: {
    title: 'Speaking & Keynotes | Arslan Rehmani',
    description: 'Practical keynotes and discussions on operational AI, replacing manual drag, and real production software engineering.',
    url: 'https://arslanrehmani.com/speaking',
    siteName: 'Arslan Rehmani',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Speaking & Keynotes | Arslan Rehmani',
    description: 'Practical operational AI keynotes and podcast guest bookings.',
  },
};

const speakingTopics = [
  {
    title: 'Replacing Manual Drag with Deterministic Code & AI',
    description: 'How SMB manufacturing companies and ecommerce brands eliminate repetitive human overhead by replacing manual data transfers with production software pipelines.',
    takeaways: [
      'Identifying silent financial drag in operational workflows',
      'Determining when to use deterministic code vs LLM pipelines',
      'Case study breakdown of replacing 5 manual roles at a textile manufacturer',
    ],
  },
  {
    title: 'De-hyping AI for Operations Directors & CFOs',
    description: 'A pragmatic framework for evaluating AI tools, avoiding deck presentations and prompt-engineering hype, and focusing on verifiable financial ROI.',
    takeaways: [
      'The CFO test: Verifiable metrics over vendor claims',
      'Deploying AI systems on client-owned cloud infrastructure',
      'Security, privacy, and data isolation for operational software',
    ],
  },
  {
    title: 'Building Modern ERPs for Mid-Market Manufacturing',
    description: 'Technical insights into building custom Next.js/TypeScript ERP platforms that manage real production floors, loom efficiency, and inventory in real time.',
    takeaways: [
      'Modular architecture for real-time production floor control',
      'Integrating multi-channel data without third-party middleware',
      'Lessons learned from 10+ months of continuous live production uptime',
    ],
  },
];

const formats = [
  {
    icon: Mic,
    title: 'Keynote Addresses',
    description: '45-minute presentations delivered to conferences, industry summits, and leadership retreats.',
  },
  {
    icon: Radio,
    title: 'Podcast Interviews',
    description: 'In-depth audio/video podcast guest appearances discussing operational software engineering.',
  },
  {
    icon: Users,
    title: 'Executive Workshops',
    description: 'Interactive half-day workshops for executive teams diagnosing operational bottlenecks.',
  },
];

export default function SpeakingPage() {
  return (
    <main className="bg-bg-primary min-h-screen py-16 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header Hero */}
        <div className="max-w-3xl mb-16">
          <span className="eyebrow mb-4">Engagements & Keynotes</span>
          <h1 className="headline text-4xl md:text-5xl lg:text-6xl leading-[1.1]">
            Practical AI for operations.{' '}
            <span className="italic text-accent-gold">Zero hype.</span>
          </h1>
          <p className="text-base md:text-lg text-text-muted leading-relaxed mt-6">
            I speak to founders, operations directors, and executive teams about building real operational software that works. No slideware, no generic AI prompts — just hard numbers and production engineering.
          </p>
        </div>

        {/* Formats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {formats.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-bg-secondary border border-border-color rounded-2xl p-8 flex flex-col justify-between"
              >
                <div>
                  <span className="w-12 h-12 rounded-xl bg-accent-gold-dim border border-border-gold flex items-center justify-center text-accent-gold mb-6">
                    <Icon className="w-6 h-6" />
                  </span>
                  <h2 className="headline text-xl text-text-primary mb-3">
                    {item.title}
                  </h2>
                  <p className="text-xs md:text-sm text-text-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Key Topics Section */}
        <div className="mb-24">
          <span className="eyebrow mb-3">Core Keynotes</span>
          <h2 className="headline text-3xl md:text-4xl text-text-primary mb-10">
            Speaking Topics & Keynote Modules
          </h2>

          <div className="space-y-8">
            {speakingTopics.map((topic, idx) => (
              <div
                key={topic.title}
                className="bg-bg-secondary border border-border-color hover:border-border-gold rounded-2xl p-8 md:p-10 transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-mono text-accent-gold font-bold uppercase">
                    Topic 0{idx + 1}
                  </span>
                </div>
                <h3 className="headline text-2xl text-text-primary mb-4">
                  {topic.title}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed mb-6 max-w-3xl">
                  {topic.description}
                </p>

                <h4 className="text-xs font-semibold uppercase tracking-wider text-text-primary mb-3">
                  Key Takeaways:
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {topic.takeaways.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-text-muted bg-bg-primary p-3 rounded-xl border border-border-color">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent-gold shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Card for Media & Speaking */}
        <div className="bg-bg-secondary border border-border-color rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="eyebrow mb-2">Book an Engagement</span>
            <h3 className="headline text-2xl md:text-3xl text-text-primary">
              Inviting Arslan to speak or feature on a podcast?
            </h3>
            <p className="text-sm text-text-muted mt-2 max-w-xl">
              Write directly to <span className="font-mono text-accent-gold">{BUSINESS_EMAILS.media.email}</span> with event dates, audience profile, and proposed topics.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <a
              href={`mailto:${BUSINESS_EMAILS.media.email}`}
              className="btn-primary !text-sm flex items-center gap-2"
            >
              <span>Email Media Channel</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <Link href="/contact" className="btn-ghost !text-sm">
              Contact Directory
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
