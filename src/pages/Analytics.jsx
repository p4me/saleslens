import { useState, useMemo } from 'react'
import { useMonthlyRevenue, useRevenueByRegion, useRevenueByCategory } from '../hooks/useRevenue'
import { useDeals } from '../hooks/useDeals'
import GrowthAreaChart   from '../components/charts/GrowthAreaChart'
import RegionDonutChart  from '../components/charts/RegionDonutChart'
import CategoryBarChart  from '../components/charts/CategoryBarChart'
import StageBarChart     from '../components/charts/StageBarChart'
import '../components/charts/charts.css'
import './analytics.css'

const RANGES = [
  { label: '3M', months: 3 },
  { label: '6M', months: 6 },
  { label: '12M', months: 12 },
]

const currency = (v) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)

export default function Analytics() {
  const [range, setRange] = useState('12M')

  const { data: monthly   = [], isLoading: l1 } = useMonthlyRevenue()
  const { data: byRegion  = [], isLoading: l2 } = useRevenueByRegion()
  const { data: byCategory= [], isLoading: l3 } = useRevenueByCategory()
  const { data: deals     = [], isLoading: l4 } = useDeals()

  const isLoading = l1 || l2 || l3 || l4

  const selectedMonths = RANGES.find((r) => r.label === range)?.months ?? 12

  const filteredMonthly = useMemo(
    () => monthly.slice(-selectedMonths),
    [monthly, selectedMonths]
  )

  // MoM growth stats from filtered range
  const momStats = useMemo(() => {
    if (filteredMonthly.length < 2) return null
    const prev = filteredMonthly[filteredMonthly.length - 2].revenue
    const curr = filteredMonthly[filteredMonthly.length - 1].revenue
    const pct  = ((curr - prev) / prev * 100).toFixed(1)
    const totalRangeRevenue = filteredMonthly.reduce((s, m) => s + m.revenue, 0)
    return { pct: parseFloat(pct), curr, totalRangeRevenue }
  }, [filteredMonthly])

  if (isLoading) {
    return <div className="loading-state">Loading analytics…</div>
  }

  return (
    <div className="analytics-page">

      {/* Date range filter */}
      <div className="analytics-toolbar">
        <span className="analytics-toolbar-label">Time Range</span>
        <div className="analytics-range-btns">
          {RANGES.map(({ label }) => (
            <button
              key={label}
              className={`range-btn${range === label ? ' range-btn--active' : ''}`}
              onClick={() => setRange(label)}
            >
              {label}
            </button>
          ))}
        </div>

        {momStats && (
          <div className="analytics-mom-badge">
            <span className={momStats.pct >= 0 ? 'mom-up' : 'mom-down'}>
              {momStats.pct >= 0 ? '▲' : '▼'} {Math.abs(momStats.pct)}%
            </span>
            <span className="mom-label">MoM vs last month</span>
            <span className="mom-sep">·</span>
            <span className="mom-total">{currency(momStats.totalRangeRevenue)} in period</span>
          </div>
        )}
      </div>

      {/* Revenue trend area chart */}
      <div className="chart-card">
        <p className="chart-card-title">Revenue vs Target — Last {range}</p>
        <GrowthAreaChart data={filteredMonthly} />
      </div>

      {/* Region + Category row */}
      <div className="analytics-two-col">
        <div className="chart-card">
          <p className="chart-card-title">Revenue by Region</p>
          <RegionDonutChart data={byRegion} />
        </div>
        <div className="chart-card">
          <p className="chart-card-title">Revenue by Product Category</p>
          <CategoryBarChart data={byCategory} />
        </div>
      </div>

      {/* Deal stage pipeline */}
      <div className="chart-card">
        <div className="analytics-stage-header">
          <p className="chart-card-title" style={{ margin: 0 }}>Deal Pipeline by Stage</p>
          <div className="analytics-stage-legend">
            <span className="stage-legend-dot" style={{ background: '#a5b4fc' }} /> Early
            <span className="stage-legend-dot" style={{ background: '#6366f1', marginLeft: 12 }} /> Advanced
            <span className="stage-legend-dot" style={{ background: '#22c55e', marginLeft: 12 }} /> Won
            <span className="stage-legend-dot" style={{ background: '#ef4444', marginLeft: 12 }} /> Lost
          </div>
        </div>
        <StageBarChart deals={deals} />
      </div>

    </div>
  )
}
