// lib/types.ts

export interface Article {
  title: string;
  slug: string;
  category: 'Case Study' | 'Framework' | 'Build Log' | 'Observations' | 'Field Note';
  excerpt: string;
  body: any; // Block Content
  readTime: number;
  publishedAt: string;
  featured?: boolean;
  keywords?: string[];
  templateDownloadUrl?: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    canonicalUrl?: string;
  };
}

export interface CaseStudy {
  title: string;
  slug: string;
  industry: string;
  client: string;
  liveUrl?: string | null;
  clientContext: string;
  problemInClientWords: string;
  constraints: string[];
  solution: string;
  architectureDiagramSvg?: string;
  dataAndSecurityDesign: {
    accessRules: string;
    auditRules: string;
    stagingAndValidation: string;
  };
  resultsDetailed: {
    value: string;
    metric: string;
    howMeasured: string;
    period: string;
    evidenceId?: string;
  }[];
  whatWentWrong: string;
  stack: string[];
  timeline: string;
  clientQuote?: string | null;
  whatIdDoDifferently: string;
  systemScreenshots?: {
    url?: string;
    caption?: string;
  }[];
  architectureNote?: string;
  tools?: string[];
  results?: {
    metric: string;
    value: string;
    label: string;
  }[];
  publishedAt?: string;
  featured?: boolean;
}

export interface Lead {
  id?: string;
  email: string;
  source: string;
  created_at?: string;
}

export interface ToolSubmission {
  id?: string;
  tool: string;
  inputs: any;
  report: string;
  email: string;
  created_at?: string;
}
