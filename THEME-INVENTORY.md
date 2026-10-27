# THEME-INVENTORY.md
## Phase 0: Frozen Theme Audit & Token Catalog

This inventory documents all canonical design tokens, fonts, colors, spacing rules, and components currently defined in the repository (`app/globals.css`, `tailwind.config.ts`, and component libraries). Per Hard Constraint 1, the theme is **FROZEN**. All new UI elements across Home, Agents, Tools, Proof Ledger, Lab, Industries, and Enterprise must compose exclusively from these tokens.

---

### 1. Typography & Fonts
- **Primary Body & Display Font**: `DM Sans` (via Next.js `next/font/google`, variable: `--font-dmsans`).
- **Font Weights Used**:
  - `400` (Regular / Body text)
  - `500` (Medium / Buttons, headlines, nav, badges)
  - `700` (Bold / Section headers, metrics)
- **Monospace Font**: System monospace (`font-mono`) for data hashes, evidence IDs, timestamps, code snippets, and terminal previews.
- **Tracking & Line Height**:
  - Eyebrows: `tracking-[0.14em] uppercase text-xs font-medium`
  - Headlines: `letter-spacing: -0.035em`, `line-height: 1.08`
  - Body: `leading-relaxed text-sm` or `text-base`

---

### 2. Color Palette & CSS Variables

| Token Name | Dark Mode (Default) | Light Mode (`data-theme="light"`) | Purpose |
|---|---|---|---|
| `--bg-primary` | `#111113` (Obsidian Canvas) | `#f7f7f8` | Primary page background |
| `--bg-secondary` | `hsla(0, 0%, 100%, 0.05)` | `#ffffff` | Card surfaces with glassmorphism blur |
| `--bg-surface` | `hsla(0, 0%, 100%, 0.08)` | `#ffffff` | Hover states, elevated elements |
| `--text-primary` | `#f0f0f2` (Crisp Off-White) | `#000000` | Headlines, primary text, high-contrast labels |
| `--text-muted` | `hsla(0, 0%, 100%, 0.55)` | `rgba(0, 0, 0, 0.55)` | Secondary body, explanations, descriptions |
| `--text-subtle` | `hsla(0, 0%, 100%, 0.35)` | `rgba(0, 0, 0, 0.40)` | Captions, dates, footnotes, metadata |
| `--accent-gold` | `#f0f0f2` (Crisp Accent) | `#000000` | Primary buttons, active tabs, accent labels |
| `--accent-gold-hover` | `#ffffff` | `#222222` | Button hover states |
| `--accent-gold-dim` | `hsla(0, 0%, 100%, 0.08)` | `rgba(0, 0, 0, 0.06)` | Pill backgrounds, subtle highlight boxes |
| `--border` / `--border-color` | `hsla(0, 0%, 100%, 0.08)` | `rgba(0, 0, 0, 0.07)` | Dividers, card borders, table cells |
| `--border-gold` | `hsla(0, 0%, 100%, 0.16)` | `rgba(0, 0, 0, 0.15)` | Card hover borders, active outlines |
| Semantic Emerald | `text-emerald-400`, `bg-emerald-950/40`, `border-emerald-800/40` | Verified status badges, checksum pass markers |
| Semantic Amber | `text-amber-400`, `bg-amber-950/40`, `border-amber-800/40` | Warnings, human review queue items, exception flags |

---

### 3. Spacing & Layout Tokens
- **Container Max-Width**: `max-w-6xl mx-auto px-6` (standard content), `max-w-4xl mx-auto px-6` (focused reading / tools).
- **Section Vertical Padding**: `py-24 md:py-32` (major sections), `py-12` (compact bars/strips).
- **Card Padding**: `p-6` (mobile) to `p-8` or `p-10` (desktop).
- **Corner Radii**:
  - `rounded-full` for CTA buttons, pills, maturity badges.
  - `rounded-2xl` (`1rem`) / `rounded-3xl` for cards, modals, and tool containers.
  - `rounded-xl` for inner form inputs, table headers, and metric tiles.

---

### 4. Canonical Reusable Component Classes
- **`.btn-primary`**: Off-white pill button with dark text, subtle drop shadow, hover elevation, `min-height: 44px`.
- **`.btn-ghost`**: Frosted background (`--bg-secondary`) with thin border, hover border highlight, `min-height: 44px`.
- **`.eyebrow`**: Upper-case tracked label (`text-xs font-medium tracking-[0.14em] uppercase text-text-subtle`).
- **`.headline`**: Geometric heading (`font-sans font-medium text-text-primary tracking-[-0.035em] leading-[1.08]`).
- **`.bg-bg-secondary`**: Glassmorphism backdrop blur `backdrop-filter: blur(12px)` with border.

---

### 5. Rules & Exclusions
- **No new fonts** (strictly DM Sans and system monospace).
- **No external color palettes or gradient hacks**.
- **No unapproved design frameworks** (pure Tailwind + Lucide icons only).
- All new views compose strictly using the frozen tokens above.
