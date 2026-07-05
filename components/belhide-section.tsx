// components/belhide-section.tsx
import Link from 'next/link';

export default function BelhideSection() {
  return (
    <section id="belhide" className="bg-bg-primary py-36 border-b border-border-color">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Text Content (8 columns on desktop) */}
          <div className="lg:col-span-8 flex flex-col gap-6 text-left">
            <span className="text-xs font-semibold tracking-widest uppercase text-accent-gold">
              Building In Public
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-text-primary leading-tight">
              One brand. Built entirely by AI systems.
            </h2>
            <p className="text-lg text-text-muted max-w-2xl font-normal leading-relaxed">
              Belhide is a luxury leather goods brand built to serve as a public laboratory for operational efficiency. Every workflow—from Shopify order fulfillment routing and shipping cost auditing, to advertising analysis and customer notifications—is automated using custom-built AI engines. No manual reporting, no human spreadsheets.
            </p>
            <div className="flex flex-wrap items-center gap-6 mt-4">
              <Link
                href="https://belhide.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-bold uppercase tracking-wider text-accent-gold hover:text-accent-gold-hover transition-gold"
                style={{ minHeight: '44px' }}
              >
                Visit Belhide →
              </Link>
              <Link
                href="https://x.com/arslanrehmani"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-bold uppercase tracking-wider text-accent-gold hover:text-accent-gold-hover transition-gold"
                style={{ minHeight: '44px' }}
              >
                Follow the build on X →
              </Link>
            </div>
          </div>

          {/* Right: Graphic Box demonstrating automation (4 columns) */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="bg-bg-secondary border border-border-color p-8 rounded-3xl w-full flex flex-col gap-6 select-none">
              <span className="text-[10px] font-bold text-accent-gold tracking-widest uppercase">
                Systems Automated
              </span>
              <div className="space-y-3">
                <div className="flex justify-between items-center bg-bg-primary/50 border border-border-color/50 px-4 py-3 rounded-xl">
                  <span className="text-sm text-text-primary font-medium">Shopify Fulfillment</span>
                  <span className="text-xs font-bold text-accent-gold px-2.5 py-0.5 rounded-full bg-accent-gold/10">100%</span>
                </div>
                <div className="flex justify-between items-center bg-bg-primary/50 border border-border-color/50 px-4 py-3 rounded-xl">
                  <span className="text-sm text-text-primary font-medium">Ad Optimization</span>
                  <span className="text-xs font-bold text-accent-gold px-2.5 py-0.5 rounded-full bg-accent-gold/10">100%</span>
                </div>
                <div className="flex justify-between items-center bg-bg-primary/50 border border-border-color/50 px-4 py-3 rounded-xl">
                  <span className="text-sm text-text-primary font-medium">Shipping Audit</span>
                  <span className="text-xs font-bold text-accent-gold px-2.5 py-0.5 rounded-full bg-accent-gold/10">100%</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
