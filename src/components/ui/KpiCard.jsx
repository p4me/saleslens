import './ui.css'

export default function KpiCard({ title, value, sub, trendUp }) {
  return (
    <div className="kpi-card">
      <span className="kpi-title">{title}</span>
      <span className="kpi-value">{value}</span>
      {sub !== undefined && (
        <span className={`kpi-sub ${trendUp === true ? 'kpi-sub--up' : trendUp === false ? 'kpi-sub--down' : ''}`}>
          {trendUp === true && '▲ '}
          {trendUp === false && '▼ '}
          {sub}
        </span>
      )}
    </div>
  )
}
