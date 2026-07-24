# Tools System — Design

**Date:** 2026-07-24
**Status:** Phase 1 (ROI Calculator) fully specified and approved. Phases 2-7 are roadmap-level only — each gets its own brainstorm → spec → plan cycle before build, per the decomposition agreed below.

## Why this is split into phases

The original request covers a flagship AI-driven site scanner, five standalone tools, a new AI vendor, PDF generation, and new Supabase schema — too much for one implementation plan to stay reliable. Each phase below ships independently, in the order confirmed with Arslan, so the site gets working tools incrementally instead of one large, harder-to-verify change.

## Global decisions (apply to every phase, not just Phase 1)

These were resolved once, up front, so later phases don't re-litigate them:

1. **AI vendor: migrate fully to Gemini Flash Lite, with Groq as fallback.** The two existing AI-backed tools (audit, calculator) currently call Claude — one of them (`claude-3-5-sonnet-20241022`) at a retired model ID, so it's silently running on the mock fallback today. All AI-powered tools going forward (flagship Operational Scan, Ask Arslan, and the Operational Readiness Audit once it's rebuilt in Phase 2) use Gemini Flash Lite server-side with Groq as fallback. This requires new `GEMINI_API_KEY` and `GROQ_API_KEY` environment variables and new SDK dependencies, introduced in whichever phase first needs them (Phase 2).
2. **No email-sending service exists yet** (no Resend, SendGrid, etc.). Rather than adding one now, every gated deliverable in every phase downloads immediately in-browser on submission, while still writing the lead to Supabase. Email delivery + the 3-email nurture sequence described in the original spec is explicitly deferred to a future project, once an email vendor is chosen. This keeps list-building working today without a half-finished email integration blocking every tool.
3. **No Calendly link is configured anywhere on the site.** Every "book a call" moment in every phase links to the existing `/contact` page instead of an embed. If a Calendly link becomes available, swapping it in is a small follow-up, not a blocker.
4. **Supabase schema** (added once, used by every phase):
   ```sql
   alter table leads add column if not exists tool_data jsonb;
   alter table leads add column if not exists source_tool text;
   ```
   `source_tool` is a plain `text` column, not a Postgres `enum` — enums require a migration every time a new tool ships, which fights shipping tools incrementally. Valid values are enforced at the application level: `roi_calculator`, `operational_audit`, `operational_scan`, `tech_stack_fit`, `cost_estimator`, `ask_arslan`. `tool_data` mirrors the shape `tool_submissions.inputs` already uses, so gated and ungated submissions produce comparably structured lead data. **Arslan runs this SQL in the Supabase dashboard — it is not applied by code in this repo.**

## Roadmap — every tool from the original request

| Phase | Tool | Type | Status |
|---|---|---|---|
| 1 | **ROI Calculator** (standalone) | Pure client-side calculation | Fully specified below — building now |
| 2 | **Operational Readiness Audit** (standalone) | AI-backed (Gemini/Groq) — migrated off Claude | Roadmap only |
| 3 | **Operational Scan** (flagship) | AI-backed — combines a new site-scraper with Phases 1 + 2 | Roadmap only |
| 4 | **Insights Suite** landing page + header nav | Static page, no new logic | Roadmap only |
| 5 | **Tech Stack Fit Checker** (standalone) | Pure client-side quiz | Roadmap only |
| 6 | **"What Would This Cost to Build" Estimator** (standalone) | Pure client-side | Roadmap only |
| 7 | **Ask Arslan** (standalone) | AI-backed chat (Gemini/Groq) | Roadmap only |

Each roadmap-only phase keeps its original scope from the request:

- **Phase 2 — Operational Readiness Audit:** the existing 10-question flow, rebuilt on Gemini/Groq instead of the retired Claude call, same scoring/report structure the current `app/api/audit/route.ts` already approximates.
- **Phase 3 — Operational Scan (flagship):** homepage-embedded module, directly after the hero. Adds a server-side site fetch (robots.txt-respecting) + AI analysis of the fetched content to produce a "we detected…" profile, then runs the Phase 2 questions and Phase 1 calculation as one combined flow, plus the "growth-gap" framing module. This is the most complex phase — the scraper alone (timeouts, SSRF-safety, content parsing) is its own design problem, deliberately sequenced after Phases 1 and 2 are proven.
- **Phase 4 — Insights Suite:** `/insights` landing page (tool card grid, same design system) plus a header dropdown named "Insights Suite," replacing the current direct `/tools` links.
- **Phase 5 — Tech Stack Fit Checker:** 4-question quiz → named "Operational Maturity Profile" result (e.g. "The Spreadsheet Survivor"), light email gate for the full breakdown. Deliberately shareable/lighter tone, still on-brand.
- **Phase 6 — Cost Estimator:** checkbox-based scope selector → rough cost range (never a firm quote), gated detailed estimate, pre-qualifies budget fit before a call.
- **Phase 7 — Ask Arslan:** chat widget, system prompt built from a maintained context document (bio, four live products, process, pricing ranges, FAQ), hard boundaries against quoting exact prices or committing to timelines, proactive call-booking nudge after 3+ exchanges showing intent, full conversation logging to Supabase.

---

## Phase 1 — ROI Calculator (fully specified)

### Architecture

- `app/tools/calculator/page.tsx` becomes a client component: 3 live inputs (team members on manual work, hours/week, cost bracket) driving a pure client-side calculation — no network call, no loading state, results update as the visitor types.
- Cost bracket is a select with five ranges — under $40k, $40-60k, $60-80k, $80-110k, $110k+ — each mapped to a fixed representative annual salary (midpoint of the range, or $130k for the open-ended top bracket) that feeds the existing hourly-rate math (`salary / 2080`). This replaces the old exact-salary number field.
- `lib/calculators/roi.ts` — a pure, dependency-free function exporting the calculation. Imported by both the page (free live result) and the API route (server-side recompute before generating the PDF, so the deliverable never trusts client-held state).
- `app/api/calculator/route.ts` is repurposed, not left in place: the Claude call is removed entirely (this tool has no AI involvement), and the route becomes PDF-generation + lead-capture only.

### Data flow

1. Visitor adjusts the 3 inputs → results panel updates live: annual cost now, projected annual cost after automation, savings, payback period.
2. "Get my PDF breakdown" reveals two more fields: industry (6-option select: ecommerce, manufacturing, professional services, logistics, retail, other) and email.
3. Submit → `POST /api/calculator` with `{ inputs, industry, email }`.
4. Route recomputes the numbers server-side via `lib/calculators/roi.ts`, generates a styled PDF via `pdf-lib` (site's dark/gold aesthetic; a `lib/calculators/industry-context.ts` lookup table keyed by the 6 industries supplies one short paragraph of sector-specific framing per industry — e.g. what "manual work" typically means in that sector and a plausible automation-reduction range — written once as static copy, not AI-generated), saves the lead (`leads` table: `email`, `source_tool: 'roi_calculator'`, `tool_data: { inputs, industry, results }`), and returns the PDF binary.
5. Browser triggers an immediate download (blob + `<a download>`). Success state: "Downloaded — want to talk this through?" linking to `/contact` (see Global Decision 3).

### Error handling

- Invalid/empty inputs disable the live calculation rather than crashing or showing `NaN`.
- A failed PDF request shows an inline "Something went wrong — try again," preserving whatever the visitor already typed.
- If Supabase is unreachable, the existing mock-fallback pattern in `lib/supabase.ts` logs locally and the PDF still generates and downloads — lead capture failing silently never blocks the deliverable.

### New dependency

`pdf-lib`, added to `package.json`.

### Out of scope for Phase 1

Email delivery of the PDF, the nurture sequence, Calendly booking, and any AI involvement — all per the Global Decisions above.
