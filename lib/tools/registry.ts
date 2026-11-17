// lib/tools/registry.ts
// The complete list of tools on the site. The tools index, the sitemap and the
// "related tools" links all read from here. See TOOLS-SYSTEM.md before changing it.

export type ToolCategory = 'cost' | 'finance' | 'ecommerce' | 'manufacturing' | 'data' | 'planning';

export interface ToolEntry {
  slug: string;
  name: string;
  category: ToolCategory;
  /** The question the buyer is asking, in their words. */
  question: string;
  /** One line on what the tool gives back. */
  summary: string;
  /** 'framework' tools use components/tools/*. 'legacy' tools predate it and are due a migration. */
  build: 'framework' | 'legacy';
}

export const categoryLabels: Record<ToolCategory, string> = {
  cost: 'What manual work costs',
  finance: 'Finance and month-end',
  ecommerce: 'Ecommerce',
  manufacturing: 'Manufacturing',
  data: 'Spreadsheets and data',
  planning: 'Deciding what to do',
};

export const categoryOrder: ToolCategory[] = ['cost', 'finance', 'ecommerce', 'manufacturing', 'data', 'planning'];

export const tools: ToolEntry[] = [
  {
    slug: 'calculator',
    name: 'Manual-work cost calculator',
    category: 'cost',
    question: 'What is manual work costing us each year?',
    summary: 'A yearly figure for the hours your team spends on manual work and on fixing its errors.',
    build: 'legacy',
  },
  {
    slug: 'process-mapper',
    name: 'Process mapper',
    category: 'cost',
    question: 'Where does this workflow slow down?',
    summary: 'Describe one workflow and see where the manual steps and handoffs are.',
    build: 'legacy',
  },
  {
    slug: 'month-end-close',
    name: 'Month-end close calculator',
    category: 'finance',
    question: 'What does closing the books cost us?',
    summary: 'The yearly cost of your close, and what a faster close would give back.',
    build: 'framework',
  },
  {
    slug: 'reconciliation',
    name: 'Reconciliation gap checker',
    category: 'finance',
    question: 'Which of these records do not match?',
    summary: 'Compare two sets of records and find the lines that disagree.',
    build: 'legacy',
  },
  {
    slug: 'channel-profit',
    name: 'Channel profit calculator',
    category: 'ecommerce',
    question: 'Which sales channel actually makes money?',
    summary: 'Profit per channel after fees, fulfilment, ads and returns.',
    build: 'framework',
  },
  {
    slug: 'stock-cost',
    name: 'Stock cost calculator',
    category: 'ecommerce',
    question: 'What are slow stock and stockouts costing us?',
    summary: 'The yearly cost of holding stock that does not move and running out of stock that does.',
    build: 'framework',
  },
  {
    slug: 'production-loss',
    name: 'Production loss calculator',
    category: 'manufacturing',
    question: 'How much output are our machines losing?',
    summary: 'Machine time lost to stoppages, slow running and rejects, and what it is worth.',
    build: 'framework',
  },
  {
    slug: 'readiness',
    name: 'Spreadsheet risk check',
    category: 'data',
    question: 'Have we outgrown our spreadsheets?',
    summary: 'Twelve questions that show whether a spreadsheet has become a risk to the business.',
    build: 'legacy',
  },
  {
    slug: 'scanner',
    name: 'Data quality scanner',
    category: 'data',
    question: 'How clean is this data?',
    summary: 'Paste a CSV and find the blanks, duplicates and bad dates before they reach your books.',
    build: 'legacy',
  },
  {
    slug: 'automation-finder',
    name: 'Automation finder',
    category: 'planning',
    question: 'Which of our tasks should be automated first?',
    summary: 'List your tasks and get them ranked, with the right approach for each.',
    build: 'framework',
  },
  {
    slug: 'hire-buy-build',
    name: 'Hire, buy or build',
    category: 'planning',
    question: 'Should we hire, buy software or build a system?',
    summary: 'The total cost of each option over the years you choose, side by side.',
    build: 'framework',
  },
];

export function getTool(slug: string): ToolEntry {
  const tool = tools.find((t) => t.slug === slug);
  if (!tool) throw new Error(`Unknown tool: ${slug}`);
  return tool;
}

export function relatedTools(slug: string, limit = 3): ToolEntry[] {
  const current = getTool(slug);
  const sameCategory = tools.filter((t) => t.slug !== slug && t.category === current.category);
  const others = tools.filter((t) => t.slug !== slug && t.category !== current.category);
  return [...sameCategory, ...others].slice(0, limit);
}

export function toolMetadata(slug: string) {
  const tool = getTool(slug);
  return {
    title: tool.name,
    description: `${tool.question} ${tool.summary}`,
    alternates: { canonical: `/tools/${tool.slug}` },
  };
}
