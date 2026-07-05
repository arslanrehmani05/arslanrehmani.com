// sanity/schemaTypes/caseStudy.ts
export const caseStudy = {
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'slug', type: 'slug', options: { source: 'title' } },
    { name: 'industry', type: 'string' },
    { name: 'client', type: 'string', description: 'Client name or anonymous descriptor' },
    { name: 'problem', type: 'text' },
    { name: 'solution', type: 'text' },
    { 
      name: 'results', 
      type: 'array', 
      of: [{ 
        type: 'object', 
        fields: [
          { name: 'metric', type: 'string' },
          { name: 'value', type: 'string' },
          { name: 'label', type: 'string' }
        ] 
      }]
    },
    { 
      name: 'systemScreenshots', 
      type: 'array', 
      of: [{ 
        type: 'image', 
        fields: [
          { name: 'caption', type: 'string' }
        ] 
      }]
    },
    { name: 'architectureNote', type: 'text' },
    { name: 'tools', type: 'array', of: [{ type: 'string' }] },
    { name: 'publishedAt', type: 'datetime' },
    { name: 'featured', type: 'boolean' }
  ]
};
