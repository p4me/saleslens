import { useParams, useNavigate } from 'react-router-dom'
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip,
} from 'recharts'
import { useRep } from '../hooks/useReps'
import { useDealsByRep } from '../hooks/useDeals'
import { useRepMonthly } from '../hooks/useRepRevenue'
import DataTable from '../components/ui/DataTable'
import KpiCard from '../components/ui/KpiCard'
import Badge from '../components/ui/Badge'
import '../components/ui/ui.css'
import '../components/ui/datatable.css'
import '../components/charts/charts.css'
import './repdetail.css'

const currency = (v) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)

const fmtK = (v) => `$${(v / 1000).toFixed(0)}K`

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip-label">{label}</p>
      <p style={{ color: '#6366f1' }}>Revenue: {currency(payload[0].value)}</p>
    </div>
  )
}

const dealColumns = [
  {
    accessorKey: 'name',
    header: 'Deal Name',
    width: '35%',
    cell: ({ getValue }) => <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{getValue()}</span>,
  },
  {
    accessorKey: 'stage',
    header: 'Stage',
    cell: ({ getValue }) => <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{getValue()}</span>,
  },
  {
    accessorKey: 'value',
    header: 'Value',
    cell: ({ getValue }) => (
      <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums' }}>
        {currency(getValue())}
      </span>
    ),
  },
  {
    accessorKey: 'closeDate',
    header: 'Close Date',
    cell: ({ getValue }) =>
      new Date(getValue()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    enableSorting: false,
    cell: ({ getValue }) => <Badge status={getValue()} />,
  },
]

export default function RepDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  const { data: rep,   isLoading: repLoading }     = useRep(id)
  const { data: deals = [], isLoading: dealsLoading } = useDealsByRep(id)
  const { data: monthly = [], isLoading: revLoading }  = useRepMonthly(id)

  const isLoading = repLoading || dealsLoading || revLoading

  if (isLoading) {
    return <div className="loading-state">Loading rep details…</div>
  }

  if (!rep) {
    return (
      <div className="repdetail-not-found">
        <p>Rep not found.</p>
        <button className="repdetail-back" onClick={() => navigate('/reps')}>← Back to Reps</button>
      </div>
    )
  }

  const quotaPct   = ((rep.revenue / rep.quota) * 100).toFixed(1)
  const wonDeals   = deals.filter((d) => d.status === 'Won')
  const totalValue = wonDeals.reduce((s, d) => s + d.value, 0)

  return (
    <div className="repdetail">

      {/* Back + title */}
      <div className="repdetail-header">
        <button className="repdetail-back" onClick={() => navigate('/reps')}>
          ← Back to Reps
        </button>
        <div className="repdetail-identity">
          <div className="repdetail-avatar">
            {rep.name.split(' ').map((n) => n[0]).join('')}
          </div>
          <div>
            <h2 className="repdetail-name">{rep.name}</h2>
            <span className="repdetail-region">{rep.region} Region</span>
          </div>
        </div>
      </div>

      {/* KPI cards */}
      <div className="repdetail-kpi-grid">
        <KpiCard title="Revenue"          value={currency(rep.revenue)}   sub={`Quota: ${currency(rep.quota)}`} />
        <KpiCard title="Deals Won"        value={rep.dealsWon}            sub={`of ${rep.dealsTotal} total`} />
        <KpiCard title="Win Rate"         value={`${rep.winRate}%`}       trendUp={rep.winRate >= 65} sub={rep.winRate >= 65 ? 'Above avg' : 'Below avg'} />
        <KpiCard title="Quota Attainment" value={`${quotaPct}%`}          trendUp={parseFloat(quotaPct) >= 100} sub={parseFloat(quotaPct) >= 100 ? 'Quota met' : 'Quota not met'} />
      </div>

      {/* Monthly revenue chart */}
      <div className="chart-card">
        <p className="chart-card-title">Monthly Revenue — {rep.name.split(' ')[0]}</p>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={monthly} margin={{ top: 4, right: 16, left: 8, bottom: 0 }} barSize={22}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: '#94a3b8' }}
              tickLine={false}
              axisLine={false}
              interval={1}
            />
            <YAxis
              tickFormatter={fmtK}
              tick={{ fontSize: 11, fill: '#94a3b8' }}
              tickLine={false}
              axisLine={false}
              width={52}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f1f5f9' }} />
            <Bar dataKey="revenue" fill="#6366f1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Deals table */}
      <div className="repdetail-deals-card">
        <p className="chart-card-title">
          Deals ({deals.length})
          <span className="repdetail-deals-total"> · {currency(totalValue)} won</span>
        </p>
        <DataTable data={deals} columns={dealColumns} pageSize={10} />
      </div>
    </div>
  )
}
