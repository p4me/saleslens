import './ui.css'

const colorMap = {
  Won:         'green',
  Lost:        'red',
  'In Progress': 'yellow',
}

export default function Badge({ status }) {
  const color = colorMap[status] ?? 'gray'
  return <span className={`badge badge--${color}`}>{status}</span>
}
