# arslanrehmani.com — Project Instructions

## What This Is
Personal brand website and primary commercial asset for Arslan Rehmani, founder of Vanthrope. This is a client conversion tool, not a brochure. Every element must pass the CFO test — a serious buyer landing here from a cold email should conclude within 10 seconds that this person is credible and worth contacting.

## Stack
- Next.js 14 App Router with TypeScript
- Sanity v3 for CMS (articles and case studies)
- Supabase for lead capture and tool outputs
- Tailwind CSS
- Vercel deployment
- Claude API for AI Readiness Audit and ROI Calculator (server-side only, never client-side)

## Commands
- `npm run dev`
- `npm run build`
- `npm run lint`
- `npx tsc --noEmit`

## Design System
- Background primary: `#0A0A0A`
- Background cards: `#111111`
- Text primary: `#F5F5F0`
- Accent gold: `#C9A84C` — CTAs, hover states, result numbers only
- Accent gold hover: `#D4B05A`
- Border: `#2A2A2A`
- Font: Inter — `font-black` for headlines, regular for body
- Minimum 140px vertical padding between every section
- 24px border radius on all cards
- Zero stock photography anywhere
- Zero gradients except subtle radial on final CTA section

## File Structure
```
app/
  layout.tsx
  page.tsx (homepage, all 11 sections)
  about/page.tsx
  work/page.tsx (case studies index)
  work/[slug]/page.tsx
  thinking/page.tsx (blog index)
  thinking/[slug]/page.tsx
  tools/page.tsx
  tools/audit/page.tsx
  tools/calculator/page.tsx
  contact/page.tsx
  api/
    audit/route.ts
    calculator/route.ts
    leads/route.ts
components/
  navigation.tsx
  hero.tsx
  credibility-bar.tsx
  problem-section.tsx
  services-section.tsx
  portfolio-section.tsx
  thinking-section.tsx
  tools-section.tsx
  about-section.tsx
  cta-section.tsx
  footer.tsx
sanity/
  schemaTypes/
    article.ts
    caseStudy.ts
  lib/
    client.ts
    queries.ts
lib/
  supabase.ts
  types.ts
```

## Architecture Rules
- All Claude API calls server-side only via API routes
- All Supabase calls server-side only
- No API keys ever in client components or exposed to the browser
- Sanity content fetched with ISR, `revalidate: 3600`
- Static generation for all content pages
- Contact form and tool submissions write to Supabase via server-side API routes only

## Supabase Tables
- `leads`: `id`, `email`, `source`, `created_at`
- `tool_submissions`: `id`, `tool`, `inputs jsonb`, `report text`, `email`, `created_at`

## RLS Rules
- `leads`: insert only for anon role, no select
- `tool_submissions`: insert only for anon role, no select
- Service role key used server-side only, never exposed

## Content Rules
- TextileMode ERP is always first in portfolio — never reorder this
- Every claim must be specific and verifiable — no vague statements like "years of experience" or "passionate about AI"
- Result numbers always in gold, bold, large font
- Case study numbers always specific, never rounded
- Never mention n8n, Zapier, or specific tool names in headlines or hero copy
- Lead with business outcomes, not technology names

## Copy Standards — Non-Negotiable
- **NEVER use**: "passionate," "innovative," "cutting-edge," "10 years of learning," "lifelong learner," or any claim that cannot be immediately verified.
- **ALWAYS use**: specific numbers, specific outcomes, checkable facts.
- **Every portfolio piece**: problem stated plainly, solution in one sentence, results in hard numbers.

## Performance Requirements
- Lighthouse score 95+ on all metrics
- All images via `next/image` with proper sizing
- Page load under 3 seconds on standard connection
- ISR with `revalidate: 3600` for all content pages
- No client-side data fetching on initial load

## Loading and Error States
- Every data component needs all three states: loading skeleton, error with retry, empty state
- No blank screens ever
- No unhandled errors visible to users

## Mobile
- Fully responsive using Tailwind breakpoints
- Hero stacks vertically on mobile
- All grids collapse to single column on mobile
- Minimum 44px tap targets throughout

## Environment Variables Required
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ANTHROPIC_API_KEY=
```

## Don't Do
- Never use inline styles — Tailwind classes only
- Never hard delete any Supabase data — soft delete only using `deleted_at` timestamp column
- Never add animations beyond gold hover transitions
- Never use colours outside the defined palette
- Never ship a component without loading, error, and empty states handled
- Never put API keys in client components
- Never add stock photography
- Never add popups, exit-intent modals, or live chat
