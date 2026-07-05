// sanity/lib/queries.ts

// GROQ Queries for when Sanity is live
export const allArticlesQuery = `*[_type == "article"] | order(publishedAt desc) {
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
  seo {
    metaTitle,
    metaDescription
  }
}`;

export const featuredCaseStudiesQuery = `*[_type == "caseStudy" && featured == true] | order(publishedAt desc) {
  title,
  "slug": slug.current,
  industry,
  client,
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
  tools
}`;
