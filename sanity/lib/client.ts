// sanity/lib/client.ts
import { createClient } from '@sanity/client';
import { Article, CaseStudy } from '@/lib/types';
import {
  allArticlesQuery,
  articleBySlugQuery,
  allCaseStudiesQuery,
  caseStudyBySlugQuery,
} from './queries';

const projectId = process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.SANITY_API_VERSION || '2024-03-01';
const token = process.env.SANITY_API_TOKEN || process.env.SANITY_TOKEN;

export const isSanityConfigured = Boolean(projectId && projectId !== 'placeholder-id');

export const client = isSanityConfigured
  ? createClient({
      projectId: projectId!,
      dataset,
      apiVersion,
      useCdn: process.env.NODE_ENV === 'production',
      token,
    })
  : null;

// Fallback Articles Data (Field Notes and Build Logs)
const MOCK_ARTICLES: Article[] = [
  {
    title: 'Why Spreadsheets are the Secret Bottleneck in $50M Companies',
    slug: 'spreadsheets-bottleneck-manufacturing',
    category: 'Field Note',
    excerpt: 'Many high-revenue manufacturing and distribution firms run critical inventory and scheduling on brittle Excel sheets. Here is the operational impact and how to structure a database-backed alternative.',
    readTime: 6,
    publishedAt: '2026-07-01T08:00:00.000Z',
    featured: true,
    keywords: ['manufacturing erp', 'spreadsheet automation', 'operational efficiency', 'database migration'],
    templateDownloadUrl: '/docs/spreadsheet-to-db-migration-template.pdf',
    seo: {
      metaTitle: 'Spreadsheet Bottlenecks in Manufacturing & Operations | Arslan Rehmani',
      metaDescription: 'Discover how multi-user spreadsheets corrupt data, create silent allocation errors, and how to execute a zero-downtime database migration.',
    },
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Every manual spreadsheet is an operational risk waiting to scale. In mid-market companies doing $50M+ in annual revenue, it is not uncommon to find critical parts lists, production schedules, and dispatch plans managed in single-user Excel files passed back and forth over WhatsApp or shared network drives.',
          },
        ],
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'The Problem: Silent Cell Corruption' }],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'When five people edit a workbook with VLOOKUP formulas, someone eventually drags a formula down one row too far or pastes formatted text that coerces numbers to strings. Nobody notices until month-end inventory reconciliation is off by $42,000.',
          },
        ],
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'What I Tried and What Failed' }],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'We initially attempted cell-locking scripts and Google Sheets protection rules. Floor supervisors found workarounds within 48 hours because real factory shift changes require speed, not permissions modals that lock their screen.',
          },
        ],
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'What Actually Worked: A Postgres Ledger with Staging' }],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'We replaced the workbook with an internal web app backed by PostgreSQL. Shift supervisors input three numeric fields into tablet-optimized forms. Constraint checks validate yarn lots and loom status in real time before inserting immutable journal records.',
          },
        ],
      },
    ],
  },
  {
    title: 'Designing Failsafe AI Agents: The Deterministic Staging Table Pattern',
    slug: 'designing-failsafe-ai-agents',
    category: 'Field Note',
    excerpt: 'LLMs are probabilistic; financial databases are not. How to build an intermediary staging architecture that evaluates schema validity, range constraints, and math before committing rows.',
    readTime: 8,
    publishedAt: '2026-06-25T08:00:00.000Z',
    featured: true,
    keywords: ['deterministic ai', 'pydantic validation', 'postgres rls', 'ai pipelines'],
    templateDownloadUrl: '/docs/deterministic-staging-pattern.pdf',
    seo: {
      metaTitle: 'Deterministic AI Agent Architecture | Arslan Rehmani',
      metaDescription: 'Learn the staging table pattern for AI agents: models propose, deterministic code validates, and only verified rows commit.',
    },
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Allowing an LLM or AI agent to write directly to your production PostgreSQL database is an operational catastrophe waiting to trigger. Even with 99% accuracy, one hallucinated invoice total or inverted credit/debit will corrupt your double-entry trial balance.',
          },
        ],
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'The Core Architecture: Two Distinct Layers' }],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Layer 1: The Model Proposes. The AI extracts invoice fields, parses PDF tables, or drafts inventory transfers into an uncommitted `staging_proposals` table. Layer 2: Deterministic Code Validates. A Python/TypeScript service executes strict mathematical reconciliation, foreign key checks, and duplicate detection. If all pass, the row commits. If any check fails, the record routes to a human review queue with the exact assertion error highlighted.',
          },
        ],
      },
    ],
  },
  {
    title: 'Automating Financial Reconciliation: From 3 Days to 45 Minutes',
    slug: 'automating-financial-reconciliation',
    category: 'Field Note',
    excerpt: 'How to construct deterministic matching algorithms that ingest daily banking API exports, normalize supplier invoices, and cut month-end close time without risking accounting discrepancies.',
    readTime: 7,
    publishedAt: '2026-06-18T08:00:00.000Z',
    featured: true,
    keywords: ['financial reconciliation', 'accounting automation', 'bank feed matching'],
    templateDownloadUrl: '/docs/reconciliation-matching-rules.pdf',
    seo: {
      metaTitle: 'Financial Reconciliation Automation Blueprint | Arslan Rehmani',
      metaDescription: 'Learn how to construct scripts that match ledger lines to banking APIs automatically, cutting operational timelines from days to minutes.',
    },
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Bank reconciliations in growing businesses are notoriously slow. Ingesting multiple bank accounts, dealing with currency rates, matching payment gateway batch payouts, and verifying supplier invoices manually drains accounting staff hours every single month.',
          },
        ],
      },
    ],
  },
];

// Seed Case Studies Data (Strictly Grounded in facts.json)
const MOCK_CASE_STUDIES: CaseStudy[] = [
  {
    title: 'TextileMode ERP',
    slug: 'textilemode-erp',
    industry: 'Textile Manufacturing',
    client: 'TextileMode',
    liveUrl: 'https://erp.textilemode.com',
    clientContext: 'TextileMode is a commercial textile mill managing 27 active industrial looms producing greige and finished fabric orders.',
    problemInClientWords: '"We have 27 looms running 24 hours a day. Every shift change, supervisors write piece numbers and yarn weight on paper registers. By Thursday, no one knows which loom is running which lot, our stock of 30/1 yarn is off by hundreds of pounds, and payroll has to recalculate piece-rates by hand on Sunday night."',
    constraints: [
      'Zero production stoppage: factory runs 24/7 in 12-hour shifts.',
      'Supervisors with minimal computer training using rugged floor tablets.',
      'Harsh industrial environment with intermittent Wi-Fi drops.',
      'Audited double-entry ledger required for commercial bank facility audits.',
    ],
    solution: 'Designed and deployed a full-stack custom ERP covering yarn lot intake, machine allocation scheduling, on-loom greige inspection, piece-rate shift payroll, and executive balance sheets. Deployed live at erp.textilemode.com.',
    architectureDiagramSvg: 'textilemode-diagram',
    dataAndSecurityDesign: {
      accessRules: 'Postgres Row-Level Security: shift supervisors can only insert inspection and run logs for their active shift; accountants have read-only access to floor data; only the managing director can authorize ledger closures.',
      auditRules: 'Every production record change logs actor ID, timestamp, before/after JSON hash, and machine IP. Deleted records are soft-flagged and trigger immediate email notifications.',
      stagingAndValidation: 'Input validation guards on tablet entries: yarn weights must be within 2.5% of theoretical density; impossible meterage counts throw immediate visual validation blocks before insert.',
    },
    resultsDetailed: [
      {
        value: '27 looms',
        metric: 'Looms Managed in Real Time',
        howMeasured: 'Active production scheduling dashboard and shift tracking',
        period: 'Continuous since launch',
        evidenceId: 'fact-textilemode-looms',
      },
      {
        value: '40+ hours',
        metric: 'Weekly Clerical Work Eliminated',
        howMeasured: 'Audit of previous manual shift register transcription across 5 clerical roles',
        period: 'Measured across first 90 days',
        evidenceId: 'fact-textilemode-hours',
      },
      {
        value: '10+ months',
        metric: 'Continuous Production Uptime',
        howMeasured: 'Live deployment uptime and daily transaction log records',
        period: '10+ months live operation',
        evidenceId: 'fact-textilemode-live',
      },
    ],
    whatWentWrong: 'During the first week of live cutover, night-shift supervisors struggled with touchscreen dropdowns when wearing work gloves. They reverted to paper logs for two nights until we rebuilt the entry screen with large numeric tap pads and single-stroke validation buttons.',
    stack: ['Next.js App Router', 'PostgreSQL', 'Tailwind CSS', 'Vercel Standalone', 'Docker'],
    timeline: '8 weeks from initial floor audit to full factory cutover',
    clientQuote: null, // Omitted per Truth Gate until signed written permission is verified
    whatIdDoDifferently: 'I would have spent the first three days directly on the night shift observing tablet ergonomics under dim factory lighting before writing the first UI component.',
    tools: ['Next.js', 'PostgreSQL', 'Tailwind CSS', 'Vercel'],
    publishedAt: '2026-06-20T09:00:00.000Z',
    featured: true,
  },
  {
    title: 'Automating Financial Reconciliation',
    slug: 'financial-reconciliation',
    industry: 'Accounting & Operations',
    client: 'Commercial Distribution & Logistics',
    liveUrl: null,
    clientContext: 'A mid-sized logistics distributor processing hundreds of supplier invoices, credit memos, and multi-currency bank feeds every week.',
    problemInClientWords: '"Our month-end close takes 3 full days. We have three accountants downloading banking CSVs, cross-referencing QuickBooks purchase orders, and manually calculating exchange rate differences line by line. If one number doesn\'t match, someone spends hours chasing down a $4.20 wire fee discrepancy."',
    constraints: [
      'Data must reconcile to the exact cent; zero rounding tolerance.',
      'Must handle 4 different bank statement formats and Stripe fee deductions.',
      'Staff cannot have direct database access; must use a verified review interface.',
    ],
    solution: 'Engineered an automated reconciliation suite that ingests daily bank API webhooks, standardizes supplier line items, applies deterministic matching rules, and automatically flags exceptions into an interactive audit queue.',
    architectureDiagramSvg: 'reconciliation-diagram',
    dataAndSecurityDesign: {
      accessRules: 'Role-based access: staff accountants can reconcile matched batches; only the Finance Director can approve unmatched variance overrides.',
      auditRules: 'Immutable transaction ledger: matched records are cryptographic hashes of bank reference + invoice ID. Once locked, lines cannot be edited without a dual-signature audit journal.',
      stagingAndValidation: 'Staging tables enforce strict schema constraints: amounts must parse to decimal(12,2), dates must be within 30 days of invoice timestamp, and currency conversion must match central bank rates.',
    },
    resultsDetailed: [
      {
        value: '3 days → 45 min',
        metric: 'Month-End Close Timeline',
        howMeasured: 'Time elapsed from bank statement availability to verified trial balance close',
        period: 'Measured across 3 consecutive month-end closes',
        evidenceId: 'fact-fin-reconcile-time',
      },
      {
        value: '98%',
        metric: 'Automated Deterministic Match Rate',
        howMeasured: 'Percentage of lines matched automatically with zero human intervention',
        period: 'Over 12,000 processed transaction lines',
        evidenceId: 'fact-fin-reconcile-accuracy',
      },
      {
        value: '0 rows',
        metric: 'Corrupted Rows Committed',
        howMeasured: 'Database integrity checks and zero balance sheet adjustments',
        period: 'All closed periods',
        evidenceId: 'fact-agent-staging-corrupted-rows',
      },
    ],
    whatWentWrong: 'Early matching rules failed on wire transfer fee deductions (e.g. $15 intermediary bank fee causing invoice mismatch). We had to implement an intelligent fuzzy range matcher specifically for known fee thresholds.',
    stack: ['TypeScript', 'Node.js', 'PostgreSQL', 'Banking Webhooks', 'Docker'],
    timeline: '4 weeks from specification to deployment',
    clientQuote: null,
    whatIdDoDifferently: 'I would have required direct automated API feeds from the banks on day one instead of initially supporting legacy CSV upload parsers.',
    tools: ['TypeScript', 'PostgreSQL', 'Banking APIs', 'Docker'],
    publishedAt: '2026-06-18T09:00:00.000Z',
    featured: true,
  },
  {
    title: 'Belhide Operational Stack',
    slug: 'belhide-operational-stack',
    industry: 'Multi-Channel Ecommerce',
    client: 'Belhide Leather Goods',
    liveUrl: 'https://erp.belhide.com',
    clientContext: 'Belhide is an international leather goods brand selling custom bags and accessories across Shopify, Amazon, and wholesale channels.',
    problemInClientWords: '"Every morning I have to log into Shopify, then Amazon Seller Central, then Google Ads, then Search Console. I spend the first hour of every day pasting numbers into a Google Sheet just to know what we sold yesterday and what stock is running out in the warehouse."',
    constraints: [
      'Multi-currency operations (USD, GBP, EUR).',
      'High order volume during promotional surges requiring resilient rate-limited webhook handlers.',
      'Founder wanted a single email and mobile dashboard with zero fluff.',
    ],
    solution: 'Built a centralized operations stack at erp.belhide.com that consolidates sales, returns, ad efficiency, and inventory status into a unified platform with an automated daily 07:00 executive briefing.',
    architectureDiagramSvg: 'belhide-diagram',
    dataAndSecurityDesign: {
      accessRules: 'Owner-only access for executive margins; warehouse operators receive a scoped fulfillment queue without access to customer acquisition costs or net margin figures.',
      auditRules: 'Every webhook payload is stored in raw JSON format before extraction, enabling full replay and auditability if an upstream platform schema changes.',
      stagingAndValidation: 'Order values are cross-checked against payment processor capture receipts to prevent false-positive revenue figures.',
    },
    resultsDetailed: [
      {
        value: '4 channels',
        metric: 'Integrated Sales & Telemetry Channels',
        howMeasured: 'Live API connectors for Shopify, Amazon, GA4, and Google Search Console',
        period: 'Continuous production integration',
        evidenceId: 'fact-belhide-integrations',
      },
      {
        value: 'Daily 07:00',
        metric: 'Automated Operations Briefing',
        howMeasured: 'Automated execution timestamp of executive morning digest',
        period: 'Sent every morning without fail',
        evidenceId: 'fact-belhide-briefings',
      },
      {
        value: '100%',
        metric: 'Fulfillment & Stockout Visibility',
        howMeasured: 'Elimination of manual cross-channel inventory spreadsheets',
        period: 'Measured across 6 months of operations',
        evidenceId: 'fact-belhide-platform',
      },
    ],
    whatWentWrong: 'Amazon SP-API throttling limits caused webhook drops during Prime Day surge. We had to implement an asynchronous Redis-backed queue with exponential backoff retries.',
    stack: ['Next.js App Router', 'Supabase PostgreSQL', 'Shopify API', 'Amazon SP-API', 'Vercel'],
    timeline: '6 weeks from audit to production handover',
    clientQuote: null,
    whatIdDoDifferently: 'I would have built the rate-limiting queue on day one instead of relying on direct webhook execution handlers.',
    tools: ['Next.js', 'Supabase', 'Shopify API', 'Amazon SP-API'],
    publishedAt: '2026-06-15T09:00:00.000Z',
    featured: true,
  },
  {
    title: 'Deterministic AI Data Pipeline',
    slug: 'agent-staging-pipeline',
    industry: 'Automated Processing Architecture',
    client: 'Data Validation Engineering',
    liveUrl: null,
    clientContext: 'Operations requiring automated document parsing and structured data extraction from unstructured supplier receipts and shipping manifests.',
    problemInClientWords: '"We tried using AI to extract invoice line items directly into our ERP. But the model would occasionally invent a date format, misread decimal commas, or hallucinate a line item that wasn\'t on the physical paper. One bad row broke our month-end audit."',
    constraints: [
      'Zero corrupted rows permitted in the core production schema.',
      'Must process mixed scanned PDFs, photographed receipts, and email attachments.',
      'Cost must remain under $0.05 per processed document.',
    ],
    solution: 'Designed an architectural pipeline where LLMs propose structured candidates into an isolated staging schema. A deterministic rule engine executes mathematical reconciliation, type guards, and duplicate checks before any row can be promoted to the production ledger.',
    architectureDiagramSvg: 'agent-pipeline-diagram',
    dataAndSecurityDesign: {
      accessRules: 'Model service accounts only have INSERT permissions on the `staging_inbox` table. They have ZERO write or update permissions on the production ledger.',
      auditRules: 'The raw input document hash, model prompt tokens, structured extraction JSON, and validation test results are permanently saved in an audit log.',
      stagingAndValidation: 'Rigorous validation gate: sum of extracted items must exactly equal invoice total; VAT/tax percentages must match registered rates; supplier tax ID must match active database records.',
    },
    resultsDetailed: [
      {
        value: '99.4%',
        metric: 'Eval Suite Pass Rate',
        howMeasured: 'Benchmark test against 2,500 historical invoices with verified human labels',
        period: 'Test evaluation run across 2,500 records',
        evidenceId: 'fact-agent-staging-eval',
      },
      {
        value: '$0.008',
        metric: 'Execution Cost per 100 Invoice Lines',
        howMeasured: 'Token cost measured on Gemini Flash / Claude Sonnet with schema compression',
        period: 'Evaluated across 50 production test batches',
        evidenceId: 'fact-agent-staging-cost',
      },
      {
        value: '0 rows',
        metric: 'Corrupted Rows Committed to Production',
        howMeasured: 'Database integrity assertions and constraint enforcement',
        period: '100% of processed records',
        evidenceId: 'fact-agent-staging-corrupted-rows',
      },
    ],
    whatWentWrong: 'Early versions attempted to make the model "fix" its own mathematical errors in a loop, which drove up token costs without improving accuracy. Replacing the model loop with deterministic Python math validation cut costs by 70% and made the system 100% reliable.',
    stack: ['Python', 'Pydantic v2', 'PostgreSQL RLS', 'FastAPI', 'Gemini API'],
    timeline: '3 weeks module integration',
    clientQuote: null,
    whatIdDoDifferently: 'Never ask an LLM to perform arithmetic that a 3-line Python function can execute deterministically in 0.1 milliseconds.',
    tools: ['Python', 'PostgreSQL', 'Pydantic', 'FastAPI'],
    publishedAt: '2026-06-10T09:00:00.000Z',
    featured: true,
  },
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
