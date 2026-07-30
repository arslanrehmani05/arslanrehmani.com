// lib/emails.ts

export interface BusinessEmail {
  id: string;
  email: string;
  label: string;
  purpose: string;
  description: string;
}

export const BUSINESS_EMAILS: Record<string, BusinessEmail> = {
  direct: {
    id: 'direct',
    email: 'arslan@arslanrehmani.com',
    label: 'Direct Contact',
    purpose: 'Direct communication with Arslan',
    description: 'For direct communications, personal introductions, and strategic discussions with Arslan Rehmani.',
  },
  general: {
    id: 'general',
    email: 'hello@arslanrehmani.com',
    label: 'General Inquiries',
    purpose: 'General website inquiries, introductions, and first contact',
    description: 'For general website inquiries, informal introductions, initial hellos, and general questions.',
  },
  business: {
    id: 'business',
    email: 'contact@arslanrehmani.com',
    label: 'Business & Consulting',
    purpose: 'Business inquiries, consulting requests, partnerships, collaborations, and client communication',
    description: 'For business inquiries, operational audits, consulting requests, partnerships, and new client engagements.',
  },
  projects: {
    id: 'projects',
    email: 'projects@arslanrehmani.com',
    label: 'Projects & Implementations',
    purpose: 'Project-specific discussions, ongoing client work, software projects, and implementation communication',
    description: 'For ongoing project work, software build specifications, architecture reviews, and technical implementations.',
  },
  media: {
    id: 'media',
    email: 'media@arslanrehmani.com',
    label: 'Media & Speaking',
    purpose: 'Podcast invitations, interviews, speaking engagements, press, conferences, and media inquiries',
    description: 'For podcast invitations, keynote speaking requests, press inquiries, conference panels, and interviews.',
  },
};

export const EMAIL_LIST = Object.values(BUSINESS_EMAILS);
