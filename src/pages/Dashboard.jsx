import KpiCard from '../components/ui/KpiCard'
import Badge from '../components/ui/Badge'
import RevenueLineChart from '../components/charts/RevenueLineChart'
import RepBarChart from '../components/charts/RepBarChart'
import { useDeals } from '../hooks/useDeals'
import { useReps } from '../hooks/useReps'
import { useMonthlyRevenue } from '../hooks/useRevenue'
import '../components/ui/ui.css'
import '../components/charts/charts.css'
import './dashboard.css'

const currency = (v) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)

export default function Dashboard() {
  const { data: deals = [], isLoading: dealsLoading } = useDeals()
  const { data: reps = [],  isLoading: repsLoading }  = useReps()
  const { data: revenue = [], isLoading: revLoading }  = useMonthlyRevenue()

  const isLoading = dealsLoading || repsLoading || revLoading

  // ── KPI computations ──────────────────────────────────────
  const wonDeals     = deals.filter((d) => d.status === 'Won')
  const totalRevenue = wonDeals.reduce((sum, d) => sum + d.value, 0)
  const dealsClosed  = wonDeals.length
  const winRate      = deals.length ? ((dealsClosed / deals.length) * 100).toFixed(1) : 0
  const avgDealSize  = dealsClosed ? Math.round(totalRevenue / dealsClosed) : 0

  // ── Top 5 reps by revenue ─────────────────────────────────
  const topReps = [...reps]
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5)
    .map((r) => ({ name: r.name.split(' ')[0], revenue: r.revenue }))

  // ── Recent deals (last 10, newest first) ─────────────────
  const recentDeals = [...deals]
    .sort((a, b) => new Date(b.closeDate) - new Date(a.closeDate))
    .slice(0, 10)

  if (isLoading) {
    return <div className="loading-state">Loading dashboard…</div>
  }

  return (
    <div className="dashboard">

      {/* KPI Cards */}
      <div className="kpi-grid">
        <KpiCard
          title="Total Revenue"
          value={currency(totalRevenue)}
          sub="FY 2025–26"
        />
        <KpiCard
          title="Deals Closed"
          value={dealsClosed}
          sub={`of ${deals.length} total`}
        />
        <KpiCard
          title="Win Rate"
          value={`${winRate}%`}
          trendUp={parseFloat(winRate) >= 60}
          sub={parseFloat(winRate) >= 60 ? 'Above target' : 'Below target'}
        />
        <KpiCard
          title="Avg Deal Size"
          value={currency(avgDealSize)}
          sub="per closed deal"
        />
      </div>

      {/* Charts row */}
      <div className="charts-grid">
        <div className="chart-card">
          <p className="chart-card-title">Monthly Revenue vs Target</p>
          <RevenueLineChart data={revenue} />
        </div>
        <div className="chart-card">
          <p className="chart-card-title">Top 5 Reps by Revenue</p>
          <RepBarChart data={topReps} />
        </div>
      </div>

      {/* Recent Deals */}
      <div className="recent-deals-card">
        <p className="chart-card-title">Recent Deals</p>
        <table className="recent-table">
          <thead>
            <tr>
              <th>Deal</th>
              <th>Rep</th>
              <th>Stage</th>
              <th>Value</th>
              <th>Close Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentDeals.map((deal) => (
              <tr key={deal.id}>
                <td className="deal-name">{deal.name}</td>
                <td>{deal.repName}</td>
                <td className="text-muted">{deal.stage}</td>
                <td className="deal-value">{currency(deal.value)}</td>
                <td className="text-muted">
                  {new Date(deal.closeDate).toLocaleDateString('en-US', {
                    month: 'short', day: 'numeric', year: 'numeric',
                  })}
                </td>
                <td><Badge status={deal.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
