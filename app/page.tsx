import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Hero from '@/components/hero';
import ProblemSection from '@/components/problem-section';
import FeaturedWork from '@/components/featured-work';
import ProductsGrid from '@/components/products-grid';
import HowIWork from '@/components/how-i-work';
import AboutSection from '@/components/about-section';
import FinalCta from '@/components/final-cta';

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <ProblemSection />
      <FeaturedWork />

      <section className="py-20 md:py-28 border-t border-border-color">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div className="max-w-2xl">
              <span className="eyebrow mb-4">Products</span>
              <h2 className="headline text-3xl sm:text-4xl">Working products, not screenshots.</h2>
              <p className="text-base text-text-muted leading-relaxed mt-4">
                Open them, click around, and ask their built-in assistants anything.
              </p>
            </div>
            <Link
              href="/products"
              className="text-sm text-text-muted hover:text-text-primary transition-colors inline-flex items-center gap-2 shrink-0"
            >
              <span>All products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <ProductsGrid />
        </div>
      </section>

      <HowIWork />
      <AboutSection />
      <FinalCta />
    </div>
  );
}
