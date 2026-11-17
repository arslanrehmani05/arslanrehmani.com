import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { products } from '@/lib/content';

export default function ProductsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          id={product.id}
          className="rounded-2xl bg-bg-secondary border border-border-color p-6 md:p-8 flex flex-col scroll-mt-24"
        >
          <span className="text-xs font-mono uppercase tracking-wider text-text-subtle">
            {product.sector}
          </span>
          <h3 className="headline text-2xl mt-4">{product.name}</h3>
          <p className="text-sm md:text-base text-text-primary mt-3">{product.problem}</p>
          <p className="text-sm md:text-base text-text-muted leading-relaxed mt-3 flex-grow">
            {product.description}
          </p>
          {product.basis && <p className="text-xs text-text-subtle mt-4">{product.basis}</p>}

          <div className="mt-8 pt-6 border-t border-border-color">
            {product.url ? (
              <a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-text-primary hover:text-text-muted transition-colors min-h-[44px]"
              >
                <span>Open {product.name}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            ) : (
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-sm text-text-primary hover:text-text-muted transition-colors min-h-[44px]"
              >
                <span>Ask for a walkthrough</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
