// app/projects/page.tsx
import type { Metadata } from 'next';
import ProjectsExplorer from '@/components/projects-explorer';

export const metadata: Metadata = {
  title: 'Engineered Systems & Case Studies | Arslan Rehmani',
  description:
    'Live production ERP systems, autonomous multi-agent swarms, and custom operational platforms. TextileMode ERP, Belhide Stack, and 15+ live agent architectures.',
  alternates: {
    canonical: '/projects',
  },
  openGraph: {
    title: 'Engineered Systems & Case Studies | Arslan Rehmani',
    description:
      'Live production software, verified headcount reductions, and multi-agent systems built by Arslan Rehmani.',
    url: 'https://arslanrehmani.com/projects',
    siteName: 'Arslan Rehmani',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Engineered Systems & Case Studies | Arslan Rehmani',
    description: 'Live production ERP systems and autonomous agent swarms with verified numbers.',
  },
};

export default function ProjectsPage() {
  return (
    <main className="bg-bg-primary min-h-screen pt-8 pb-16 md:pt-10 md:pb-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header Hero */}
        <div className="max-w-3xl mb-12">
          <span className="eyebrow mb-4">Production Deployments &amp; Agent Architectures</span>
          <h1 className="headline text-4xl md:text-5xl lg:text-6xl leading-[1.08]">
            Engineered systems.{' '}
            <span className="italic text-accent-gold">Verified outcomes.</span>
          </h1>
          <p className="text-base md:text-lg text-text-muted leading-relaxed mt-6">
            Every system below is full-stack production software or an autonomous agent architecture.
            Explore verified industrial case studies, live operational platforms, and multi-agent
            swarms running over real infrastructure.
          </p>
        </div>

        {/* Interactive Systems Explorer with Category Tabs */}
        <ProjectsExplorer />
      </div>
    </main>
  );
}
