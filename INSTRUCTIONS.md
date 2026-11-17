# arslanrehmani.com — Project Instructions

Last updated: 17 November 2026. Read `CONTEXT.md` first for positioning.

## What this is

Arslan Rehmani's personal brand site and main commercial asset. It is a conversion tool, not a brochure. A serious buyer who lands here should conclude within 10 seconds that this person understands their problem and is worth contacting.

## Stack

- Next.js 14 App Router with TypeScript
- Tailwind CSS
- Sanity v3 for articles (`/thinking`)
- Supabase for lead capture and tool outputs
- Vercel deployment from `main`
- Claude API for the tools that need it, server-side only

## Commands

- `npm run dev`
- `npm run build`
- `npm run lint`
- `npx tsc --noEmit` (run after a build; stale files in `.next/types` cause false errors after a route is deleted)

## Site structure

```
app/
  page.tsx              Homepage: hero, problems, case studies, products, how I work, about, CTA
  work/page.tsx         Case studies index
  work/[slug]/page.tsx  One case study
  products/page.tsx     The products
  services/page.tsx     Three ways to work together
  about/page.tsx
  contact/page.tsx      + contact-form.tsx (client component)
  tools/page.tsx        Tools index; each tool has its own route under tools/
  thinking/             Articles from Sanity (not in the main navigation)
  api/leads, api/audit, api/calculator, api/scan
lib/
  content.ts            Every client figure and product description. Single source of truth.
  supabase.ts, emails.ts, types.ts, calculators/, pdf/
components/
  navigation, footer, hero, problem-section, featured-work, products-grid,
  how-i-work, about-section, final-cta, operational-scan, pipeline-mini-demo,
  diagnostics/roi-calculator
```

Navigation: Work, Products, Services, Tools, About, plus a "Start a conversation" button.

Removed routes redirect in `next.config.mjs`: `/projects`, `/agents`, `/industries`, `/enterprise`, `/security`, `/proof-ledger`, `/lab`, `/diagnostics`, `/tools/audit`.

## The one rule about numbers

Every client figure and product description lives in `lib/content.ts`. Pages import from it. Never type a client number into a page or component, because that is how two pages end up disagreeing.

Nothing goes into `lib/content.ts` unless it can be shown on a call or opened at a URL. If a figure, a client result, a certification or a guarantee cannot be backed that way, it does not go on the site. No placeholder numbers, ever.

## Content rules

- TextileMode is always the first case study. Never reorder.
- Belhide is a client, never Arslan's own business. Never "my brand" or "building in public".
- Lead with the business problem and the outcome. Do not lead with technology.
- No tool, framework or model names in headlines or hero copy. The channels a client sells through (for example Shopify, Amazon) may be named in body copy.
- No mention of Vanthrope, ACCA, courses, certificates, age or location. See `CONTEXT.md`.
- First person singular. Never "we".
- Every external link must resolve. Check before adding one.
- One call to action across the site: "Start a conversation", leading to `/contact`. There is no booking link, so do not promise a call length.

## Copy standards

- **Never use:** "passionate", "innovative", "cutting-edge", "journey", "lifelong learner", "enterprise-grade", "guarantee", "zero" as a boast, "swarm", or any years-of-experience claim.
- **Never use** exclamation marks.
- **Always use:** specific numbers, specific outcomes, checkable facts, plain words.
- **Every case study:** the situation, what was going wrong, what was built, the results.
- If a sentence would make a careful buyer roll their eyes, cut it.

## Design system

The site is monochrome. The colour tokens in `app/globals.css` are the source of truth.

- Background `--bg-primary: #111113`; cards use `--bg-secondary` (5% white)
- Text `--text-primary: #f0f0f2`, `--text-muted` (55% white), `--text-subtle` (35% white)
- Borders `--border` (8% white); hover border `--border-gold` (16% white)
- The `accent-gold` token names are legacy. They now resolve to white. Do not reintroduce gold.
- Font: Inter, loaded with `next/font` in `app/layout.tsx`
- Headlines use the `.headline` class (medium weight, tight tracking)
- Section labels use the `.eyebrow` class
- Buttons use `.btn-primary` and `.btn-ghost`
- Cards: `rounded-2xl bg-bg-secondary border border-border-color`, padding `p-6 md:p-8`
- Sections: `py-20 md:py-28`, container `max-w-6xl mx-auto px-6`, a top border between sections
- No stock photography. No decorative gradients beyond the page background.
- No animation beyond hover transitions on new work. Some older tool components still use framer-motion.

## Architecture rules

- All Claude API calls are server-side, in API routes.
- No API keys in client components.
- Lead and tool submissions go through API routes to Supabase.
- `insertLead` does not ask for the inserted row back, because the anon role may insert but not read.
- `/api/leads` returns a real failure when a lead cannot be saved, and the contact form shows an error with an email fallback. Never report success on failure.

## Supabase tables

- `leads`: `id`, `email`, `source`, `created_at`, and optionally `source_tool`, `tool_data jsonb`
- `tool_submissions`: `id`, `tool`, `inputs jsonb`, `report text`, `email`, `created_at`
- RLS: insert only for the anon role, no select. Service role key is server-side only.
- Never hard delete. Soft delete with a `deleted_at` column.

## Performance and accessibility

- All images through `next/image` with sizes set.
- Static generation for content pages.
- Minimum 44px tap targets.
- All grids collapse to one column on mobile.
- Every form field has a visible label.

## Environment variables

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ANTHROPIC_API_KEY=
```

## Don't

- Don't add a page, a stat or a claim to fill space.
- Don't add popups, exit-intent modals or live chat.
- Don't put API keys in client components.
- Don't use inline styles. Tailwind classes only.
