# TOOLS-SYSTEM.md — Final, Complete Specification

> **This document replaces the previous tools implementation entirely.**
> 
> The previous tools implementation failed because it built calculators — forms with math. This specification builds **experiences** — moments that feel personalized, specific, and slightly magic before any email is ever requested. Read this file completely before touching any existing tool code. Existing tools are being **REPLACED**, not incrementally improved.

---

## WHY THE PREVIOUS VERSION FAILED — DIAGNOSIS

1. **Buried Placement**: Hidden in a footer menu or generic "Tools" label, signaling an "optional utility" rather than a core proof asset. Effective lead-gen tools succeed because they are the FIRST thing a visitor interacts with, not a menu item three clicks deep.
2. **Generic Calculator Framing**: Enter numbers, click submit, get a number out — reads as generic SaaS-template behavior. Every software site has one; nobody is impressed.
3. **Form-First Friction**: Asking for user inputs before showing any value creates high bounce rates and skepticism.

**The Fix is Architectural & Experiential**:
- **Primary Placement**: The flagship scan is promoted directly onto the homepage, immediately following the hero.
- **Payoff Before Friction**: Every tool opens with a live, animating demonstration or detected information BEFORE asking for user inputs.
- **Craft & Tactility**: Sliders instead of text boxes, visual selection cards instead of dropdowns, staged reveals with checkmark animations instead of silent spinners, and count-up number animations instead of flat text.

---

## GLOBAL DECISIONS & TECHNICAL ARCHITECTURE

### 1. AI Vendor Stack
- **Primary**: **Gemini Flash Lite** (`gemini-1.5-flash-lite` or latest fast Gemini model) server-side via official `@google/genai` or `@google/generative-ai` SDK.
- **Fallback**: **Groq API** (`groq-sdk`) using `llama-3.3-70b-versatile` if Gemini errors or rate-limits.
- **Environment Variables Required**:
  ```env
  GEMINI_API_KEY=
  GROQ_API_KEY=
  ```

### 2. Lead Capture & Supabase Schema
- **Immediate In-Browser Delivery**: Gated deliverables (PDF reports, audit breakdowns) download immediately in-browser via blob URL (`<a download>`). No email-sending service (Resend/SendGrid) is required as a dependency.
- **Database Schema**: Every tool submission saves to the `leads` table in Supabase.
  ```sql
  -- Run in Supabase SQL Dashboard
  alter table leads add column if not exists tool_data jsonb;
  alter table leads add column if not exists source_tool text;
  ```
- **Valid `source_tool` values**:
  `'operational_scan'`, `'roi_calculator'`, `'operational_audit'`, `'tech_stack_fit'`, `'cost_estimator'`, `'ask_arslan'`.
- **Graceful Fallback**: If Supabase is offline or unconfigured, `lib/supabase.ts` logs locally while the in-browser PDF/result generation completes without blocking the user.

### 3. Contact & Booking Links
- Until a live Calendly link is configured, all "Book a Call" or "Discuss Results" CTAs point directly to `/contact` or embed an inline contact workflow.

---

## PART 1 — SITE ARCHITECTURE CHANGES

### 1.1 Homepage Flagship Module
- The flagship tool (**"The Operational Scan"**) is embedded as a prominent, full-width interactive section directly on the homepage, immediately after the Hero section.
- A visitor scrolling down from the hero hits it within 3 seconds of landing.

### 1.2 Navigation & Routing Redesign
- **Remove "Tools" as a nav/footer label entirely.**
- Main Nav concept: Rename to **"Free Diagnostics"** or **"See What's Costing You"** (`/diagnostics`).
- **Route Structure**:
  - `/` — Homepage (includes embedded Flagship Operational Scan)
  - `/diagnostics` — Dedicated diagnostics hub with grid of standalone tools
  - `/contact` — Contact directory & inquiry channels
- Never use the words "Tools" or "Calculators" in user-facing navigation copy.

### 1.3 Non-Form Landing States
- **Old Pattern**: User sees empty form → fills out fields → sees static output.
- **New Pattern**: User sees an **already-analyzed live example** (a pre-filled demo state, live animation, or active scan preview) → THEN is invited to make it personal to them.

---

## PART 2 — THE FLAGSHIP TOOL: "The Operational Scan"

**Placement**: Embedded directly on `app/page.tsx`, immediately following `components/hero.tsx`.

### 2.1 The Opening Moment (Pre-Input Payoff)
- Instead of an empty form, the visitor sees a single, bold input field: **"Enter your website URL"** with an animated preview container beneath it.
- The preview container displays a **SAMPLE analysis already running** on a fictional business (e.g., `"Example: apex-textiles.com"`), with gently animating scan indicators and pre-filled efficiency signals.
- The visitor sees the exact payoff before providing any input.

### 2.2 Staged Scan Sequence
When the user enters their URL and clicks **"Scan My Business"**:
1. Server-side fetch reads the target site's public HTML (respecting `robots.txt`, 5s timeout, SSRF protection against private IP ranges).
2. UI displays a staged 4-step sequence (each step visible for 800ms – 1200ms with a checkmark animation):
   - `"Reading your site..."` ✓
   - `"Detecting platform & stack..."` ✓ (Shopify, WordPress, Next.js, Custom, WooCommerce detected via meta tags/headers)
   - `"Checking operational signals..."` ✓ (Catalog size, live chat presence, content freshness)
   - `"Calculating Efficiency Score..."` ✓

### 2.3 Detected Profile Reveal (Before Questions)
Before asking a single question, display:
**"Here is what we detected about your site:"**
- Detected Platform (e.g. `Shopify Storefront`, `Custom React Application`)
- Apparent Catalog / Page Footprint (e.g. `100+ Product Pages`)
- Customer Service Channels (e.g. `Live Chat Active`, `Contact Form Only`)
- Content Freshness Signal (e.g. `Active Updates Detected`)

*(Note: Only display confidently detected signals; omit ambiguous signals to preserve instant credibility).*

### 2.4 Refinement Flow (10 Questions, One-at-a-Time)
Prompt: *"We can pinpoint your exact operational drag with 10 quick refinement questions."*
- **Single-Question-at-a-Time Focus**: Each question fills a focused container with a progress bar (`Question 1 of 10`).
- Smooth CSS/Framer Motion slide transitions between questions.
- **Questions**:
  1. Team members performing manual data entry / spreadsheet tracking (1 to 50+)
  2. Hours per week per person spent on manual status updates / reporting (1 to 40)
  3. Primary business sector (Manufacturing, Ecommerce, Logistics, Services, Retail)
  4. Number of disconnected software tools / sales channels in use (1 to 10+)
  5. Frequency of manual inventory or stock reconciliation (Daily, Weekly, Monthly, Never)
  6. Primary customer communication channel (Email, WhatsApp, Phone, Portal)
  7. How production/order scheduling is currently managed (Spreadsheets, Whiteboard, Legacy Software, Paper)
  8. Average monthly revenue range (<$50k, $50k-$200k, $200k-$1M, $1M+)
  9. Biggest operational headache (Order delays, Inventory mistakes, Reporting lag, High admin cost)
  10. Current automation level (Zero automation, Basic Zapier, Custom scripts, Fully integrated)

### 2.5 Score Reveal (Instant & Dramatic)
- **Animated Count-Up**: Large number counting up from 0 to final score over 1.5 seconds.
- **Color Coding**:
  - Red: `< 40` (High Drag)
  - Amber: `40 – 70` (Moderate Drag)
  - Green: `> 70` (Optimized)
- Scoring formula weighted so average real visitors land in the `40 – 65` range.

### 2.6 Annual Dollar Gap Calculation
Using revenue bracket and manual team headcount:
- Display: **"Based on your scan, businesses like yours lose approximately $X to $Y annually to manual operational overhead."**
- Expressed as a credible range (e.g. `$42,000 – $58,000 / year`), not a suspiciously exact single figure.

### 2.7 Value Gating (Ungated Value + Gated Depth)
- **Ungated (Instant)**: Efficiency Score + Annual Dollar Drag Range + Detected Technical Profile.
- **Gated**: *"Unlock your 3 specific high-impact automation recommendations + Download PDF Report"*
  - Input: Work Email Address
  - Action: Immediately renders detailed breakdown on screen AND triggers browser PDF download generated via `pdf-lib`.
  - Supabase: Writes to `leads` with `source_tool: 'operational_scan'` and full JSON `tool_data`.

---

## PART 3 — THE DIAGNOSTICS PAGE (`/diagnostics`)

Grid of standalone tools on `/diagnostics`, each redesigned with non-form opening moments:

### 3.1 ROI Calculator (Redesigned with Sliders & Live Animation)
- **Opening State**: Opens with a LIVE animating card showing a pre-calculated scenario:
  > *"A business with 3 team members spending 15 hrs/week on manual work loses approximately $42,225/year."*
- **Tactile Slider Controls** (replacing text inputs):
  - Slider 1: **Team members on manual work** (1 – 20)
  - Slider 2: **Hours / week per person** (1 – 40)
  - Slider 3: **Visual Cost Bracket Cards** (Clickable salary range cards):
    - `under_40k` ($30k repr.)
    - `40_60k` ($50k repr.)
    - `60_80k` ($70k repr.)
    - `80_110k` ($95k repr.)
    - `110k_plus` ($130k repr.)
- **Calculation Formula (`lib/calculators/roi.ts`)**:
  ```ts
  hourlyRate = salary / 2080
  currentAnnualCost = teamMembers * hoursPerWeek * hourlyRate * 52
  automatedAnnualCost = currentAnnualCost * 0.15 + 2500
  annualSavings = Math.max(0, currentAnnualCost - automatedAnnualCost)
  paybackPeriodMonths = annualSavings > 0 ? (15000 / annualSavings) * 12 : 0
  ```
- **Live Output**: Cost Now, Automated Cost, Annual Savings, Payback Period in months update instantly on slider drag.
- **Gated PDF Breakdown**: Email + Industry Selector (Manufacturing, Ecommerce, Logistics, Professional Services, Retail, Other) -> downloads PDF with industry-specific static lookup commentary (`lib/calculators/industry-context.ts`).

### 3.2 Operational Readiness Audit (Standalone Fast Flow)
- **Opening State**: *"Answer 10 quick questions — get your Efficiency Score in under 90 seconds."*
- Single-question-at-a-time transition flow.
- Generates score + AI report powered by Gemini Flash Lite.

### 3.3 "Ask Arslan" Digital Twin (Persistent Site-Wide Floating Launcher)
- **Placement**: Persistent floating chat widget launcher in the bottom-right corner of **EVERY page** across the site.
- **Styling**: Sleek dark background `#0A0A0A`, gold accent `#C9A84C` icon, smooth expand animation.
- **Backend**: Server route `app/api/ask-arslan/route.ts` calling Gemini Flash Lite (with Groq fallback).
- **System Prompt & Context**: Loaded from maintained bio, TextileMode ERP proof asset details, Belhide Operational Stack client context, Karachi location, non-negotiable copy rules (no vague buzzwords, no exact pricing commitments).
- **Proactive Pivot**: After 3+ intent-driven messages, automatically suggests booking a 30-minute operational discovery call with a direct link to `/contact`.

### 3.4 Tech Stack Fit Checker (Shareable Profile Card)
- **Opening State**: Visual icon cards showing 4 setup archetypes:
  1. *The Spreadsheet Survivor* (Manual Excel / Google Sheets everywhere)
  2. *The SaaS Patchwork* (10 disconnected subscription apps)
  3. *The Legacy Prisoner* (On-premise desktop ERP from 2008)
  4. *The Hybrid Struggler* (Mix of paper, custom scripts, and Shopify)
- **Output**: Personality profile card designed specifically to look premium when screenshot (dark aesthetic, gold badge, shareable metric summary).

### 3.5 "What Would This Cost" Estimator (Visual Scope Builder)
- **Opening State**: Interactive capability cards with multi-select highlighting:
  - `[ ] Custom Executive Dashboard`
  - `[ ] AI Operational Briefings`
  - `[ ] Production Floor / Inventory ERP`
  - `[ ] Multi-Channel Ecom Sync (Shopify + Amazon)`
  - `[ ] Automated Workflows & Scraping`
- **Slider**: Complexity & Scale (Single location vs Multi-factory / Multi-store).
- **Output**: Estimated cost range (e.g. `$8,000 – $15,000` or `$20,000 – $35,000`), explicitly framed as *"Typical investment range for this scope — exact fixed quote delivered after a 15-minute call"*, with direct contact CTA.

---

## PART 4 — DESIGN REQUIREMENTS ACROSS ALL TOOLS

1. **Color Palette & Tokens**:
   - Background primary: `#0A0A0A`
   - Background cards: `#111111` (`bg-bg-secondary`)
   - Border: `#232323` (`border-border-color`)
   - Accent Gold: `#C9A84C` (Used **ONLY** on scores, CTAs, and highlight badges)
   - Font: Inter (sans) & Fraunces (serif for display headlines)
2. **Zero Generic Forms**:
   - Use tactile sliders instead of numeric text inputs.
   - Use visual selection cards instead of dropdowns or native checkboxes.
   - Use single-question card transitions instead of long scrolling forms.
3. **Staged Animations**:
   - All numbers count up dynamically from 0.
   - All scan steps display animated checkmarks with deliberate 800ms delays.
4. **Mobile Optimization**:
   - All sliders, cards, and single-question layouts feature minimum 44px touch targets and full responsive stacking.

---

## BUILD ORDER

1. **Build the Operational Scan (Flagship)**: Create homepage-embedded scanner (`components/operational-scan.tsx`) with URL preview animation, server-side site analyzer, single-question flow, count-up score reveal, dollar gap calculation, and PDF generator.
2. **Promote to Homepage**: Embed in `app/page.tsx` directly after Hero; update main navigation to replace "Tools" with "Free Diagnostics" (`/diagnostics`).
3. **Rebuild `/diagnostics` Hub & Standalone Tools**: Rebuild `/diagnostics/page.tsx`, slider-driven ROI Calculator, fast Audit flow, Tech Stack Fit Checker, and Scope Estimator.
4. **Deploy "Ask Arslan" Site-Wide Floating Launcher**: Add floating chat widget to `app/layout.tsx` for persistent availability across all pages.
5. **Quality Check**: Run TypeScript compilation (`npx tsc --noEmit`), ESLint (`npm run lint`), and static production build (`npm run build`).
