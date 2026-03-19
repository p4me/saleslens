import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useReps } from '../hooks/useReps'
import DataTable from '../components/ui/DataTable'
import '../components/ui/ui.css'
import '../components/ui/datatable.css'
import './reps.css'

const currency = (v) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)

const REGIONS = ['All Regions', 'North', 'South', 'East', 'West']

function RepAvatar({ name }) {
  const initials = name.split(' ').map((n) => n[0]).join('')
  return <span className="rep-avatar">{initials}</span>
}

function QuotaBar({ value, quota }) {
  const pct = (value / quota) * 100
  const fill = Math.min(pct, 100)
  const color = pct >= 100 ? 'var(--green)' : pct >= 75 ? 'var(--yellow)' : 'var(--red)'
  return (
    <div className="quota-bar-wrap">
      <div className="quota-bar-track">
        <div className="quota-bar-fill" style={{ width: `${fill}%`, background: color }} />
      </div>
      <span className="quota-bar-label" style={{ color }}>{pct.toFixed(0)}%</span>
    </div>
  )
}

const columns = [
  {
    accessorKey: 'name',
    header: 'Rep',
    width: '22%',
    cell: ({ getValue }) => (
      <span className="rep-name-cell">
        <RepAvatar name={getValue()} />
        <span className="rep-name-text">{getValue()}</span>
      </span>
    ),
  },
  {
    accessorKey: 'region',
    header: 'Region',
    cell: ({ getValue }) => <span className="rep-region-tag">{getValue()}</span>,
  },
  {
    accessorKey: 'revenue',
    header: 'Revenue',
    cell: ({ getValue }) => <span className="rep-revenue">{currency(getValue())}</span>,
  },
  {
    accessorKey: 'dealsWon',
    header: 'Deals Won',
    cell: ({ row }) => (
      <span>
        {row.original.dealsWon}
        <span className="rep-deals-total"> / {row.original.dealsTotal}</span>
      </span>
    ),
  },
  {
    accessorKey: 'winRate',
    header: 'Win Rate',
    cell: ({ getValue }) => {
      const v = getValue()
      const color = v >= 65 ? 'var(--green)' : v >= 55 ? 'var(--yellow)' : 'var(--red)'
      return <span style={{ color, fontWeight: 600 }}>{v}%</span>
    },
  },
  {
    id: 'quotaAttainment',
    header: 'Quota Attainment',
    accessorFn: (row) => row.revenue / row.quota,
    cell: ({ row }) => <QuotaBar value={row.original.revenue} quota={row.original.quota} />,
  },
]

export default function Reps() {
  const { data: reps = [], isLoading } = useReps()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [region, setRegion] = useState('All Regions')

  const columnFilters = useMemo(
    () => (region !== 'All Regions' ? [{ id: 'region', value: region }] : []),
    [region]
  )

  return (
    <div className="reps-page">
      <div className="reps-card">
        <div className="reps-toolbar">
          <input
            className="reps-search"
            type="text"
            placeholder="Search reps…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="reps-filter"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          >
            {REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>

        {isLoading ? (
          <div className="loading-state">Loading reps…</div>
        ) : (
          <>
            <DataTable
              data={reps}
              columns={columns}
              globalFilter={search}
              columnFilters={columnFilters}
              pageSize={10}
              onRowClick={(rep) => navigate(`/reps/${rep.id}`)}
            />
            <p className="reps-hint">Click a row to view rep details →</p>
          </>
        )}
      </div>
    </div>
  )
}
