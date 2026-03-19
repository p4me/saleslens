import { useState, useMemo } from 'react'
import { useDeals } from '../hooks/useDeals'
import DataTable from '../components/ui/DataTable'
import Badge from '../components/ui/Badge'
import '../components/ui/ui.css'
import '../components/ui/datatable.css'
import './deals.css'

const currency = (v) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)

const STAGES = ['All Stages', 'Prospecting', 'Qualification', 'Proposal', 'Negotiation', 'Won', 'Lost']

const columns = [
  {
    accessorKey: 'name',
    header: 'Deal Name',
    width: '30%',
    cell: ({ getValue }) => <span className="deals-deal-name">{getValue()}</span>,
  },
  {
    accessorKey: 'repName',
    header: 'Rep',
  },
  {
    accessorKey: 'stage',
    header: 'Stage',
    cell: ({ getValue }) => <span className="deals-stage">{getValue()}</span>,
  },
  {
    accessorKey: 'value',
    header: 'Value',
    cell: ({ getValue }) => <span className="deals-value">{currency(getValue())}</span>,
  },
  {
    accessorKey: 'closeDate',
    header: 'Close Date',
    cell: ({ getValue }) => (
      <span>{new Date(getValue()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    enableSorting: false,
    cell: ({ getValue }) => <Badge status={getValue()} />,
  },
]

export default function Deals() {
  const { data: deals = [], isLoading } = useDeals()
  const [search, setSearch]   = useState('')
  const [stage, setStage]     = useState('All Stages')

  const columnFilters = useMemo(() =>
    stage !== 'All Stages' ? [{ id: 'stage', value: stage }] : [],
    [stage]
  )

  // Summary counts
  const won        = deals.filter((d) => d.status === 'Won').length
  const lost       = deals.filter((d) => d.status === 'Lost').length
  const inProgress = deals.filter((d) => d.status === 'In Progress').length

  return (
    <div className="deals-page">

      {/* Summary pills */}
      <div className="deals-summary">
        <div className="deals-pill">
          <span className="deals-pill-num">{deals.length}</span>
          <span className="deals-pill-label">Total</span>
        </div>
        <div className="deals-pill deals-pill--green">
          <span className="deals-pill-num">{won}</span>
          <span className="deals-pill-label">Won</span>
        </div>
        <div className="deals-pill deals-pill--red">
          <span className="deals-pill-num">{lost}</span>
          <span className="deals-pill-label">Lost</span>
        </div>
        <div className="deals-pill deals-pill--yellow">
          <span className="deals-pill-num">{inProgress}</span>
          <span className="deals-pill-label">In Progress</span>
        </div>
      </div>

      {/* Table card */}
      <div className="deals-card">
        {/* Toolbar */}
        <div className="deals-toolbar">
          <input
            className="deals-search"
            type="text"
            placeholder="Search deals or reps…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="deals-filter"
            value={stage}
            onChange={(e) => setStage(e.target.value)}
          >
            {STAGES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {isLoading ? (
          <div className="loading-state">Loading deals…</div>
        ) : (
          <DataTable
            data={deals}
            columns={columns}
            globalFilter={search}
            columnFilters={columnFilters}
            pageSize={10}
          />
        )}
      </div>
    </div>
  )
}
