# Implementation Plan: arslanrehmani.com (Next.js + Sanity)

This plan outlines the creation of a Next.js 14 App Router website for Arslan Rehmani's personal brand and agency. It includes integrating Sanity v3 as the headless CMS, Tailwind CSS for styling, and Supabase/Claude API for tool outputs and lead capture.

## User Review Required

> [!IMPORTANT]
> **Local Node.js Environment Setup**
> Next.js, npm, and Sanity require Node.js to be installed on your local Mac to run, compile, and preview code locally (via `npm run dev`). 
> - A portable Node.js v20 has been downloaded to `/Users/arslanrehmani/.gemini/antigravity-ide/scratch/node`.
> - All terminal commands run by the agent will automatically use this Node.js instance.

---

## Open Questions for Discussion

1. **Supabase & Sanity Credentials**: Do you already have these set up, or should we use placeholder configurations and mock data for initial development?
2. **Claude API**: The ROI calculator and AI audit routes will invoke Claude. We will need an `ANTHROPIC_API_KEY`.
3. **Tone and Copy**: Is the direct tone ("Fewer people. Lower costs. Same output.") exactly what you want to lead with?

---

## Proposed Changes

The project will be initialized inside this folder:
📁 `/Users/arslanrehmani/Desktop/arslanrehmani.com`

### 1. Project Initialization & Tooling
* Initialize a clean Next.js 14 project using Tailwind CSS, TypeScript, and App Router.
* Setup a `.gitignore` to protect all env files.
* Setup a `.env.example` file.

### 2. Design System & Styling
* **Define theme variables in `app/globals.css`**:
  ```css
  :root {
    --bg-primary: #0A0A0A;
    --bg-secondary: #111111;
    --bg-surface: #2A2A2A;
    --text-primary: #F5F5F0;
    --text-muted: rgba(245,245,240,0.6);
    --text-subtle: rgba(245,245,240,0.4);
    --accent-gold: #C9A84C;
    --accent-gold-hover: #D4B05A;
    --border: #2A2A2A;
  }
  ```
* **Map to Tailwind utility classes** and configure Inter/Outfit typography.

### 3. Core Page Structure & Routing
* `app/layout.tsx`: Main layout with Inter font and unified metadata.
* `app/page.tsx`: Homepage containing the 11 sections built exactly in the requested order.
* `app/about/page.tsx`, `app/contact/page.tsx`: Core info pages.
* `app/thinking/page.tsx`, `app/thinking/[slug]/page.tsx`: Blog index and post templates.
* `app/work/page.tsx`, `app/work/[slug]/page.tsx`: Case studies index and detailed templates.
* `app/tools/page.tsx`: Tools hub listing the ROI calculator and AI readiness audit.

### 4. Components
* Structured React components under `components/` matching Sections 1-11 of your design specifications.

### 5. CMS & API Integrations
* Sanity schemas for `article` and `caseStudy`.
* API routes for Supabase leads and Claude audits/calculators.
