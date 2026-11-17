# TOOLS-SYSTEM.md — The Tools on arslanrehmani.com

Last updated: 17 November 2026. This replaces every earlier version of this file.

Read `CONTEXT.md` and `INSTRUCTIONS.md` first. This file is the full specification for the tools: what exists, how each is built, the standard every tool must meet, and the work that is left. A model picking this up should not need any other document to improve the tools.

## 1. What the tools are for

A buyer arrives with a problem they can feel but have not priced. A tool lets them put their own number on it, in under two minutes, without giving an email. The number makes the problem real, and the tool then offers one next step: start a conversation, with the result already attached.

The tools are not a showcase of technology. A tool earns its place only if an operations director, finance lead or founder would ask its question unprompted.

## 2. The set is complete

There are eleven tools and one flagship scan. Together they cover every problem the site says Arslan solves. **Do not add a twelfth tool.** Improve these. If a new idea appears, it almost always belongs inside an existing tool as another input or another result.

| # | Route | Name | The buyer's question | Category | Build |
|---|---|---|---|---|---|
| 1 | `/tools/calculator` | Manual-work cost calculator | What is manual work costing us each year? | cost | legacy |
| 2 | `/tools/process-mapper` | Process mapper | Where does this workflow slow down? | cost | legacy |
| 3 | `/tools/month-end-close` | Month-end close calculator | What does closing the books cost us? | finance | framework |
| 4 | `/tools/reconciliation` | Reconciliation gap checker | Which of these records do not match? | finance | legacy |
| 5 | `/tools/channel-profit` | Channel profit calculator | Which sales channel actually makes money? | ecommerce | framework |
| 6 | `/tools/stock-cost` | Stock cost calculator | What are slow stock and stockouts costing us? | ecommerce | framework |
| 7 | `/tools/production-loss` | Production loss calculator | How much output are our machines losing? | manufacturing | framework |
| 8 | `/tools/readiness` | Spreadsheet risk check | Have we outgrown our spreadsheets? | data | legacy |
| 9 | `/tools/scanner` | Data quality scanner | How clean is this data? | data | legacy |
| 10 | `/tools/automation-finder` | Automation finder | Which of our tasks should be automated first? | planning | framework |
| 11 | `/tools/hire-buy-build` | Hire, buy or build | Should we hire, buy software or build a system? | planning | framework |
| — | on `/tools` | Operational scan | What is manual work costing a business like mine? | flagship | legacy |

Also on `/tools`: the pipeline demo (`components/pipeline-mini-demo.tsx`), which shows how a document an AI reads is checked before it is recorded. It is an explainer, not a tool.

**Retired, with redirects in `next.config.mjs`:** `/tools/decision` → automation-finder, `/tools/cost-estimator` → hire-buy-build, `/tools/access-audit` → readiness, `/tools/audit` and `/diagnostics` → `/tools`. They were written for engineers, not buyers. Do not bring them back.

## 3. Two kinds of build

**Framework tools** (six) were built in November 2026 on shared parts. They are finished and consistent.

**Legacy tools** (five, plus the scan) predate the framework. They work, but each has its own layout, its own header style, coloured status text, and no handoff of the result to the contact form. Migrating them is the main job left. See section 8.

## 4. How a framework tool is put together

```
lib/tools/registry.ts            The list of tools. Index page, sitemap and related links read it.
lib/tools/calc.ts                Every calculation, as pure functions. No React, no formatting.
components/tools/ui.tsx          Shared parts: useCurrency, NumberField, TextField, ChoiceField,
                                 Panel, FieldGrid, ToolColumns, Headline, Rows, Insight, Bar, num.
components/tools/tool-shell.tsx  The frame: breadcrumb, title, currency switch, method, handoff.
components/tools/<slug>.tsx      One tool. Client component. State, one calc call, layout.
app/tools/<slug>/page.tsx        Seven lines. Server component. Metadata from the registry.
```

A tool component does four things, in this order:

1. Holds the inputs in `useState`, with realistic starting values so a result is on screen before the visitor types.
2. Calls one function from `lib/tools/calc.ts` inside `useMemo`.
3. Builds a plain-text `summary` of the result.
4. Returns `<ToolShell slug intro summary currency method>` wrapping `<ToolColumns inputs={...} result={...} />`.

`components/tools/month-end-close.tsx` is the simplest example. Copy its shape.

### The handoff

`ToolShell` builds `/contact?tool=<slug>&summary=<text>`. The contact form (`app/contact/contact-form.tsx`) reads both on load, puts the summary in the message box, and sends `tool` with the lead. `/api/leads` stores the lead with `source: "tool:<slug>"`. "Copy result" copies the same summary.

## 5. The standard every tool must meet

**Honesty**
- Every figure comes from the visitor's inputs. No hidden multipliers, no industry benchmarks, no invented averages.
- Where a tool needs an assumption (for example the recoverable share in the automation finder), the assumption is a visible input or is stated in "How this is worked out".
- A tool may tell the visitor not to automate. Hire, buy or build says so when changing nothing is cheapest. Keep that.
- Results are estimates. Never present one as a quote, a promise or a guarantee.

**Experience**
- A result is visible on first load, from the starting values.
- The result updates as the visitor types. No "Calculate" button.
- No email gate. Nothing is saved unless the visitor starts a conversation.
- One headline number, a short breakdown, and one sentence of insight that says what the number means.
- Every tool ends with the same step: "Start a conversation", carrying the result.

**Copy**
- The page title is the buyer's question, from the registry.
- Plain words. Say "cost of goods", not "COGS". Say "lines that run out", not "SKU stockout incidence".
- No tool, framework, model or vendor names. No mention of how the site is built.
- Field hints explain what to enter, in one line.
- Follow the copy rules in `INSTRUCTIONS.md`.

**Build**
- Calculations live in `lib/tools/calc.ts`, never in a component.
- Inputs are clamped so no value can produce `NaN`, `Infinity` or a negative cost.
- Money goes through `currency.money()`. The visitor can switch between $, £ and €. The switch changes the symbol only; it does not convert.
- Every field has a visible label. Tap targets are at least 44px. The layout works at 360px wide.
- Monochrome only. No red, amber or green status colours. Emphasis is weight and contrast.
- The one allowed inline style is the width of `Bar`, because it is a computed value.

## 6. Framework tools: what each one does

### Month-end close calculator
- **Inputs:** people on the close, working days it takes, hours each spends per day, cost of one hour, closes per year, target days.
- **Maths (`calcClose`):** hours per close = people × days × hours per day. Yearly cost = that × closes × hourly cost. The faster close keeps people and hours per day and shortens the days.
- **Shows:** yearly cost, hours per close and per year, working days without final numbers, hours and money freed by the target.
- **Could improve:** split the close into stages (bank, stock, payables, receivables, review) so the visitor sees which stage is longest.

### Channel profit calculator
- **Inputs:** up to five channels, each with monthly revenue, orders, cost of goods %, fees %, fulfilment per order, advertising, returns %.
- **Maths (`calcChannels`):** kept revenue = revenue − refunds. Cost of goods on kept revenue. Fees and fulfilment on every order. Profit = kept revenue − cost of goods − fees − fulfilment − ads.
- **Shows:** total monthly profit and margin, profit and margin per channel, share of revenue, profit per order, and the gap between best and worst.
- **Could improve:** a toggle for returned goods that cannot be resold; a break-even advertising figure per channel.

### Stock cost calculator
- **Inputs:** stock value, share that is slow, yearly holding cost %, lines that run out per month, days out, daily sales of such a line, gross margin.
- **Maths (`calcStock`):** holding cost = stock × slow share × holding %. Lost margin = stockouts × days × daily sales × 12 × margin.
- **Shows:** total yearly cost, the two parts as bars, cash tied up, sales lost, and which of the two problems is bigger.
- **Could improve:** let the visitor paste a stock list (item, quantity, cost, last sale date) and work out the slow share for them.

### Production loss calculator
- **Inputs:** machines, planned hours per day, working days per month, unplanned stoppage hours, running speed %, reject %, value of one good machine-hour.
- **Maths (`calcProduction`):** standard overall equipment effectiveness: availability × speed × good output. Lost hours are split into stoppages, speed and rejects, in that order.
- **Shows:** yearly value lost, effectiveness %, the three losses ranked, monthly loss.
- **Could improve:** shifts as an input; per-machine-group rows for floors with mixed machines.

### Automation finder
- **Inputs:** cost of one hour, working weeks, and up to eight tasks: name, hours per week, how it is done (fixed, exceptions, judgement), what it works from (structured data, documents), cost of a mistake (low, high).
- **Maths (`classifyTask`, `calcTasks`):** the three answers choose one of four approaches and a recoverable share (90%, 75%, 60%, 20%). Tasks are ranked by recoverable yearly cost.
- **Shows:** total recoverable cost, and each task with its approach and the reason for it.
- **Could improve:** this is the best candidate for one server-side AI step. Let the visitor describe a task in a sentence and have a model propose the three answers, which the visitor can correct. Keep `classifyTask` as the decider so the result stays explainable. See section 7.

### Hire, buy or build
- **Inputs:** manual hours per week, hourly cost, weeks, years to compare; hire cost and hours; software setup, subscription and share of work removed; build cost, upkeep and share of work removed.
- **Maths (`calcHireBuyBuild`):** total cost of four options over the chosen years, each including the manual work that remains. Payback = upfront cost ÷ monthly saving.
- **Shows:** the cheapest option, all four as bars, people needed if hiring, payback for software and for a build.
- **Could improve:** a year-by-year line so the crossover point is visible.

## 7. Using AI inside a tool

The six framework tools need no AI and make no network calls. That is deliberate: they are instant, free to run and cannot fail.

If AI is added, these rules apply:
- Server-side only, in an API route. No keys in the browser. See `INSTRUCTIONS.md`.
- AI may read, classify and explain. It never produces a money figure. Figures come from `lib/tools/calc.ts`.
- The tool must still work if the AI call fails or is slow.
- Validate and cap everything the visitor sends. Add a rate limit before any AI route goes live.

Existing AI routes: `/api/scan` (operational scan), `/api/audit` and `/api/calculator` (see section 9).

## 8. Work left, in priority order

A model continuing this work should take these in order. Each is self-contained.

1. **Migrate the manual-work cost calculator** (`app/tools/calculator/page.tsx`) to the framework. Move its maths into `lib/tools/calc.ts` as `calcManualWork`, build `components/tools/calculator.tsx`, reduce the page to the seven-line pattern, and set `build: 'framework'` in the registry. This is the most-used tool and the easiest migration.
2. **Migrate the spreadsheet risk check** (`readiness`). Keep the twelve criteria and their weights. Replace the coloured status labels with plain text. Summary: the score and the top three risks.
3. **Migrate the process mapper.**
4. **Migrate the reconciliation gap checker and the data quality scanner.** These parse pasted or uploaded CSV. Keep all parsing in the browser so no client data leaves the visitor's machine, and say so on the page. Move the parsing into `lib/tools/`.
5. **Rework the operational scan** (`components/operational-scan.tsx`, 830 lines) onto the shared parts. Keep the ten questions and the PDF. Check that its yearly cost range is derived only from the visitor's answers; remove any benchmark it cannot show the working for.
6. **Add tests** for every function in `lib/tools/calc.ts`. There is no test runner configured in `package.json` yet; add one first.
7. **Add the improvements** listed under each tool in section 6.
8. **Add a rate limit** to `/api/leads` and `/api/scan`.

For every migration: the route must not change, the result must match the old tool for the same inputs, and the tool must meet section 5.

## 9. Known loose ends

- `components/diagnostics/roi-calculator.tsx`, `app/api/calculator/route.ts`, `lib/calculators/` and `lib/pdf/roi-report.ts` are no longer shown on any page. They overlap with the manual-work cost calculator. Delete them once tool 1 is migrated, unless the PDF export is reused.
- `app/api/audit/route.ts` served a page that has been removed. Delete it if nothing calls it.
- The folder `tools/` at the repo root (outside `app/`) holds stray copies of two tool pages. It is not part of the site.
- Supabase: `leads` needs the optional columns `source_tool text` and `tool_data jsonb` for tool results to be stored in full. Without them the lead is still saved with its email and source.

## 10. Checklist before shipping a tool change

- [ ] `npm run build` passes.
- [ ] The tool shows a sensible result on first load.
- [ ] Setting every input to zero shows zeros, not `NaN`.
- [ ] The summary reads correctly when pasted into an email.
- [ ] "Start a conversation" opens the contact form with the summary in the message.
- [ ] The page works at 360px wide and with the keyboard alone.
- [ ] No vendor, model or framework name appears in the copy.
- [ ] The registry entry, this file and `content.md` agree.
