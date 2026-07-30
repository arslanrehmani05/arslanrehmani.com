// app/contact/page.tsx
import type { Metadata } from 'next';
import ContactClient from './contact-client';

export const metadata: Metadata = {
  title: 'Contact | Arslan Rehmani — Operational AI Systems',
  description: 'Start a conversation about custom operational software, ERP implementation, business automation, speaking, or media inquiries.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact | Arslan Rehmani — Operational AI Systems',
    description: 'Direct purpose-driven business emails and contact form for operational audits, custom software builds, speaking engagements, and media inquiries.',
    url: 'https://arslanrehmani.com/contact',
    siteName: 'Arslan Rehmani',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Arslan Rehmani',
    description: 'Get in touch for custom operational ERP builds, business automation, or strategic consulting.',
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
