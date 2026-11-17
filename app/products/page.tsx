import type { Metadata } from 'next';
import ProductsGrid from '@/components/products-grid';
import FinalCta from '@/components/final-cta';

export const metadata: Metadata = {
  title: 'Products',
  description:
    'Working products for manufacturing, ecommerce, market intelligence and legal documents. Open them and use them.',
  alternates: { canonical: '/products' },
};

export default function ProductsPage() {
  return (
    <div>
      <section className="pt-16 md:pt-24 pb-20 md:pb-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <span className="eyebrow mb-4">Products</span>
            <h1 className="headline text-4xl sm:text-5xl">Working products, not screenshots.</h1>
            <p className="text-base md:text-lg text-text-muted leading-relaxed mt-6">
              Each product takes one business problem and solves it end to end. Open them, click
              around, and ask their built-in assistants anything.
            </p>
          </div>

          <ProductsGrid />

          <p className="text-sm text-text-subtle leading-relaxed mt-8 max-w-2xl">
            The client systems behind LoomWorks and BrandPilot run on real business data. I walk
            through those on a call.
          </p>
        </div>
      </section>

      <FinalCta />
    </div>
  );
}
