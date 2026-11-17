import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import FinalCta from '@/components/final-cta';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Arslan Rehmani builds operational systems and AI agents that replace manual work in manufacturing, ecommerce and finance.',
  alternates: { canonical: '/about' },
};

const socials = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/arslanrehmani' },
  { label: 'GitHub', href: 'https://github.com/arslanrehmani05' },
  { label: 'X', href: 'https://x.com/arslanrehmani' },
];

export default function AboutPage() {
  return (
    <div>
      <section className="pt-16 md:pt-24 pb-20 md:pb-28">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-4">
            <div className="relative aspect-square w-full max-w-[320px] rounded-2xl overflow-hidden border border-border-color bg-bg-secondary md:sticky md:top-24">
              <Image
                src="/headshot.jpg"
                alt="Arslan Rehmani"
                fill
                priority
                sizes="(max-width: 768px) 320px, 360px"
                className="object-cover object-top"
              />
            </div>
          </div>

          <div className="md:col-span-8 max-w-2xl">
            <span className="eyebrow mb-4">About</span>
            <h1 className="headline text-4xl sm:text-5xl">
              I build software because spreadsheets were never meant to run a business.
            </h1>

            <div className="mt-8 space-y-5 text-base md:text-lg text-text-muted leading-relaxed">
              <p>
                I learned operations and finance inside a manufacturing business before I wrote its
                software. I know what a month-end close feels like from the inside, and what it
                costs when the stock figure and the ledger disagree.
              </p>
              <p>
                At a textile manufacturer running 27 looms, I was asked to fix the spreadsheets.
                The spreadsheets were not the problem, so I built the system that replaced them. It
                took over the work of five back-office roles and has run the mill’s daily
                operations for more than ten months.
              </p>
              <p>
                Since then I have built the operating platform for a client’s multi-channel
                ecommerce brand, and a set of products you can open and use yourself.
              </p>
              <p>
                I work the same way every time. I find where manual work is costing the business,
                build a system around how that business runs, and put AI agents on the routine
                work so people can spend their time on decisions.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 mt-10">
              <Link href="/work" className="inline-flex items-center gap-2 text-sm text-text-primary hover:text-text-muted transition-colors min-h-[44px]">
                <span>See the work</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-text-muted hover:text-text-primary transition-colors min-h-[44px]"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FinalCta />
    </div>
  );
}
