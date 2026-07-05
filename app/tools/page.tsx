// app/tools/page.tsx
import Link from 'next/link';

export const metadata = {
  title: 'Operational Analysis Tools | Arslan Rehmani',
  description: 'Evaluate your operational efficiency and calculate potential ROI from AI agent automation.',
};

export default function ToolsIndexPage() {
  const tools = [
    {
      title: 'AI Readiness Audit',
      description: 'Answer 10 operational questions regarding your staff size, tool count, and spreadsheets. Receive a personalized analysis of your automation readiness.',
      badge: 'Interactive Tool',
      href: '/tools/audit',
      action: 'Launch Audit Form →'
    },
    {
      title: 'Automation ROI Calculator',
      description: 'Enter your headcount, manual work hours, and salaries to calculate the exact annual labor cost saved through custom software integration.',
      badge: 'Interactive Calculator',
      href: '/tools/calculator',
      action: 'Launch ROI Calculator →'
    },
  ];

  return (
    <main className="flex flex-col min-h-screen bg-bg-primary pt-36 pb-20">
      <div className="max-w-4xl mx-auto px-6 w-full">
        
        {/* Page Header */}
        <div className="flex flex-col gap-4 mb-16 text-left">
          <span className="text-xs font-semibold tracking-widest uppercase text-accent-gold">
            Productivity Suite
          </span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-text-primary leading-tight">
            Operational Analysis Tools
          </h1>
          <p className="text-lg text-text-muted max-w-2xl leading-relaxed">
            Free diagnostic toolkits designed to analyze your current administrative bottlenecks and calculate the concrete financial benefit of custom software deployment.
          </p>
        </div>

        {/* Tools List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tools.map((tool, idx) => (
            <div
              key={idx}
              className="bg-bg-secondary border border-border-color p-8 rounded-3xl flex flex-col justify-between min-h-[300px] transition-gold hover:border-accent-gold/40"
            >
              <div>
                <span className="inline-block bg-accent-gold/10 text-accent-gold text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-6">
                  {tool.badge}
                </span>
                <h2 className="text-2xl font-black text-text-primary mb-4 leading-tight">
                  {tool.title}
                </h2>
                <p className="text-text-muted text-sm leading-relaxed mb-6">
                  {tool.description}
                </p>
              </div>

              <div className="pt-4">
                <Link
                  href={tool.href}
                  className="inline-flex items-center text-sm font-bold uppercase tracking-wider text-accent-gold hover:text-accent-gold-hover transition-gold"
                  style={{ minHeight: '44px' }}
                >
                  {tool.action}
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
