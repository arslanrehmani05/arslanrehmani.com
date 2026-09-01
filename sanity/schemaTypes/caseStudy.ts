// sanity/schemaTypes/caseStudy.ts
import { Rule } from '@sanity/types';

export const caseStudy = {
  name: 'caseStudy',
  title: 'Case Study & Proof System',
  type: 'document',
  fields: [
    { 
      name: 'title', 
      title: 'Project / System Title',
      type: 'string',
      validation: (rule: Rule) => rule.required(),
    },
    { 
      name: 'slug', 
      title: 'URL Slug',
      type: 'slug', 
      options: { source: 'title' },
      validation: (rule: Rule) => rule.required(),
    },
    { 
      name: 'industry', 
      title: 'Industry Sector (e.g. Textile Manufacturing, Ecommerce)',
      type: 'string',
      validation: (rule: Rule) => rule.required(),
    },
    { 
      name: 'client', 
      title: 'Client Descriptor (or anonymized identifier)', 
      type: 'string', 
      description: 'e.g. "TextileMode" or "Leather Goods Brand Client"',
      validation: (rule: Rule) => rule.required(),
    },
    { 
      name: 'liveUrl',
      title: 'Live Product Demo URL',
      type: 'url',
      description: 'e.g. https://erp.textilemode.com',
    },
    { 
      name: 'problem', 
      title: 'The Operational Problem (Before State)',
      type: 'text',
      rows: 4,
      validation: (rule: Rule) => rule.required(),
    },
    { 
      name: 'solution', 
      title: 'The Deployed Software Solution (After State)',
      type: 'text',
      rows: 4,
      validation: (rule: Rule) => rule.required(),
    },
    { 
      name: 'results', 
      title: 'Verifiable Quantitative Results',
      type: 'array', 
      validation: (rule: Rule) => rule.required().min(1),
      of: [{ 
        type: 'object', 
        fields: [
          { name: 'metric', title: 'Metric Name (e.g., Roles Replaced)', type: 'string', validation: (rule: Rule) => rule.required() },
          { name: 'value', title: 'Metric Hard Number (e.g., 5, 40+ hrs)', type: 'string', validation: (rule: Rule) => rule.required() },
          { name: 'label', title: 'Sub-label (e.g., By custom ERP)', type: 'string', validation: (rule: Rule) => rule.required() }
        ] 
      }]
    },
    { 
      name: 'systemScreenshots', 
      title: 'System Screenshots & Interface Previews',
      type: 'array', 
      of: [{ 
        type: 'image', 
        options: { hotspot: true },
        fields: [
          { name: 'caption', title: 'Image Caption / Description', type: 'string' }
        ] 
      }]
    },
    { 
      name: 'architectureNote', 
      title: 'Technical Architecture & Algorithm Breakdown',
      type: 'text',
      rows: 5,
    },
    { 
      name: 'tools', 
      title: 'Technologies Deployed',
      type: 'array', 
      of: [{ type: 'string' }],
    },
    { 
      name: 'publishedAt', 
      title: 'Publication Date',
      type: 'datetime',
      validation: (rule: Rule) => rule.required(),
    },
    { 
      name: 'featured', 
      title: 'Featured Case Study (Shown on Homepage)',
      type: 'boolean',
      initialValue: true,
    }
  ]
};
