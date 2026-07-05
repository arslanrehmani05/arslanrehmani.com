// lib/types.ts

export interface Article {
  title: string;
  slug: string;
  category: 'Case Study' | 'Framework' | 'Build Log' | 'Observations';
  excerpt: string;
  body: any; // Block Content
  readTime: number;
  publishedAt: string;
  seo?: {
    metaTitle: string;
    metaDescription: string;
  };
}

export interface CaseStudy {
  title: string;
  slug: string;
  industry: string;
  client: string;
  problem: string;
  solution: string;
  results: {
    metric: string;
    value: string;
    label: string;
  }[];
  systemScreenshots?: {
    url?: string;
    caption?: string;
  }[];
  architectureNote?: string;
  tools?: string[];
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
