import {
  ResponsiveContainer, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Cell, LabelList,
} from 'recharts'

const STAGE_ORDER = ['Prospecting', 'Qualification', 'Proposal', 'Negotiation', 'Won', 'Lost']
const COLORS = {
  Prospecting:   '#a5b4fc',
  Qualification: '#818cf8',
  Proposal:      '#6366f1',
  Negotiation:   '#4f52e0',
  Won:           '#22c55e',
  Lost:          '#ef4444',
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip-label">{label}</p>
      <p style={{ color: COLORS[label] ?? '#6366f1' }}>{payload[0].value} deals</p>
    </div>
  )
}

export default function StageBarChart({ deals }) {
  const counts = STAGE_ORDER.map((stage) => ({
    stage,
    count: deals.filter((d) => d.stage === stage).length,
    fill: COLORS[stage],
  }))

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={counts} margin={{ top: 16, right: 24, left: 8, bottom: 0 }} barSize={36}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
        <XAxis dataKey="stage" tick={{ fontSize: 12, fill: '#475569' }} tickLine={false} axisLine={false} />
        <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} axisLine={false} width={28} allowDecimals={false} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f1f5f9' }} />
        <Bar dataKey="count" radius={[4, 4, 0, 0]}>
          {counts.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
          <LabelList dataKey="count" position="top" style={{ fontSize: '0.78rem', fontWeight: 700, fill: '#475569' }} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
