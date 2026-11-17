// lib/content.ts
// Single source of truth for every client figure and product description on the site.
// Pages import from here so a number can never differ between two pages.
// Rule: nothing goes in this file unless it can be shown on a call or opened at a URL.

export interface Stat {
  value: string;
  label: string;
}

export interface CaseStudy {
  slug: string;
  client: string;
  sector: string;
  title: string;
  summary: string;
  situation: string;
  problems: string[];
  built: string[];
  results: Stat[];
  access: string;
}

export interface Product {
  id: string;
  name: string;
  sector: string;
  problem: string;
  description: string;
  basis?: string;
  url?: string;
}

// TextileMode is always first. Never reorder.
export const caseStudies: CaseStudy[] = [
  {
    slug: 'textile-mode',
    client: 'Textile Mode',
    sector: 'Textile manufacturing',
    title: 'One system running a 27-loom weaving mill',
    summary:
      'Production, yarn stock and the books were spread across paper registers and spreadsheets. One system now runs all three, and five back-office roles are no longer needed to keep them in step.',
    situation:
      'The brief was to fix the spreadsheets. The spreadsheets were not the problem: the same figures were being typed several times by different people, and nobody trusted a number until someone had checked it by hand. I built software for one department first, then extended it across the mill once it was in daily use.',
    problems: [
      'Production, yarn stock and accounts lived in separate spreadsheets and paper registers.',
      'The same figures were entered more than once, by different people, in different places.',
      'Closing the books meant reconciling those sheets against each other by hand.',
    ],
    built: [
      'Production tracking across all 27 looms.',
      'Yarn accounting, from intake through consumption.',
      'Financial reconciliation on the mill’s own ledgers.',
      'A daily briefing, written by an AI agent, on what needs attention.',
      'Five modules and eleven management reports in one system.',
    ],
    results: [
      { value: '5', label: 'Back-office roles replaced by one system' },
      { value: '40+', label: 'Hours of manual work removed every week' },
      { value: '27', label: 'Looms run from one system' },
      { value: '10+', label: 'Months live on real financial data' },
    ],
    access:
      'This system holds the client’s live financial data, so it is not open to the public. I walk through it on a call.',
  },
  {
    slug: 'belhide',
    client: 'Belhide',
    sector: 'Ecommerce',
    title: 'One operating screen for a multi-channel leather goods brand',
    summary:
      'A client selling through Shopify and Amazon had sales, stock, traffic and search data in four separate places. One platform now brings them together and briefs the team every morning.',
    situation:
      'Belhide sells leather goods across more than one storefront and marketplace. Each channel reported in its own dashboard, so a full picture of the business only existed when someone assembled it by hand.',
    problems: [
      'Sales, inventory, analytics and search data sat in four separate tools.',
      'A daily view of the business had to be compiled manually.',
      'Problems on one channel were found late, after they had cost money.',
    ],
    built: [
      'One platform connected to Shopify, Amazon, Google Analytics and Search Console.',
      'A daily briefing, written by an AI agent, covering what changed and what needs a decision.',
      'Automation for the routine work that used to move data between channels.',
    ],
    results: [
      { value: '4', label: 'Data sources in one operating screen' },
      { value: 'Daily', label: 'AI briefing delivered to the team' },
    ],
    access:
      'This platform runs on the client’s live sales data, so it is not open to the public. I walk through it on a call.',
  },
];

export const products: Product[] = [
  {
    id: 'loomworks',
    name: 'LoomWorks',
    sector: 'Manufacturing',
    problem: 'A factory floor run on registers and spreadsheets.',
    description:
      'A manufacturing ERP covering production tracking, yarn accounting, financial reconciliation and a daily AI briefing.',
    basis: 'Built on the system that runs a 27-loom mill.',
  },
  {
    id: 'brandpilot',
    name: 'BrandPilot',
    sector: 'Ecommerce',
    problem: 'A brand with every channel in a different dashboard.',
    description:
      'An ecommerce command centre: revenue, inventory, search and finance across storefronts and marketplaces in one screen, with a morning brief on what needs attention.',
    basis: 'Built on the platform that runs a client’s multi-channel brand.',
    url: 'https://brandpilot.arslanrehmani.com',
  },
  {
    id: 'marketlens',
    name: 'MarketLens',
    sector: 'Market intelligence',
    problem: 'Research that takes an analyst hours to assemble.',
    description:
      'A market terminal with live charts, portfolio tracking and an AI analyst that answers market questions in plain language.',
    url: 'https://marketlens.arslanrehmani.com',
  },
  {
    id: 'legality',
    name: 'Legality AI',
    sector: 'Legal documents',
    problem: 'Standard agreements that wait days for a first draft.',
    description:
      'Consulting agreements and commercial documents drafted in minutes by AI, reviewed by you, and downloaded as a PDF.',
    url: 'https://legality.arslanrehmani.com',
  },
];

// The headline figures shown on the homepage. All four come from the TextileMode engagement.
export const headlineStats: Stat[] = caseStudies[0].results;

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}
