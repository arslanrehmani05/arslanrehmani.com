// app/about/page.tsx
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'About | Arslan Rehmani',
  description: 'Learn more about Arslan Rehmani, ACCA qualified accountant and AI Systems Consultant.',
};

export default function AboutPage() {
  return (
    <main className="flex flex-col min-h-screen bg-bg-primary pt-36 pb-20">
      <div className="max-w-4xl mx-auto px-6 w-full">
        
        {/* Header */}
        <div className="flex flex-col gap-4 mb-12 text-left">
          <span className="text-xs font-semibold tracking-widest uppercase text-accent-gold">
            About the Founder
          </span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-text-primary leading-tight">
            Arslan Rehmani
          </h1>
          <p className="text-xl text-accent-gold font-bold leading-normal">
            ACCA Qualified • Daily Learner Since 2016 • Founder, Vanthrope
          </p>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start mt-6">
          
          {/* Portrait Sidebar */}
          <div className="flex flex-col gap-6 items-center">
            <div className="relative w-full aspect-square max-w-[280px] rounded-3xl p-1 border border-accent-gold bg-bg-secondary overflow-hidden">
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <Image
                  src="/headshot.png"
                  alt="Arslan Rehmani"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            
            <div className="flex flex-col items-center gap-2">
              <Link
                href="https://linkedin.com/in/arslanrehmani"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold text-accent-gold hover:underline transition-gold"
                style={{ minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}
              >
                Connect on LinkedIn
              </Link>
              <Link
                href="https://x.com/arslanrehmani"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold text-accent-gold hover:underline transition-gold"
                style={{ minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}
              >
                Follow on X (Twitter)
              </Link>
            </div>
          </div>

          {/* Biography Text (spanning 2 columns) */}
          <div className="md:col-span-2 space-y-6 text-text-muted leading-relaxed font-normal text-base">
            <p>
              Arslan Rehmani operates at the unique intersection of formal corporate finance and full-stack software engineering. As an ACCA-qualified professional (Association of Chartered Certified Accountants), he understands balance sheets, corporate resource planning, operational risks, and efficiency audits from the ground up.
            </p>
            <p>
              Since 2016, Arslan has dedicated himself to a daily learning path across data structures, system architectures, and modern cloud deployment models. This dual capability allows him to diagnose administrative leaks in mid-market companies and translate them directly into production-grade software.
            </p>
            <p>
              He created **TextileMode ERP** to solve machine balancing and routing bottlenecks in textiles manufacturing, and **Belhide Ecommerce Intelligence** to automate e-commerce tracking across Shopify and ad systems. Today, through his agency **Vanthrope**, he builds custom automated AI agents to replace manual workflows.
            </p>
            
            <div className="pt-6">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-accent-gold hover:bg-accent-gold-hover text-bg-primary font-bold text-sm tracking-wide uppercase px-8 py-4 rounded-full transition-gold"
                style={{ minHeight: '44px' }}
              >
                Book a consultation
              </Link>
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}
