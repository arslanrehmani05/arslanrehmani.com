import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import OperationalScan from '@/components/operational-scan';
import PipelineMiniDemo from '@/components/pipeline-mini-demo';
import FinalCta from '@/components/final-cta';
import { categoryLabels, categoryOrder, tools } from '@/lib/tools/registry';

export const metadata: Metadata = {
  title: 'Tools',
  description:
    'Free tools that put a number on manual work, month-end, stock, sales channels and production. Use them with your own figures.',
  alternates: { canonical: '/tools' },
};

export default function ToolsPage() {
  return (
    <div>
      <section className="pt-16 md:pt-24 pb-12 md:pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <span className="eyebrow mb-4">Tools</span>
            <h1 className="headline text-4xl sm:text-5xl">Measure the problem before you pay to fix it.</h1>
            <p className="text-base md:text-lg text-text-muted leading-relaxed mt-6">
              Free tools that put a number on what is slowing your business down. Use them with your
              own figures. Nothing is saved unless you choose to send it.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="max-w-6xl mx-auto px-6 space-y-14">
          {categoryOrder.map((category) => {
            const group = tools.filter((t) => t.category === category);
            if (group.length === 0) return null;
            return (
              <div key={category}>
                <h2 className="eyebrow mb-6">{categoryLabels[category]}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {group.map((tool) => (
                    <Link
                      key={tool.slug}
                      href={`/tools/${tool.slug}`}
                      className="group rounded-2xl bg-bg-secondary border border-border-color hover:border-border-gold transition-colors p-6 md:p-8 flex flex-col"
                    >
                      <h3 className="headline text-xl md:text-2xl">{tool.question}</h3>
                      <p className="text-sm md:text-base text-text-muted leading-relaxed mt-3 flex-grow">{tool.summary}</p>
                      <span className="inline-flex items-center gap-2 text-sm text-text-primary mt-6">
                        <span>{tool.name}</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <OperationalScan />

      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mb-10">
            <span className="eyebrow mb-4">How an agent is kept safe</span>
            <h2 className="headline text-3xl sm:text-4xl">Nothing an AI reads reaches your books unchecked.</h2>
            <p className="text-base text-text-muted leading-relaxed mt-4">
              Step through what happens to one document, from the moment it arrives to the moment it
              is recorded.
            </p>
          </div>
          <PipelineMiniDemo />
        </div>
      </section>

      <FinalCta />
    </div>
  );
}
