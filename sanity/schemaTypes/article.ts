// sanity/schemaTypes/article.ts
import { Rule } from '@sanity/types';

export const article = {
  name: 'article',
  title: 'Article & Framework',
  type: 'document',
  fields: [
    { 
      name: 'title', 
      title: 'Article Title',
      type: 'string', 
      validation: (rule: Rule) => rule.required().min(10).max(120),
    },
    { 
      name: 'slug', 
      title: 'URL Slug',
      type: 'slug', 
      options: { source: 'title', maxLength: 96 },
      validation: (rule: Rule) => rule.required(),
    },
    { 
      name: 'category', 
      title: 'Category',
      type: 'string', 
      options: { 
        list: [
          { title: 'Framework & Blueprints', value: 'Framework' },
          { title: 'Build Logs & Systems', value: 'Build Log' },
          { title: 'Operational Observations', value: 'Observations' },
          { title: 'Deep Dives & Case Studies', value: 'Case Study' },
        ] 
      },
      validation: (rule: Rule) => rule.required(),
    },
    { 
      name: 'excerpt', 
      title: 'Summary / Excerpt for Search & Cards',
      type: 'text', 
      rows: 3,
      validation: (rule: Rule) => rule.required().max(280),
    },
    {
      name: 'featured',
      title: 'Featured Article on Homepage / Index Top',
      type: 'boolean',
      initialValue: false,
    },
    { 
      name: 'body', 
      title: 'Article Body Content',
      type: 'array', 
      of: [
        { 
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2 Section Headline', value: 'h2' },
            { title: 'H3 Subsection Headline', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet List', value: 'bullet' },
            { title: 'Numbered List', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'URL Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'Destination URL',
                    validation: (rule: Rule) =>
                      rule.uri({ scheme: ['http', 'https', 'mailto', 'tel'] }),
                  },
                  {
                    name: 'openInNewTab',
                    type: 'boolean',
                    title: 'Open in new tab',
                    initialValue: true,
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          title: 'Article Diagram / Screenshot',
          options: { hotspot: true },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Caption / Alt Text',
            },
          ],
        },
      ],
    },
    { 
      name: 'readTime', 
      title: 'Estimated Read Time (Minutes)',
      type: 'number', 
      initialValue: 5,
      validation: (rule: Rule) => rule.required().min(1),
    },
    { 
      name: 'publishedAt', 
      title: 'Publication Date',
      type: 'datetime',
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'keywords',
      title: 'SEO Keywords / Tags',
      type: 'array',
      of: [{ type: 'string' }],
    },
    { 
      name: 'seo', 
      title: 'Search Engine Optimization (SEO)',
      type: 'object', 
      fields: [
        { 
          name: 'metaTitle', 
          title: 'Meta Title (Defaults to Article Title)',
          type: 'string' 
        },
        { 
          name: 'metaDescription', 
          title: 'Meta Description (Defaults to Excerpt)',
          type: 'text',
          rows: 2,
        },
        {
          name: 'canonicalUrl',
          title: 'Canonical URL Override',
          type: 'url',
        },
      ]
    }
  ]
};
