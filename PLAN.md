# SalesLens — Build Plan

## What is SalesLens?
A sales analytics dashboard for tracking revenue, rep performance, deals, and trends. Powered by mock data (no backend required). Built with React + Vite.

---

## Tech Stack (already installed)
| Package | Purpose |
|---|---|
| React Router DOM | Page routing |
| TanStack React Query | Data fetching / caching |
| TanStack React Table | Sortable, filterable data tables |
| Recharts | Charts and graphs |

---

## Pages & Features

### Phase 1 — Core Shell ✅
- [x] **App layout** — Sidebar nav + top header + main content area
- [x] **Routing** — Wire up React Router with all page routes
- [x] **Mock data layer** — `src/data/` folder with realistic sales data (reps, deals, revenue)
- [x] **React Query setup** — QueryClient provider + mock async hooks

### Phase 2 — Dashboard Page (`/`) ✅
- [x] KPI summary cards: Total Revenue, Deals Closed, Win Rate, Avg Deal Size
- [x] Revenue trend line chart (monthly, last 12 months) — Recharts
- [x] Top 5 sales reps bar chart — Recharts
- [x] Recent deals list (last 10 deals)

### Phase 3 — Deals Page (`/deals`) ✅
- [x] Full deals table — TanStack Table
  - Columns: Deal Name, Rep, Stage, Value, Close Date, Status
  - Sortable columns
  - Global search filter
  - Stage filter (dropdown)
  - Pagination
- [x] Deal status badge (Won / Lost / In Progress)

### Phase 4 — Sales Reps Page (`/reps`) ✅
- [x] Reps performance table — TanStack Table
  - Columns: Name, Region, Deals Closed, Revenue, Win Rate, Quota Attainment
  - Sortable + searchable
- [x] Clicking a rep opens Rep Detail view (`/reps/:id`)
  - Rep stats cards
  - Monthly revenue bar chart for that rep
  - Their deals table

### Phase 5 — Analytics Page (`/analytics`) ✅
- [x] Revenue by Region — pie/donut chart — Recharts
- [x] Revenue by Product Category — bar chart — Recharts
- [x] Deal stage pipeline chart — Recharts
- [x] Month-over-month growth trend — area chart — Recharts
- [x] Date range filter (3M / 6M / 12M) with live MoM badge

---

## Folder Structure
```
src/
├── components/
│   ├── layout/
│   │   ├── Sidebar.jsx
│   │   ├── Header.jsx
│   │   └── Layout.jsx
│   ├── ui/
│   │   ├── KpiCard.jsx
│   │   ├── Badge.jsx
│   │   └── DataTable.jsx        ← reusable TanStack Table wrapper
│   └── charts/
│       ├── RevenueLineChart.jsx
│       ├── RepBarChart.jsx
│       ├── RegionPieChart.jsx
│       └── FunnelChart.jsx
├── pages/
│   ├── Dashboard.jsx
│   ├── Deals.jsx
│   ├── Reps.jsx
│   ├── RepDetail.jsx
│   └── Analytics.jsx
├── data/
│   ├── deals.js                 ← mock deals data
│   ├── reps.js                  ← mock reps data
│   └── revenue.js               ← mock monthly revenue data
├── hooks/
│   ├── useDeals.js              ← React Query hook
│   ├── useReps.js               ← React Query hook
│   └── useRevenue.js            ← React Query hook
├── App.jsx                      ← router setup
└── main.jsx                     ← QueryClient provider
```

---

## Build Order (step by step)

1. Mock data (`src/data/`)
2. React Query hooks (`src/hooks/`)
3. App layout + sidebar + routing (`App.jsx`, `Layout.jsx`, `Sidebar.jsx`, `Header.jsx`)
4. Dashboard page (KPI cards + charts)
5. Deals page (table + filters)
6. Reps page (table)
7. Rep Detail page
8. Analytics page (all charts + date filter)

---

## Design Decisions
- **No external UI library** — custom CSS (keep it simple, no Tailwind or MUI added)
- **Mock data only** — all data lives in `src/data/`, hooks simulate async with a short delay
- **Color palette** — dark navy sidebar, white content area, accent color blue/indigo
- **Responsive** — sidebar collapses on small screens

---

## Status
- [x] Scaffold created (Vite + React + dependencies)
- [x] Phase 1 — Core Shell
- [x] Phase 2 — Dashboard
- [x] Phase 3 — Deals
- [x] Phase 4 — Reps
- [x] Phase 5 — Analytics
