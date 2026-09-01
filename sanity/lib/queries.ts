// sanity/lib/queries.ts

export const allArticlesQuery = `*[_type == "article"] | order(publishedAt desc) {
  title,
  "slug": slug.current,
  category,
  excerpt,
  readTime,
  publishedAt,
  featured,
  keywords
}`;

export const featuredArticlesQuery = `*[_type == "article" && featured == true] | order(publishedAt desc) [0...3] {
  title,
  "slug": slug.current,
  category,
  excerpt,
  readTime,
  publishedAt
}`;

export const articleBySlugQuery = `*[_type == "article" && slug.current == $slug][0] {
  title,
  "slug": slug.current,
  category,
  excerpt,
  body,
  readTime,
  publishedAt,
  keywords,
  seo {
    metaTitle,
    metaDescription,
    canonicalUrl
  }
}`;

export const allCaseStudiesQuery = `*[_type == "caseStudy"] | order(publishedAt desc) {
  title,
  "slug": slug.current,
  industry,
  client,
  liveUrl,
  problem,
  solution,
  results[] {
    metric,
    value,
    label
  },
  tools,
  publishedAt
}`;

export const featuredCaseStudiesQuery = `*[_type == "caseStudy" && featured == true] | order(publishedAt desc) {
  title,
  "slug": slug.current,
  industry,
  client,
  liveUrl,
  problem,
  solution,
  results[] {
    metric,
    value,
    label
  }
}`;

export const caseStudyBySlugQuery = `*[_type == "caseStudy" && slug.current == $slug][0] {
  title,
  "slug": slug.current,
  industry,
  client,
  liveUrl,
  problem,
  solution,
  results[] {
    metric,
    value,
    label
  },
  systemScreenshots[] {
    asset->{ url },
    caption
  },
  architectureNote,
  tools,
  publishedAt
}`;
