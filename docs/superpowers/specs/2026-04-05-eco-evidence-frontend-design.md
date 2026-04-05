# Eco Evidence Frontend Design Spec

> Date: 2026-04-05
> Status: Approved

## Overview

Frontend for Eco Evidence — a hackathon demo (One4Earth Challenge 2026) that turns nature observations into ecological evidence reports. Full flow demo: Homepage → Record → Locations → Dashboard → Report.

Visual direction: natural handmade + tool feel. Green earth tones. No AI aesthetics (no gradients, glassmorphism, excessive shadows, or animations).

## Design Tokens

### Colors

```
Forest      #2D5016   Primary: nav highlight, buttons, headings
Leaf        #5C8A3C   Secondary: hover, icons, tags
Bark        #8B6F47   Accent: borders, dividers, decorations
Parchment   #F0EDE5   Surface: card backgrounds, sidebar
Warm White  #FAFAF5   Page background
Paper       #FFFFFF   Inputs, modals

Ink         #1C1917   Body text (warm near-black)
Stone       #57534E   Secondary text
Sand        #A8A29E   Placeholder text
```

### Typography

- Font: Geist Sans (bundled with Next.js)
- No custom font loading

### Spacing & Borders

- Border radius: `rounded-lg` (8px) uniformly
- Spacing: Tailwind default 4px grid
- Cards: generous breathing room between elements

### Anti-AI Visual Rules

- No gradient buttons (solid or bordered only)
- No glassmorphism / backdrop-blur
- No heavy box-shadow (at most very subtle elevation)
- Icons: Lucide (outline style, not filled)
- Chart colors: natural palette, not rainbow

## Layout Architecture

### App Shell (shared by all pages except Homepage)

```
┌─────────────────────────────────────────────────┐
│  Topbar: logo (left) + site switcher (right)    │  h-14
├─────┬───────────────────────────────────────────┤
│     │                                           │
│Side │         Main content area                 │
│bar  │         max-w-6xl mx-auto py-8 px-6       │
│w-14 │                                           │
│     │                                           │
├─────┴───────────────────────────────────────────┤
│  Step indicator: ① → ② → ③ → ④                │  h-10
└─────────────────────────────────────────────────┘
```

### Sidebar (w-14)

- Icon + vertical text label (two lines per item)
- Active: Forest background + white text
- Inactive: Stone text
- Items: Record, Sites, Data, Report

### Topbar (h-14)

- Left: "Eco Evidence" text, Forest color, font-semibold
- Right: site selector dropdown (pill shape, Parchment background)
- Bottom: 1px Bark divider

### Step Indicator (h-10)

- Four step dots connected by lines
- Completed steps: Forest fill
- Current step: Leaf ring
- Future steps: Sand fill
- All steps clickable in demo mode

## Pages

### Homepage (no sidebar/step indicator)

- Full-screen immersive layout
- Centered content on Warm White background
- Bottom: subtle Parchment SVG wave divider (topographic contour style)
- Logo: emoji + "Eco Evidence", `text-4xl font-semibold`, Forest color
- Tagline: `text-lg`, Stone, centered, two lines
- Description: 3 lines, `text-sm`, brief explanation
- Two CTAs:
  - "Start a Survey": Forest solid button, white text, `rounded-lg h-12 px-8`
  - "View Demo": Parchment background + Bark border, Ink text, same size
- Footer: "Open source · Free · Community-first", `text-xs`, Sand
- No hero image, no animations, no particle backgrounds

### Record Page

**Flow:**

1. Photo upload area (dashed border card, Parchment bg)
   - "Take Photo" and "Choose File" buttons side by side
2. After upload: species identification result card
   - Loading: "Loading..." text + rotating Leaf color dot
   - Result: species name (bold) + scientific name (italic, Stone) + confidence %
   - "Accept" (Forest) and "Edit" (text link) buttons
3. Auto-filled metadata: timestamp, GPS coordinates (`text-sm`, Stone)
4. Manual inputs: Observer name, Notes (standard text fields)
5. "Save Observation" button: full-width, Forest, `rounded-lg`

**Card decoration:** small Leaf color block `w-1 h-4` at top-left corner (folder tab motif)

### Locations Page

**Site list:**
- Cards with white bg, 1px Bark border, `rounded-lg`
- Left: Leaf vertical stripe `w-1` (matches Record page cards)
- Content: site name (font-medium), description (text-sm, Stone), stats (Leaf numbers + Stone labels), last survey date (text-xs, Sand)
- "Open →" link at bottom-right, Forest color, underline on hover

**"+ New" button:**
- Top-right of page header, Forest text + "+" icon
- Expands inline form: name + description + coordinates

**Site detail view (`/locations/[id]`):**
- All observations for that site in a simple table
- Columns: Date | Species | Confidence | Observer
- Dividers between rows, no zebra striping

**Demo data:** two pre-loaded sites matching the two scenarios from the design doc

### Dashboard Page

**Header:**
- Site name as page title
- Subtitle: "X observations · Y species · Z observers"

**Stats bar:**
- Four numbers in a row, each centered
- Large number (`text-2xl font-semibold`, Forest) + label (`text-xs`, Sand)
- Shannon Index: raw value + High/Medium/Low pill (Leaf color)
- Bottom: 1px divider

**Charts (2x2 grid):**
Each in a white card. Chart area background: Parchment. No grid lines or very subtle horizontal guides.

1. Species Count Timeline (Line Chart)
   - X: months, Y: species count
2. Species Distribution (Pie Chart)
   - Birds: Forest, Insects: Leaf, Plants: Bark, Mammals: #C4B5A0 (light brown), Others: Sand
3. Monthly Species Trends (Multi-line Chart)
   - X: month, Y: observation count, one line per species
4. Diversity Index Trend (Line Chart)
   - Shannon Index over time

**Chart colors (avoiding rainbow):**
- Primary line: Forest `#2D5016`
- Secondary: Leaf `#5C8A3C`
- Tertiary: Bark `#8B6F47`
- Fourth: `#A7C4A0` (light green)
- Fifth: `#C4B5A0` (light brown)

**Recharts config:**
- Animations disabled
- Tooltip: white card, Forest text
- Axis text: Sand color, axis lines: Parchment

**Recent Observations:**
- Compact list at bottom, max 5 items
- Each row: 32x32 Parchment thumbnail placeholder + species name + date + confidence
- `text-sm`

### Report Page (Core Differentiation)

**Configuration card:**
- White card with three fields:
  - Location: select dropdown (existing sites)
  - Period: two date pickers (start/end)
  - Observers: text input
- "Generate Report" button: Forest, full-width

**Report preview (after generation):**
- A4-ratio white area with subtle Parchment shadow (paper feel)
- Sections matching the report template:
  - Header: site name + survey period + summary stats
  - Charts: embedded mini charts
  - Species table: Top 10 species
  - Community Memory: quote-style text blocks (3px Leaf left border)
  - Recommended Actions: checkbox list
  - Footer: Eco Evidence branding

**Community Memory block:**
- Each memory: quoted text + author name, `text-sm`, Stone
- 3px Leaf vertical left border
- "Add a memory" text link at bottom

**Export actions:**
- "Export PDF": Forest button, triggers download
- "Share Link": Bark border button, copies link, shows "Copied!" feedback

**PDF generation:** via `@react-pdf/renderer`, styles matching preview

## File Structure

```
app/
├── layout.tsx              # Root layout (Geist font, globals)
├── page.tsx                # Homepage (standalone, no shell)
├── (app)/
│   ├── layout.tsx          # App shell: topbar + sidebar + step indicator
│   ├── record/
│   │   └── page.tsx
│   ├── locations/
│   │   ├── page.tsx        # Site list
│   │   └── [id]/
│   │       └── page.tsx    # Site detail
│   ├── dashboard/
│   │   └── page.tsx
│   └── report/
│       └── page.tsx

components/
├── layout/
│   ├── sidebar.tsx
│   ├── topbar.tsx
│   ├── step-indicator.tsx
│   └── app-shell.tsx
├── record/
│   ├── photo-upload.tsx
│   ├── species-result.tsx
│   └── observation-form.tsx
├── locations/
│   ├── site-card.tsx
│   ├── site-form.tsx
│   └── observation-table.tsx
├── dashboard/
│   ├── stats-bar.tsx
│   ├── species-timeline.tsx
│   ├── species-pie.tsx
│   ├── monthly-trends.tsx
│   ├── diversity-trend.tsx
│   └── recent-list.tsx
├── report/
│   ├── report-config.tsx
│   ├── report-preview.tsx
│   └── community-memory.tsx
└── ui/                    # shadcn/ui components (added as needed)

lib/
├── demo-data.ts           # Full mock data for two scenarios
├── types.ts               # TypeScript type definitions
├── utils.ts               # Shannon Index calc, date formatting
└── chart-colors.ts        # Chart color constants
```

## Dependencies to Install

```
pnpm add recharts lucide-react @react-pdf/renderer
```

shadcn/ui initialized via CLI, components added as needed.

## Demo Data

Two pre-loaded scenarios from the design doc:

1. **Oakwood Elementary School Nature Reserve** — educational survey, ~47 observations, 19 species, 8 observers, semester-long data
2. **Riverside Wetland — Under Development Threat** — emergency survey, ~30 observations, 14 species, concentrated in Mar-Apr

Both datasets include observations, locations, and community memories. All data lives in `lib/demo-data.ts` with no backend dependency.

## Out of Scope for This Phase

- Backend / Supabase integration (demo mode uses local data only)
- Real iNaturalist API calls (mock with fallback)
- User authentication
- PWA / offline support
- Internationalization beyond English
