// sanity/lib/client.ts
import { createClient } from '@sanity/client';
import { Article, CaseStudy } from '@/lib/types';

// Standard Sanity Client configuration (configured with environment placeholders)
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-03-01',
  useCdn: true,
  token: process.env.SANITY_API_TOKEN,
});

// Mock Articles Data
const MOCK_ARTICLES: Article[] = [
  {
    title: 'Why Spreadsheets are the Secret Bottleneck in $50M Companies',
    slug: 'spreadsheets-bottleneck-manufacturing',
    category: 'Observations',
    excerpt: 'Many high-revenue firms run their inventory and scheduling on brittle spreadsheets. Here is the operational impact and how to structure a database-backed alternative.',
    readTime: 6,
    publishedAt: '2026-07-01T08:00:00.000Z',
    seo: {
      metaTitle: 'Spreadsheet Bottlenecks in Mid-Market Firms | Arslan Rehmani',
      metaDescription: 'Discover how running supply chain operations on Excel slows down execution and increases operational costs for manufacturers.'
    },
    body: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Every manual spreadsheet is a operational risk waiting to scale. In mid-market manufacturing companies doing $50M+ in annual revenue, it is not uncommon to find critical parts lists, production schedules, and dispatch plans managed in single-user Excel files.'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'This structure creates human bottlenecks, duplicate entries, and data silos. Replacing these with automated database architectures removes coordination costs and speeds up workflows by up to 80%.'
          }
        ]
      }
    ]
  },
  {
    title: 'Designing Fail-Safe AI Agents for ERP Workflows',
    slug: 'designing-failsafe-ai-agents',
    category: 'Framework',
    excerpt: 'Operational systems cannot afford hallucinations. This blueprint shows how to wrap LLM integrations with hard-coded schemas and validation layers.',
    readTime: 8,
    publishedAt: '2026-06-25T10:00:00.000Z',
    seo: {
      metaTitle: 'Fail-Safe AI Agent Design | Arslan Rehmani',
      metaDescription: 'A technical blueprint for integrating AI agents in enterprise resource systems without risking data corruption or hallucinations.'
    },
    body: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'AI agents must operate inside strict boundaries. When an agent is responsible for parsing purchase orders and entering them into an ERP, there is zero margin for error.'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Our framework uses structured JSON schemas for all model outputs, coupled with automated data validators that reject any outputs that fail integrity checks before they reach the main database.'
          }
        ]
      }
    ]
  },
  {
    title: 'Automating Financial Reconciliation: A Case Study',
    slug: 'automating-financial-reconciliation',
    category: 'Build Log',
    excerpt: 'How we reduced end-of-month bank reconciliation time from 3 full workdays to an automated 12-minute script for an international trading entity.',
    readTime: 5,
    publishedAt: '2026-06-18T14:30:00.000Z',
    seo: {
      metaTitle: 'Reconciliation Automation Blueprint | Arslan Rehmani',
      metaDescription: 'Learn how to construct scripts that match ledger lines to banking APIs automatically, cutting operational timelines.'
    },
    body: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Bank reconciliations are traditionally slow. Combining multiple transaction feeds, dealing with currency rates, and auditing invoices manually drains staff time.'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'By implementing automated matching algorithms that ingest daily banking API exports, we created a system that matches 98% of line items instantly, leaving only exceptions for human review.'
          }
        ]
      }
    ]
  }
];

// Mock Case Studies Data
const MOCK_CASE_STUDIES: CaseStudy[] = [
  {
    title: 'TextileMode ERP',
    slug: 'textilemode-erp',
    industry: 'Textiles & Manufacturing',
    client: 'TextileMode Manufacturing',
    problem: 'Daily scheduling and production routing took a team of 4 coordinators over 48 hours to plan and balance across loom capacities every week, leading to production backlogs.',
    solution: 'Built a custom, lightweight Next.js ERP containing capacity matching algorithms that dynamically routes jobs based on loom speeds, yarn availability, and order dates.',
    results: [
      { metric: 'Planning Time', value: '48hrs → 10hrs', label: 'Weekly administrative overhead' },
      { metric: 'Operational Savings', value: '$100,000', label: 'Saved annually in labor costs' }
    ],
    architectureNote: 'The core algorithm compiles machine limitations and yarn parameters, sorting order volumes through constraint-based linear optimization.',
    tools: ['Next.js', 'PostgreSQL', 'Tailwind CSS', 'Vercel'],
    systemScreenshots: [
      { caption: 'Production dashboard displaying loom capacities and routing timelines' }
    ],
    publishedAt: '2026-06-20T09:00:00.000Z',
    featured: true
  },
  {
    title: 'Belhide Ecommerce Intelligence',
    slug: 'belhide-ecommerce-intelligence',
    industry: 'Ecommerce & Retail',
    client: 'Belhide Leather Goods',
    problem: 'Sales tracking, shipping cost reconciliation, and ads analysis was scattered across seven dashboards, requiring daily copy-pasting into spreadsheets.',
    solution: 'Designed and deployed an integrated automated backend that pulls APIs daily from Shopify, Meta Ads, and DHL, centralizing metrics into a single source of truth.',
    results: [
      { metric: 'Systems Automated', value: '7 systems', label: 'Integrated data feeds' },
      { metric: 'Manual Reporting', value: 'Zero', label: 'Manual reporting spreadsheets required' }
    ],
    architectureNote: 'An automated cron task triggers API calls, normalizes shipping charges against ledger lines, and flags outliers.',
    tools: ['Next.js', 'Supabase', 'Shopify API', 'Meta Ads API', 'Resend'],
    systemScreenshots: [
      { caption: 'Profitability breakdown showing margin deviations' }
    ],
    publishedAt: '2026-06-15T09:00:00.000Z',
    featured: true
  }
];

// Client API wrappers to return static mock data
export async function getArticles(): Promise<Article[]> {
  return Promise.resolve(MOCK_ARTICLES);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const article = MOCK_ARTICLES.find((a) => a.slug === slug);
  return Promise.resolve(article || null);
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  return Promise.resolve(MOCK_CASE_STUDIES);
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  const caseStudy = MOCK_CASE_STUDIES.find((cs) => cs.slug === slug);
  return Promise.resolve(caseStudy || null);
}
