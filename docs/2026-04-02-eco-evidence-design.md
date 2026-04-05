# Eco Evidence — Design Document

> For One4Earth Climate Change-Makers Challenge 2026 Hackathon

---

## Product Positioning

**Name:** Eco Evidence

**Tagline:** Turn everyday nature observations into legally-admissible ecological evidence for any community.

**Core Insight:** Existing citizen science apps (iNaturalist, etc.) solve the "identify species" problem, but lack the ability to turn data into actionable advocacy tools for communities. We are not a research tool, not a social platform, not an NGO connector—we are an **evidence generator**.

**Target Users:**
- Rural/suburban students and teachers (education scenario)
- Residents wanting to protect local ecology (advocacy scenario)
- Individuals tracking local ecology long-term (evidence banking scenario)
- Anyone wanting to document ecological changes in their community

**Core Value:** Existing tools help you "know species"; we help you "speak with data." They are the data **entry point**; we are the data **exit point**.

---

## Three-Layer Value Framework

| Layer | Value | Description |
|-------|-------|-------------|
| **Layer 1 (Immediate)** | Education + Connection + Memory | Students learn to describe nature with data; communities do meaningful work together; elders' memories sit alongside data |
| **Layer 2 (Banking)** | Evidence Bank | Continuous accumulation forms ecological baseline; data has long-term value even if not used immediately |
| **Layer 3 (Action)** | Legal Force | When threats emerge, data-backed opinions in EIA public consultation ≠ emotional appeals |

**The chain doesn't depend on any single link:**
- If no development threat → Layer 1 and Layer 2 values exist independently
- If threat emerges → Layer 3 activates with legal force

---

## Legal Mechanism: Environmental Impact Assessment (EIA)

**This is Eco Evidence's core legal foundation.**

EIA is a global standard adopted after the 1992 UN Rio Earth Summit, with 100+ countries having mandatory EIA systems.

**How it works:**
1. Developer proposes construction project
2. Law requires environmental impact assessment
3. Assessment includes **public consultation** phase
4. Any citizen/organization can submit opinions and evidence
5. Decision-makers are **legally obligated to respond** to substantive objections (cannot simply ignore)

**Key distinction:**
- Submitting "I don't want this project" → emotional appeal → can be legally ignored
- Submitting "Over the past 12 months we recorded 47 species in this area, including X endangered species" → **data-backed objection → law requires response**

**Real case:** UK Great Crested Newt — community members recorded protected species through ecological surveys. This data was submitted to local planning authorities, who were legally required to consider it. Numerous housing developments were delayed, modified, or cancelled as a result.

---

## Theme Alignment

| Theme | Alignment |
|-------|-----------|
| **Biodiversity & Nature-Based Solutions** | Direct monitoring and recording of local biodiversity changes |
| **Mobilizing Capacity & Collective Action** | Students/residents as observers, data-driven community advocacy |

---

## Four Lens Manifestation

| Lens | How It Manifests |
|------|------------------|
| **Equity & Justice** | Open source and free, designed for under-resourced rural communities; students as changemakers; a class of students can generate reports with the same legal validity as professional assessments; **English UI for international accessibility** |
| **Practical Lens** | Minimal MVP, completable in 4 days; only needs smartphone and curiosity; no expensive equipment required |
| **Two-Eyed Seeing Approach** | Every report includes "Community Memory" section—scientific data alongside generational knowledge, not competing but in dialogue |
| **Systems Approach** | Observe → Visualize → Report → Legal mechanism (EIA public consultation), connecting to biodiversity protection legal systems in 100+ countries |

---

## Core Feature Flow

```
┌──────────────────────────────────────────────────────────────┐
│                        Eco Evidence                          │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  STEP 1: Record                                             │
│  ├── Take photo or import from album                        │
│  ├── AI species identification (iNaturalist API + Mock)     │
│  └── Auto-record: time + location + species                 │
│                                                              │
│  STEP 2: Aggregate                                          │
│  ├── Select/create observation site                         │
│  └── Records at same location auto-categorized              │
│                                                              │
│  STEP 3: Visualize                                          │
│  ├── Timeline: species appearance/disappearance             │
│  ├── Species count trend charts                             │
│  ├── Species time trend (monthly)                           │
│  └── Biodiversity index trends                              │
│                                                              │
│  STEP 4: Report Generation ← Core Differentiation           │
│  ├── Auto-generate community advocacy report                │
│  ├── Includes: Data + Charts + Methodology + Community      │
│  │   Memory + Recommended Actions                           │
│  └── Export PDF / Share link / For EIA public consultation  │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## Homepage Design (Simplified)

**Principle:** Judges' first reaction should be "how does this tool work", not reading marketing copy.

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                    🌿 Eco Evidence                          │
│                                                             │
│         Turn observations into evidence that matters        │
│                                                             │
│     ┌─────────────────────┐  ┌─────────────────────┐       │
│     │                     │  │                     │       │
│     │   Start a Survey    │  │    View Demo        │       │
│     │                     │  │                     │       │
│     └─────────────────────┘  └─────────────────────┘       │
│                                                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

- **"Start a Survey"** → Go to Record page
- **"View Demo"** → Go directly to dashboard with pre-loaded demo data

---

## Report Template Design (Core Differentiation)

### Report Structure

```
┌─────────────────────────────────────────────────────┐
│            [Location Name] Ecological Survey Report │
│           Eco Evidence Report                       │
├─────────────────────────────────────────────────────┤
│  Observation Site: [Community name/coordinates]     │
│  Survey Period: [Start date] - [End date]           │
│  Observers: [School/organization/community name]    │
├─────────────────────────────────────────────────────┤
│                                                     │
│  EXECUTIVE SUMMARY                                  │
│  ─────────────────────────────────────────────────  │
│  • Total Observations: XX                           │
│  • Species Recorded: XX                             │
│  • Shannon Diversity Index (H'): X.XX (High/Med/Low)│
│  • Simpson's Index (1-D): 0.XX                      │
│  • Key Finding: [Auto-generated one-line summary]   │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  METHODOLOGY                                        │
│  ─────────────────────────────────────────────────  │
│  Survey Methodology:                                │
│  • Observations collected via photo-identification  │
│    using iNaturalist Computer Vision API (v2)       │
│  • GPS coordinates recorded automatically via       │
│    device geolocation                               │
│  • AI confidence threshold: observations below 70%  │
│    confidence flagged for manual review             │
│  • Survey period: [Auto-filled date range]          │
│  • Total observers: [Auto-filled observer count]    │
│  • Data storage: Local-first with export capability │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  TRENDS & CHANGES                                   │
│  ─────────────────────────────────────────────────  │
│  [Timeline chart: Species count over time]          │
│  [Pie chart: Species distribution]                  │
│  [Line chart: Monthly species trends]               │
│                                                     │
│  Notable Changes:                                   │
│  • [Species A] count decreased by XX%               │
│  • [Species B] not observed after month X           │
│  • New discovery: [Species C], possible climate     │
│    change indicator                                 │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  TOP SPECIES RECORDED                               │
│  ─────────────────────────────────────────────────  │
│  Common Name (Scientific Name)    Count    Status   │
│  ─────────────────────────────────────────────────  │
│  Monarch Butterfly               12                │
│  (Danaus plexippus)              ⚠️ Special Concern │
│                                                     │
│  Red-tailed Hawk                 8                 │
│  (Buteo jamaicensis)             —                 │
│                                                     │
│  ...                                                │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  COMMUNITY MEMORY ← Two-Eyed Seeing                 │
│  ─────────────────────────────────────────────────  │
│  An open space for community elders and residents   │
│  to share their memories of this land.              │
│                                                     │
│  • "When I was young, this river was full of        │
│     salmon..."                                      │
│  • "We used to see fireflies every summer..."       │
│  • [Invite community members to share their memory] │
│                                                     │
│  Scientific data and traditional knowledge sit      │
│  side by side—not competing, but in dialogue.       │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  RECOMMENDED ACTIONS                                │
│  ─────────────────────────────────────────────────  │
│  Based on observation data, we recommend:           │
│                                                     │
│  □ Protect/restore habitat for [species]            │
│  □ Reduce pesticide use                             │
│  □ Plant native species: [specific plants]          │
│  □ Establish protected areas                        │
│  □ Continue monitoring and update report annually   │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  CONTACT                                            │
│  ─────────────────────────────────────────────────  │
│  For more information or to support our action:     │
│  [Email/Social Media]                               │
│                                                     │
│  ─────────────────────────────────────────────────  │
│  Generated by Eco Evidence | eco-evidence.org       │
│  Data-Driven Community Action                       │
└─────────────────────────────────────────────────────┘
```

### Report Smart Analysis

| Auto-Analysis | Description |
|---------------|-------------|
| **Decline Alert** | Species not seen for X consecutive weeks → flagged as "possibly disappeared" |
| **New Discovery** | First-time recorded species → flagged as "new find" |
| **Seasonal Recommendations** | Suggest native plants to plant based on season |
| **Action Templates** | Match different suggestions by species type (birds/insects/plants) |
| **Community Memory** | Open text area inviting community elders to share traditional knowledge |
| **Shannon Diversity Index** | Calculate H' = -Σ(pi × ln(pi)), classify as High/Medium/Low diversity |
| **Conservation Status** | Display IUCN/local conservation status for recorded species |

### Shannon Diversity Index Reference

```
H' = -Σ(pi × ln(pi))
where pi = observations of species i / total observations
```

| H' Value | Interpretation |
|----------|----------------|
| < 1.0 | Low diversity |
| 1.0 - 2.0 | Medium diversity |
| > 2.0 | High diversity |

### Two-Eyed Seeing Manifestation

In reports, scientific data and traditional knowledge sit side by side:
- **Scientific View:** Species list, diversity indices, trend analysis
- **Traditional View:** Community Memory section, recording elders' view of "how it used to be"
- They don't compete—they dialogue. This is exactly the Two-Eyed Seeing One4Earth emphasizes.

---

## Demo Scenarios

### Scenario 1: School Educational Survey

```typescript
{
  id: "loc-oakwood-forest",
  name: "Oakwood Elementary School Nature Reserve",
  description: "A 2-hectare forest area behind Oakwood Elementary School. Students from grades 4-6 conducted a semester-long biodiversity survey as part of their science curriculum.",
  coordinates: { lat: 43.6532, lng: -79.3832 },
  createdAt: "2025-09-01T10:00:00Z",
  // ~47 observations, 19 species, 8 observers
  // 4 Community Memory entries from local elders
}
```

### Scenario 2: Community Resistance (Under Threat)

```typescript
{
  id: "loc-riverside-wetland",
  name: "Riverside Wetland — Under Development Threat",
  description: "A wetland area where a commercial development has been proposed. Community members organized an emergency biodiversity survey to document ecological value before the public consultation deadline.",
  coordinates: { lat: 43.6532, lng: -79.3832 },
  createdAt: "2026-03-01T10:00:00Z",
  // ~30 observations, concentrated in Mar-Apr (emergency survey)
  // Community Memory with "what used to be here" from elders
}
```

**Purpose of two scenarios:**
1. Show product is not just for education, but can respond to real threats
2. Demo video can switch between scenarios to show different use motivations
3. Second scenario's description directly brings out EIA public participation narrative

---

## Technical Architecture

### Tech Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| **Frontend Framework** | Next.js 14 (App Router) | Full-stack framework, front/backend unified, simple deployment |
| **UI** | TailwindCSS + shadcn/ui | High-quality components, rapid professional UI building |
| **Charts** | Recharts | React ecosystem, simple and easy to use |
| **Backend** | Next.js API Routes | Integrated with frontend |
| **Database** | Supabase (PostgreSQL) | Free tier sufficient, Auth + DB + Storage all-in-one |
| **File Storage** | Supabase Storage | Integrated with database |
| **Species ID** | iNaturalist API + Mock Fallback | Free open-source, high accuracy, **with fallback for demo reliability** |
| **Report Generation** | @react-pdf/renderer | React components directly generate PDF |

### Database Schema

```sql
-- Observation Locations
CREATE TABLE locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  coordinates POINT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  owner_id UUID REFERENCES auth.users(id)
);

-- Observation Records
CREATE TABLE observations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id UUID REFERENCES locations(id),
  species_name TEXT NOT NULL,
  species_common_name TEXT,
  confidence FLOAT,
  photo_url TEXT,
  observed_at TIMESTAMP DEFAULT NOW(),
  observer_name TEXT,
  notes TEXT
);

-- Reports
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id UUID REFERENCES locations(id),
  date_range_start DATE,
  date_range_end DATE,
  generated_at TIMESTAMP DEFAULT NOW(),
  pdf_url TEXT
);

-- Community Memory
CREATE TABLE community_memories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id UUID REFERENCES locations(id),
  author_name TEXT,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### API Endpoints

```
POST   /api/observations        # Create observation record
GET    /api/observations        # Get observation list (filterable by location)
GET    /api/observations/:id    # Get single record

POST   /api/locations           # Create observation site
GET    /api/locations           # Get observation site list
GET    /api/locations/:id       # Get single site details

POST   /api/identify            # Call iNaturalist API for species ID
                               # ⚠️ With Mock Fallback on failure
POST   /api/reports/generate    # Generate report PDF
GET    /api/reports/:id         # Get report
```

### Species Identification API (with Mock Fallback)

```typescript
// api/identify/route.ts
const MOCK_RESULT = {
  results: [{
    taxon: {
      id: 48662,
      name: "Danaus plexippus",
      preferred_common_name: "Monarch Butterfly",
      rank: "species",
      iconic_taxon_name: "Insecta",
    },
    combined_score: 94.5
  }]
};

// On iNaturalist API failure, fallback to mock data
// Ensures demo reliability - judges won't see error pages
```

---

## UI Language

**All UI text in English.** This includes:

- Navigation: "Record", "Locations", "Visualize", "Report"
- Homepage: All value propositions and CTAs
- Report page: "Generate Report", "Report Configuration", "Select Location", "Download PDF Report"
- Report PDF: All sections and labels in English
- Date format: `en-US` (e.g., "April 5, 2026")

**Rationale:** International judging panel (India, Middle East, Brazil, Canada). English UI demonstrates **Equity & Justice** through inclusive design.

---

## Visualization Design

### Dashboard Charts

1. **Species Count Timeline** (Line Chart)
   - X-axis: Time (months)
   - Y-axis: Species count
   - Shows biodiversity trends over time

2. **Species Distribution** (Pie Chart)
   - Proportion of each species category
   - Birds / Insects / Plants / Mammals / Others

3. **Monthly Species Trends** (Multi-line Chart)
   - X-axis: Month
   - Y-axis: Observation count
   - One line per species
   - **Shows species "disappearing" trends** - powerful advocacy data

4. **Diversity Index Trend** (Line Chart)
   - Shannon Index over time
   - Shows if biodiversity is increasing or decreasing

---

## 4-Day Development Plan

### Day 1: Foundation

- [ ] Project initialization (Next.js + TailwindCSS + shadcn/ui)
- [ ] Supabase project setup + database schema
- [ ] Photo/upload component
- [ ] Integrate iNaturalist ID API + Mock Fallback

### Day 2: Core Flow

- [ ] Observation record CRUD API
- [ ] Location management (create/select observation site)
- [ ] Basic timeline display

### Day 3: Visualization + Report

- [ ] Species change charts (Recharts)
- [ ] Report template design (with Methodology + Shannon Index)
- [ ] PDF export functionality

### Day 4: Polish + Demo

- [ ] UI polish
- [ ] Demo data preparation (two scenarios: school + threatened wetland)
- [ ] 4-minute demo video recording
- [ ] Submit!

---

## Demo Video Structure (4 minutes)

| Time | Content |
|------|---------|
| 0:00-0:30 | Problem intro: Communities have ecological data but can't effectively advocate |
| 0:30-1:00 | Solution: Eco Evidence introduction |
| 1:00-2:30 | Demo: Photo → Identify → Timeline → Report generation |
| 2:30-3:30 | Report showcase + "One-click generation" differentiation |
| 3:30-4:00 | Impact: Open source, scalable, community empowerment |

---

## Differentiation Summary

| Tool | What They Do | What They Don't | Eco Evidence |
|------|--------------|-----------------|--------------|
| **iNaturalist** | Species ID + global database | ❌ No report generation | We're data **exit point**, can integrate their API |
| **eBird** | Bird observation records + stats | ❌ No report generation | We're for community advocacy, not research stats |
| **GBIF** | Global biodiversity data aggregation | ❌ Research-focused, not community | We let ordinary people generate professional-grade reports |
| **Manual Reports** | N/A | ❌ Time-consuming, needs expertise | We automate data collection and report generation |

**One-line distinction:** They help you know species; we help you turn observations into a persuasive document.

---

## ⚠️ What We Don't Promise

| Don't Say | Correct Statement |
|-----------|-------------------|
| "Our reports can stop development projects" | "We give community voices data backing" |
| "Environmental organizations will use this data" | "Data has legal validity in EIA public consultation phase" |
| "Community data equals professional assessment" | "Community data can serve as evidence triggering deeper investigation" |

**Honest acknowledgment:** Community-generated data doesn't carry the same legal weight as professional ecological surveys. But it often serves as a **trigger**—forcing authorities to look more carefully.

---

## Open Source Plan

- Code repository: GitHub (MIT License)
- Deployment docs: Any community can self-deploy
- Multilingual support: EN/ZH/... (community contributions)

---

*Design doc updated: 2026-04-05*
*Based on product feedback from 2026-04-05*
*For: One4Earth Climate Change-Makers Challenge 2026*
