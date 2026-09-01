// sanity/lib/client.ts
import { createClient } from '@sanity/client';
import { Article, CaseStudy } from '@/lib/types';
import {
  allArticlesQuery,
  articleBySlugQuery,
  allCaseStudiesQuery,
  caseStudyBySlugQuery,
} from './queries';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export const isSanityConfigured = Boolean(projectId && projectId !== 'placeholder-id');

export const client = isSanityConfigured
  ? createClient({
      projectId: projectId!,
      dataset,
      apiVersion: '2024-03-01',
      useCdn: process.env.NODE_ENV === 'production',
      token: process.env.SANITY_API_TOKEN,
    })
  : null;

// Fallback Mock Articles Data (used when Sanity project is unconfigured or empty)
const MOCK_ARTICLES: Article[] = [
  {
    title: 'Why Spreadsheets are the Secret Bottleneck in $50M Companies',
    slug: 'spreadsheets-bottleneck-manufacturing',
    category: 'Observations',
    excerpt: 'Many high-revenue firms run their inventory and scheduling on brittle spreadsheets. Here is the operational impact and how to structure a database-backed alternative.',
    readTime: 6,
    publishedAt: '2026-07-01T08:00:00.000Z',
    featured: true,
    keywords: ['manufacturing erp', 'spreadsheet automation', 'operational efficiency'],
    seo: {
      metaTitle: 'Spreadsheet Bottlenecks in Mid-Market Firms | Arslan Rehmani',
      metaDescription: 'Discover how running supply chain operations on Excel slows down execution and increases operational costs for manufacturers.'
    },
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Every manual spreadsheet is an operational risk waiting to scale. In mid-market manufacturing companies doing $50M+ in annual revenue, it is not uncommon to find critical parts lists, production schedules, and dispatch plans managed in single-user Excel files.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'The Silent Cost of Disconnected Spreadsheets' }]
      },
      {
        _type: 'block',
        style: 'normal',
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
    featured: true,
    keywords: ['ai agents', 'erp architecture', 'llm validation', 'fail-safe software'],
    seo: {
      metaTitle: 'Fail-Safe AI Agent Design Blueprint | Arslan Rehmani',
      metaDescription: 'A technical blueprint for integrating AI agents in enterprise resource systems without risking data corruption or hallucinations.'
    },
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'AI agents must operate inside strict boundaries. When an agent is responsible for parsing purchase orders and entering them into an ERP, there is zero margin for error.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Schema Validation & Guardrails' }]
      },
      {
        _type: 'block',
        style: 'normal',
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
    keywords: ['financial reconciliation', 'python script automation', 'banking api'],
    seo: {
      metaTitle: 'Reconciliation Automation Blueprint | Arslan Rehmani',
      metaDescription: 'Learn how to construct scripts that match ledger lines to banking APIs automatically, cutting operational timelines.'
    },
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Bank reconciliations are traditionally slow. Combining multiple transaction feeds, dealing with currency rates, and auditing invoices manually drains staff time.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
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

// Fallback Mock Case Studies Data
const MOCK_CASE_STUDIES: CaseStudy[] = [
  {
    title: 'TextileMode ERP',
    slug: 'textilemode-erp',
    industry: 'Textile Manufacturing',
    client: 'TextileMode',
    liveUrl: 'https://erp.textilemode.com',
    problem: 'A 27-loom textile manufacturer ran production planning, loom allocation, and financial reporting on paper and spreadsheets — 5 employees spending 40+ hours a week moving numbers by hand.',
    solution: 'A custom ERP — 5 modules and 11 analytical reports covering production, allocation, and finance — that runs the operation end to end. Live at erp.textilemode.com.',
    results: [
      { metric: 'Weekly Manual Work', value: '40+ hrs', label: 'Eliminated' },
      { metric: 'Roles Replaced', value: '5', label: 'By software' },
      { metric: 'In Production', value: '10+ months', label: 'With real financial data' }
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
    title: 'Belhide Operational Stack',
    slug: 'belhide-operational-stack',
    industry: 'Multi-channel Ecommerce',
    client: 'Belhide Leather Goods',
    liveUrl: 'https://erp.belhide.com',
    problem: 'Running a leather goods brand across Shopify, Amazon, Analytics, and Search Console meant every morning started with logging into four dashboards and stitching the picture together by hand.',
    solution: 'One operational platform that connects all four channels, generates an AI daily briefing, and automates fulfillment routing, shipping cost auditing, and ad analysis. Live at erp.belhide.com.',
    results: [
      { metric: 'Channels Unified', value: '4', label: 'Shopify, Amazon, GA, GSC' },
      { metric: 'AI Briefings', value: 'Daily', label: 'Generated automatically' },
      { metric: 'Manual Reports', value: '0', label: 'Since launch' }
    ],
    architectureNote: 'An automated cron task triggers API calls, normalizes shipping charges against ledger lines, and flags outliers.',
    tools: ['Next.js', 'Supabase', 'Shopify API', 'Meta Ads API'],
    systemScreenshots: [
      { caption: 'Profitability breakdown showing margin deviations' }
    ],
    publishedAt: '2026-06-15T09:00:00.000Z',
    featured: true
  }
];

// Fetching functions with automatic fallback
export async function getArticles(): Promise<Article[]> {
  if (client) {
    try {
      const data = await client.fetch<Article[]>(allArticlesQuery);
      if (data && data.length > 0) return data;
    } catch (err) {
      console.warn('Sanity fetch failed, falling back to mock articles:', err);
    }
  }
  return Promise.resolve(MOCK_ARTICLES);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  if (client) {
    try {
      const article = await client.fetch<Article | null>(articleBySlugQuery, { slug });
      if (article) return article;
    } catch (err) {
      console.warn(`Sanity fetch for slug ${slug} failed, checking mock:`, err);
    }
  }
  const article = MOCK_ARTICLES.find((a) => a.slug === slug);
  return Promise.resolve(article || null);
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  if (client) {
    try {
      const data = await client.fetch<CaseStudy[]>(allCaseStudiesQuery);
      if (data && data.length > 0) return data;
    } catch (err) {
      console.warn('Sanity fetch failed, falling back to mock case studies:', err);
    }
  }
  return Promise.resolve(MOCK_CASE_STUDIES);
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  if (client) {
    try {
      const caseStudy = await client.fetch<CaseStudy | null>(caseStudyBySlugQuery, { slug });
      if (caseStudy) return caseStudy;
    } catch (err) {
      console.warn(`Sanity fetch for case study ${slug} failed, checking mock:`, err);
    }
  }
  const caseStudy = MOCK_CASE_STUDIES.find((cs) => cs.slug === slug);
  return Promise.resolve(caseStudy || null);
}
