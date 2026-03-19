import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const COLORS = ['#6366f1', '#f59e0b', '#22c55e', '#ef4444']

const fmtFull = (v) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const { name, value } = payload[0]
  const total = payload[0].payload.total
  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip-label">{name}</p>
      <p style={{ color: payload[0].payload.fill }}>{fmtFull(value)}</p>
      <p style={{ color: '#94a3b8' }}>{((value / total) * 100).toFixed(1)}% of total</p>
    </div>
  )
}

export default function RegionDonutChart({ data }) {
  const total = data.reduce((s, d) => s + d.revenue, 0)
  const enriched = data.map((d, i) => ({ ...d, fill: COLORS[i % COLORS.length], total }))

  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={enriched}
          dataKey="revenue"
          nameKey="region"
          cx="50%"
          cy="50%"
          innerRadius={68}
          outerRadius={100}
          paddingAngle={3}
          strokeWidth={0}
        >
          {enriched.map((entry, i) => (
            <Cell key={i} fill={entry.fill} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          iconType="circle"
          iconSize={8}
          formatter={(value) => <span style={{ fontSize: '0.78rem', color: '#475569' }}>{value}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
