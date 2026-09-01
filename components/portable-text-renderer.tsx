'use client';

import { PortableText as BasePortableText, PortableTextComponents } from '@portabletext/react';

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="text-2xl md:text-3xl font-black text-text-primary mt-12 mb-4 tracking-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold text-text-primary mt-8 mb-3 tracking-tight">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-accent-gold pl-6 py-2 my-6 italic text-text-primary bg-bg-secondary/40 rounded-r-xl">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="text-base text-text-muted leading-relaxed mb-6 font-normal">
        {children}
      </p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 mb-6 text-text-muted pl-4">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 mb-6 text-text-muted pl-4">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold text-text-primary">{children}</strong>,
    em: ({ children }) => <em className="italic text-text-primary">{children}</em>,
    code: ({ children }) => (
      <code className="bg-bg-secondary text-accent-gold px-2 py-1 rounded text-xs font-mono border border-border-color/60">
        {children}
      </code>
    ),
    link: ({ value, children }) => {
      const target = value?.openInNewTab ? '_blank' : undefined;
      const rel = value?.openInNewTab ? 'noopener noreferrer' : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={rel}
          className="text-accent-gold hover:text-accent-gold-hover underline underline-offset-4 transition-colors"
        >
          {children}
        </a>
      );
    },
  },
};

export default function ArticlePortableText({ value }: { value: any }) {
  if (!value) return null;
  return <BasePortableText value={value} components={components} />;
}
