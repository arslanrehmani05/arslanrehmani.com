# arslanrehmani.com — COMPLETE REBUILD SPECIFICATION
# Fable: This file contains EVERYTHING — copy, layout, 
# spacing, hierarchy, states, and responsive behavior. 
# Rebuild the entire site from this file alone. 
# Deviate from nothing. Invent nothing.

═══════════════════════════════════════════════
PART A — GLOBAL FOUNDATIONS
═══════════════════════════════════════════════

## A1. DESIGN TOKENS (globals.css)
:root {
  --bg-primary: #0A0A0A;
  --bg-secondary: #111111;
  --bg-surface: #161616;
  --text-primary: #F5F5F0;
  --text-muted: rgba(245,245,240,0.62);
  --text-subtle: rgba(245,245,240,0.38);
  --accent-gold: #C9A84C;
  --accent-gold-hover: #D4B05A;
  --accent-gold-dim: rgba(201,168,76,0.15);
  --border: #232323;
  --border-gold: rgba(201,168,76,0.35);
}

## A2. TYPOGRAPHY SYSTEM
Font: Inter via next/font/google, weights 400/500/700/900.

Scale (desktop → mobile):
- Display (hero headline): text-6xl → text-4xl, 
  font-black, tracking-tight, leading-[1.05]
- H2 (section headlines): text-4xl → text-3xl, 
  font-black, tracking-tight, leading-tight
- H3 (card titles): text-xl → text-lg, font-bold
- Body: text-lg → text-base, font-normal, 
  leading-relaxed, text-muted
- Section labels: text-xs, font-semibold, 
  tracking-[0.2em], uppercase, text-accent-gold
- Stat numbers: text-3xl → text-2xl, font-black, 
  text-accent-gold
- Stat labels: text-sm, text-muted

## A3. SPACING SYSTEM
- Section vertical padding: py-32 desktop, py-20 mobile. 
  NEVER less.
- Container: max-w-6xl, mx-auto, px-6.
- Card padding: p-8 desktop, p-6 mobile.
- Card radius: rounded-2xl everywhere. No exceptions.
- Gap between cards in grids: gap-6.
- Space between section label and headline: mb-4.
- Space between headline and body/cards: mb-12.

## A4. INTERACTION STATES
- All links/buttons: transition-colors duration-200.
- Gold buttons: bg-accent-gold text-black font-semibold 
  px-8 py-4 rounded-full. Hover: bg-accent-gold-hover.
- Ghost buttons: border border-border text-primary 
  px-8 py-4 rounded-full. Hover: border-accent-gold 
  text-accent-gold.
- Cards with links: hover:border-border-gold on the 
  card border.
- Text links: text-accent-gold. Hover: text-gold-hover 
  with underline underline-offset-4.
- NO other animations. No scroll-triggered effects. 
  No parallax. One exception: a single fade-in 
  (opacity 0→1, 500ms) on hero content at page load.

## A5. RESPONSIVE RULES
- Breakpoint strategy: mobile-first, md: (768px) and 
  lg: (1024px) only.
- All multi-column grids collapse: 3-col → 1-col at 
  md, 2-col → 1-col at md.
- Hero: two-column desktop → single column mobile, 
  text first, image second.
- Credibility bar: 5-across desktop → 2-col grid 
  mobile (last item spans full width).
- Nav: full links desktop → hamburger with full-screen 
  overlay (bg-primary, links centered, text-2xl) mobile.
- Tap targets minimum 44px on mobile.

## A6. NAVIGATION (sticky, all pages)
- Sticky top, bg-primary/90 with backdrop-blur-md, 
  border-b border-border.
- Height: h-16.
- Left: "Arslan Rehmani" text-primary font-bold 
  (links to /).
- Right links (text-sm, text-muted, hover 
  text-accent-gold): Work, About, Contact.
- Far right: gold pill button "Start a conversation" 
  (small: px-5 py-2 text-sm) → /contact.

═══════════════════════════════════════════════
PART B — HOMEPAGE, SECTION BY SECTION
═══════════════════════════════════════════════

## SECTION 1 — HERO
Layout: two columns (60/40) desktop, min-h-[85vh], 
items-center. Left column:

Label: OPERATIONAL AI SYSTEMS

Headline (Display):
I build systems that replace manual work. Permanently.

Sub-headline (Body, max-w-xl, mt-6):
Custom operational software for manufacturing companies 
and ecommerce brands — fewer people doing repetitive 
work, lower operating costs, same or better output.

CTA row (mt-10, flex gap-4):
- Primary gold button: See the work → smooth-scrolls 
  to #proof
- Ghost button: Start a conversation → /contact

Below CTAs (mt-8, text-sm text-subtle):
Arslan Rehmani — Founder, Vanthrope

Right column: single rounded-2xl image container 
(aspect-square, bg-secondary, border border-border) 
containing professional headshot placeholder. One thin 
gold ring: ring-1 ring-border-gold. Nothing else. No 
floating badges, no decorative shapes.

## SECTION 2 — CREDIBILITY BAR
Full-width band: bg-secondary, border-y border-border, 
py-12 (this section is the py exception — tighter).
Inside container: 5 stats in a row (flex justify-between 
desktop / grid grid-cols-2 gap-8 mobile).

Each stat: number (Stat number style) above label 
(Stat label style), left-aligned.

Stat 1: 2 / Production systems live today
Stat 2: 5 / Employees replaced by one system
Stat 3: 40+ / Hours of manual work eliminated weekly
Stat 4: 4 / Live products you can use right now
Stat 5: 10+ / Months running on real operational data

Vertical 1px dividers (bg-border) between stats on 
desktop only.

## SECTION 3 — THE PROBLEM
Label: THE PROBLEM

Headline (H2, max-w-3xl):
Most businesses know something is inefficient. Almost 
none have someone who can actually fix it.

Grid: 3 columns desktop, 1 mobile, mt-12.

Each card: bg-secondary, border border-border, 
rounded-2xl, p-8, with a 2px gold top border 
(border-t-2 border-t-accent-gold). Card number 
(text-accent-gold font-black text-lg) above title.

Card 01 — Operations that run on people
Every process that requires a human is a cost, a risk, 
and a bottleneck. Most businesses have dozens of these 
and have stopped noticing them.

Card 02 — Tools that don't talk to each other
Sales in one platform. Inventory in another. Reporting 
in spreadsheets. Every gap between systems gets filled 
by someone's manual work.

Card 03 — The gap between knowing and doing
Understanding what should change is common. Finding 
someone who can design the system, build it properly, 
and deploy it reliably is not.

## SECTION 4 — WHAT I BUILD
Label: THE WORK

Headline (H2):
From operational diagnosis to deployed systems.

Intro paragraph (Body, max-w-2xl, mb-12):
I start by understanding how your business actually 
operates — not how software assumes it should. Every 
system is built around your workflows, your data, and 
your team.

Grid: 3 columns desktop, 1 mobile.
Each card: bg-secondary border border-border rounded-2xl 
p-8. Title (H3) then body (Body, text-base). Bottom of 
card: gold arrow link "Learn more →" pointing to 
/contact (all three).

Card 1 — Operational Audit
I map your workflows, identify where manual work costs 
you most, and deliver a prioritised implementation plan. 
You know exactly what to build and why — before anything 
gets built.

Card 2 — Custom Systems
ERPs, dashboards, intelligent agents, and operational 
platforms — designed around how your business runs and 
deployed to infrastructure you control.

Card 3 — Ongoing Evolution
Businesses change. I maintain, improve, and extend the 
systems I build as yours does.

## SECTION 5 — PORTFOLIO / THE PROOF (id="proof")
# THE CENTERPIECE. Largest section. Most visual weight.

Label: THE PROOF

Headline (H2):
Live products. Real systems. Use them yourself.

Intro (Body, max-w-2xl, mb-12):
Most portfolios show screenshots. These are working 
products — open them, click around, ask their built-in 
AI assistants anything.

Layout: 2x2 grid desktop (gap-6), 1 column mobile.

Each product card: bg-secondary, border border-border, 
rounded-2xl, p-8, hover:border-border-gold, 
flex flex-col. Structure top to bottom:
1. Tag pill: text-xs uppercase tracking-widest 
   text-accent-gold bg-accent-gold-dim px-3 py-1 
   rounded-full w-fit
2. Product name: H3, mt-4
3. Description: Body text-base, mt-3, flex-grow
4. Proof line (where present): text-sm, mt-4, with 
   numbers wrapped in text-accent-gold font-bold
5. CTA link (mt-6): gold text link with arrow

Card 1:
Tag: MANUFACTURING
Name: LoomWorks
Description: A complete manufacturing ERP — production 
tracking, yarn accounting, financial reconciliation, 
and daily AI briefings for a 27-loom textile operation.
Proof line: Built on a production system that replaced 
5 employees and eliminated 40+ hours of weekly manual 
work. Live for 10+ months.
CTA: Open LoomWorks → https://loomworks.vanthrope.com 
(new tab)

Card 2:
Tag: ECOMMERCE
Name: BrandPilot
Description: An ecommerce command center — revenue, 
inventory, SEO, content, and finance across Shopify 
and Amazon in one screen, with an AI morning brief 
that tells you exactly what needs attention today.
Proof line: Built on the operational stack running a 
live multi-market ecommerce brand.
CTA: Open BrandPilot → https://brandpilot.vanthrope.com

Card 3:
Tag: MARKET INTELLIGENCE
Name: MarketLens
Description: An AI-powered market terminal — live 
charts, portfolio tracking, and Warren, an AI analyst 
that answers market questions in plain language.
CTA: Open MarketLens → https://marketlens.vanthrope.com

Card 4:
Tag: LEGAL
Name: Legality AI
Description: Consulting agreements and legal documents 
drafted in minutes — generated by AI, reviewed by you, 
downloaded as PDF.
CTA: Open Legality AI → https://legality.vanthrope.com

Below the grid (mt-8, text-sm text-subtle, max-w-2xl):
The production systems behind LoomWorks and BrandPilot 
run on real business data. They are demonstrated live 
on calls.

## SECTION 6 — ABOUT
Layout: two columns (55/45), items-center.

Left column:
Label: THE PERSON
Headline (H2): Arslan Rehmani. Founder, Vanthrope.
Body (mt-6):
I build production software for real businesses. The 
first system I built replaced five employees at a 
textile manufacturer and has run its daily operations 
for over ten months. The second runs my own ecommerce 
brand across five sales channels. Everything on this 
site is live and testable — because claims are cheap 
and working software is not.

Social row (mt-8, flex gap-6): text links in gold — 
LinkedIn, GitHub, X. (Placeholder hrefs.)

Right column: headshot placeholder identical in style 
to hero (rounded-2xl, bg-secondary, border, gold ring).

## SECTION 7 — FINAL CTA
Background: bg-primary with ONE radial gradient — 
radial at center, from rgba(201,168,76,0.06) to 
transparent 70%. This is the only gradient on the 
entire site.

Content centered, max-w-3xl:
Headline (H2): If your operations have inefficiency 
worth eliminating, let's talk.
Sub (Body, mt-4): Every engagement starts with 
understanding your operation. No commitment until 
the diagnosis is done.
CTA row (mt-10, centered, flex gap-4):
- Gold button: Start the conversation → /contact
- Ghost text link: Learn about Vanthrope → 
  https://vanthrope.com (new tab)

## SECTION 8 — FOOTER
bg-primary, border-t border-border, py-12.
Three columns desktop / stacked mobile:
Left: "Arslan Rehmani" font-bold + below it text-sm 
text-subtle "Operational AI Systems"
Center (text-sm text-muted, flex gap-6): Work / About / 
Contact
Right (text-sm, gold links): Vanthrope → | LinkedIn | 
GitHub
Bottom strip (mt-10, pt-6, border-t border-border, 
text-xs text-subtle): © 2026 Arslan Rehmani

═══════════════════════════════════════════════
PART C — SUBPAGES
═══════════════════════════════════════════════

## /contact
Nav + footer identical. Single centered section 
(min-h-[70vh], items-center):
Label: CONTACT
Headline (H2): Start the conversation.
Sub (Body): Tell me what your operation looks like and 
where the friction is. I respond within 24 hours.
Form (max-w-lg, mt-10): 
- Name (input)
- Email (input)  
- Company (input)
- What does your operation struggle with? (textarea, 
  5 rows)
All inputs: bg-secondary, border border-border, 
rounded-xl, px-4 py-3, text-primary, 
focus:border-accent-gold focus:outline-none.
Submit: full-width gold button "Send".
Success state: replace form with centered check icon 
(gold) + "Received. I'll respond within 24 hours."
Submits to existing /api/leads route (keep current 
backend wiring).

## /work and /about
If these exist as separate pages, they redirect to 
homepage anchors (#proof and the About section). Do 
not build separate page content — the homepage is 
the site.

═══════════════════════════════════════════════
PART D — HARD PROHIBITIONS (FINAL CHECK)
═══════════════════════════════════════════════
Before finishing, verify ZERO instances of:
- "passionate", "innovative", "cutting-edge", 
  "journey", "lifelong", "10 years", "daily learning", 
  any years-of-experience claim
- Technology names in any headline (Next.js, n8n, 
  Claude, Supabase, etc.)
- Exclamation marks
- Stock photography
- More than ONE gradient (the final CTA radial)
- Any animation beyond hover transitions + the single 
  hero fade-in
- Rounded corners other than rounded-2xl / rounded-full
- Any claim not verifiable at a URL or in a call
