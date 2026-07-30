// app/projects/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { ExternalLink, Check, ShieldCheck, ArrowRight, Database, Cpu, LayoutGrid } from 'lucide-react';
import { BUSINESS_EMAILS } from '@/lib/emails';

export const metadata: Metadata = {
  title: 'Projects & Case Studies | Arslan Rehmani',
  description: 'Live production ERP systems and operational stacks. TextileMode ERP (erp.textilemode.com) and Belhide Operational Stack (erp.belhide.com).',
  alternates: {
    canonical: '/projects',
  },
  openGraph: {
    title: 'Projects & Case Studies | Arslan Rehmani',
    description: 'Live production software, verified headcount reductions, and multi-channel ecommerce automation built by Arslan Rehmani.',
    url: 'https://arslanrehmani.com/projects',
    siteName: 'Arslan Rehmani',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects & Case Studies | Arslan Rehmani',
    description: 'Live production ERP systems with verified numbers.',
  },
};

const proofAssets = [
  {
    id: 'textilemode',
    title: 'TextileMode ERP',
    liveUrl: 'https://erp.textilemode.com',
    displayUrl: 'erp.textilemode.com',
    category: 'Manufacturing ERP & Operational Intelligence',
    clientContext: 'Production Textile Manufacturer (27 Looms)',
    problem: 'Manual paper-based production tracking, delayed financial reporting, and excessive administrative headcount drag across plant operations.',
    solution: 'Engineered a unified 5-module ERP system running live production floor scheduling, yarn inventory, loom efficiency analytics, and 11 financial reports.',
    results: [
      { metric: '5', label: 'Full-time manual roles replaced' },
      { metric: '40+', label: 'Hours of weekly manual work eliminated' },
      { metric: '27', label: 'Weaving looms managed in real time' },
      { metric: '10+', label: 'Months running live with real financial data' },
    ],
    techStack: ['Next.js 14 App Router', 'TypeScript', 'PostgreSQL', 'Tailwind CSS', 'Vercel Infrastructure'],
    isPrimary: true,
  },
  {
    id: 'belhide',
    title: 'Belhide Operational Stack',
    liveUrl: 'https://erp.belhide.com',
    displayUrl: 'erp.belhide.com',
    category: 'Multi-Channel Ecommerce Operational Stack',
    clientContext: 'Client Engagement — Leather Goods Brand',
    problem: 'Fragmented analytics, isolated Shopify and Amazon seller metrics, manual search console audits, and delayed daily operational updates.',
    solution: 'Built a central operational intelligence hub that unifies channel APIs into an automated dashboard featuring server-side AI daily executive briefings.',
    results: [
      { metric: '5', label: 'Sales & analytics channels unified' },
      { metric: 'Daily', label: 'AI executive operational briefings' },
      { metric: '100%', label: 'Automated Search Console & Shopify sync' },
      { metric: 'Zero', label: 'Manual spreadsheet compilation' },
    ],
    techStack: ['Next.js', 'Claude API', 'Shopify API', 'Amazon Selling Partner API', 'Google Search Console API'],
    isPrimary: false,
  },
];

const interactiveTools = [
  {
    title: 'AI Readiness Audit Tool',
    href: '/tools/audit',
    description: 'Interactive diagnostic tool that evaluates your company operational workflows, data accessibility, and automation readiness score.',
    badge: 'Live Tool',
  },
  {
    title: 'Operational ROI Calculator',
    href: '/tools/calculator',
    description: 'Interactive calculator that computes projected financial return, hours saved, and payback period for custom operational ERP software builds.',
    badge: 'Live Calculator',
  },
];

export default function ProjectsPage() {
  return (
    <main className="bg-bg-primary min-h-screen py-16 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header Hero */}
        <div className="max-w-3xl mb-16">
          <span className="eyebrow mb-4">Empirical Proof</span>
          <h1 className="headline text-4xl md:text-5xl lg:text-6xl leading-[1.1]">
            Live production systems.{' '}
            <span className="italic text-accent-gold">Verified outcomes.</span>
          </h1>
          <p className="text-base md:text-lg text-text-muted leading-relaxed mt-6">
            Every case study below represents real production software deployed to live URLs. You can click, open, and inspect working systems right now.
          </p>
        </div>

        {/* Proof Assets Section */}
        <div className="space-y-16 mb-24">
          {proofAssets.map((asset) => (
            <div
              key={asset.id}
              className="bg-bg-secondary border border-border-color hover:border-border-gold rounded-2xl p-8 md:p-12 transition-colors duration-200"
            >
              {/* Asset Header */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-8 border-b border-border-color">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold text-accent-gold uppercase tracking-wider">
                      {asset.category}
                    </span>
                    {asset.isPrimary && (
                      <span className="text-[10px] uppercase tracking-widest font-mono bg-accent-gold-dim border border-border-gold text-accent-gold px-2.5 py-0.5 rounded-full font-semibold">
                        Primary Asset
                      </span>
                    )}
                  </div>
                  <h2 className="headline text-3xl md:text-4xl text-text-primary">
                    {asset.title}
                  </h2>
                  <p className="text-xs text-text-subtle mt-1 font-mono">
                    Context: {asset.clientContext}
                  </p>
                </div>

                <a
                  href={asset.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary !px-6 !py-3 !text-xs shrink-0 flex items-center gap-2"
                >
                  <span>Open Live Application ({asset.displayUrl})</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              {/* Problem / Solution Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
                <div className="bg-bg-primary/60 border border-border-color/80 rounded-xl p-6">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-text-subtle mb-2">
                    Operational Problem
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed">
                    {asset.problem}
                  </p>
                </div>

                <div className="bg-bg-primary/60 border border-border-color/80 rounded-xl p-6">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-accent-gold mb-2">
                    Engineered Solution
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed">
                    {asset.solution}
                  </p>
                </div>
              </div>

              {/* Results Grid — Hard Numbers */}
              <div className="my-8">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-text-primary mb-4">
                  Verified Empirical Results:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {asset.results.map((res) => (
                    <div
                      key={res.label}
                      className="bg-bg-primary border border-border-color rounded-xl p-5"
                    >
                      <span className="text-3xl md:text-4xl font-black font-sans text-accent-gold block">
                        {res.metric}
                      </span>
                      <span className="text-xs font-semibold text-text-primary mt-1 block">
                        {res.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Footer */}
              <div className="pt-6 border-t border-border-color/60 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs text-text-subtle mr-2 font-mono">Stack:</span>
                  {asset.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-mono text-text-muted bg-bg-primary border border-border-color px-2.5 py-1 rounded-lg"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive AI Tools Section */}
        <div className="bg-bg-secondary border border-border-color rounded-2xl p-8 md:p-12 mb-24">
          <span className="eyebrow mb-3">Live Tools</span>
          <h2 className="headline text-2xl md:text-3xl text-text-primary mb-3">
            Interactive Operational Tools
          </h2>
          <p className="text-sm text-text-muted leading-relaxed max-w-2xl mb-8">
            Run automated assessments or compute financial ROI for custom software implementation.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {interactiveTools.map((tool) => (
              <div
                key={tool.title}
                className="bg-bg-primary border border-border-color hover:border-border-gold rounded-xl p-6 flex flex-col justify-between transition-colors"
              >
                <div>
                  <span className="text-[10px] font-mono text-accent-gold uppercase tracking-widest bg-accent-gold-dim border border-border-gold px-2.5 py-0.5 rounded-full inline-block mb-3">
                    {tool.badge}
                  </span>
                  <h3 className="text-lg font-bold text-text-primary mb-2">
                    {tool.title}
                  </h3>
                  <p className="text-xs text-text-muted leading-relaxed">
                    {tool.description}
                  </p>
                </div>
                <Link
                  href={tool.href}
                  className="link-gold text-xs mt-6 inline-flex items-center gap-1"
                >
                  Launch Tool →
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-bg-secondary border border-border-color rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="eyebrow mb-2">Project Discussion</span>
            <h3 className="headline text-2xl md:text-3xl text-text-primary">
              Have a similar operational build in mind?
            </h3>
            <p className="text-sm text-text-muted mt-2 max-w-xl">
              Write directly to <span className="font-mono text-accent-gold">{BUSINESS_EMAILS.projects.email}</span> for project specifications and architecture reviews.
            </p>
          </div>
          <Link href="/contact" className="btn-primary !text-sm shrink-0">
            Discuss Your Project
          </Link>
        </div>
      </div>
    </main>
  );
}
