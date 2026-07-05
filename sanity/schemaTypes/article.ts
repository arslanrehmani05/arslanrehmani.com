// sanity/schemaTypes/article.ts
import { Rule } from '@sanity/types';

export const article = {
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    { 
      name: 'title', 
      type: 'string', 
      validation: (rule: Rule) => rule.required() 
    },
    { 
      name: 'slug', 
      type: 'slug', 
      options: { source: 'title' } 
    },
    { 
      name: 'category', 
      type: 'string', 
      options: { 
        list: ['Case Study', 'Framework', 'Build Log', 'Observations'] 
      } 
    },
    { 
      name: 'excerpt', 
      type: 'text', 
      rows: 3 
    },
    { 
      name: 'body', 
      type: 'array', 
      of: [{ type: 'block' }, { type: 'image' }] 
    },
    { 
      name: 'readTime', 
      type: 'number', 
      description: 'Minutes to read' 
    },
    { 
      name: 'publishedAt', 
      type: 'datetime' 
    },
    { 
      name: 'seo', 
      type: 'object', 
      fields: [
        { name: 'metaTitle', type: 'string' },
        { name: 'metaDescription', type: 'text' }
      ]
    }
  ]
};
