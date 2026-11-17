import type { Metadata } from 'next';
import ContactForm from './contact-form';
import { BUSINESS_EMAILS } from '@/lib/emails';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Tell me what your operation looks like and where the friction is. I respond within 24 hours.',
  alternates: { canonical: '/contact' },
};

const nextSteps = [
  'I reply within 24 hours.',
  'We have a short call about how your operation runs today.',
  'You get a clear view of what is worth building, before any commitment.',
];

export default function ContactPage() {
  const contactEmail = BUSINESS_EMAILS.business.email;

  return (
    <section className="pt-16 md:pt-24 pb-20 md:pb-28">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
        <div className="md:col-span-5">
          <span className="eyebrow mb-4">Contact</span>
          <h1 className="headline text-4xl sm:text-5xl">Start the conversation.</h1>
          <p className="text-base md:text-lg text-text-muted leading-relaxed mt-6">
            Tell me what your operation looks like and where the friction is.
          </p>

          <ol className="mt-10 space-y-4">
            {nextSteps.map((step, idx) => (
              <li key={step} className="flex items-start gap-4 text-sm md:text-base text-text-muted leading-relaxed">
                <span className="text-xs font-mono text-text-subtle mt-1">0{idx + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>

          <p className="text-sm text-text-subtle mt-10">
            Prefer email?{' '}
            <a
              href={`mailto:${contactEmail}`}
              className="text-text-primary underline underline-offset-4 hover:text-text-muted transition-colors"
            >
              {contactEmail}
            </a>
          </p>
        </div>

        <div className="md:col-span-7">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
