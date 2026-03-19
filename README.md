# SalesLens

A sales analytics dashboard for tracking revenue, rep performance, deals, and trends. Built with React + Vite using mock data — no backend required.

## Features

| Page | What it does |
|---|---|
| **Dashboard** `/` | KPI cards, revenue vs target line chart, top 5 reps bar chart, recent deals table |
| **Deals** `/deals` | Full deals table with search, stage filter, sortable columns, pagination, and status badges |
| **Sales Reps** `/reps` | Rep performance table with quota attainment progress bars, search, and region filter |
| **Rep Detail** `/reps/:id` | Individual rep stats, monthly revenue bar chart, and their deals table |
| **Analytics** `/analytics` | Revenue trend area chart, region donut chart, product category bar chart, deal stage pipeline — with 3M / 6M / 12M date range filter |

## Tech Stack

- **React 19** + **Vite 8**
- **React Router DOM** — client-side routing
- **TanStack React Query** — data fetching and caching
- **TanStack React Table** — sortable, filterable, paginated tables
- **Recharts** — all charts and graphs
- **Custom CSS** — no UI library, CSS variables for theming

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## Project Structure

```
src/
├── components/
│   ├── layout/          # Sidebar, Header, Layout shell
│   ├── ui/              # KpiCard, Badge, DataTable (reusable)
│   └── charts/          # RevenueLineChart, RepBarChart, RegionDonutChart,
│                        #   CategoryBarChart, GrowthAreaChart, StageBarChart
├── pages/
│   ├── Dashboard.jsx
│   ├── Deals.jsx
│   ├── Reps.jsx
│   ├── RepDetail.jsx
│   └── Analytics.jsx
├── data/                # Mock data — reps, deals, revenue, repRevenue
├── hooks/               # React Query hooks — useDeals, useReps, useRevenue, useRepRevenue
├── App.jsx              # Router setup
└── main.jsx             # QueryClient provider
```

## Data

All data is mock and lives in `src/data/`. No API calls are made. React Query hooks simulate async fetching with a short delay so loading states work as expected.

To swap in a real API, replace the `src/hooks/` implementations — the pages and components don't need to change.

## Scripts

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Run ESLint
```
