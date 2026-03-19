import { useLocation } from 'react-router-dom'
import './layout.css'

const titles = {
  '/':          'Dashboard',
  '/deals':     'Deals',
  '/reps':      'Sales Reps',
  '/analytics': 'Analytics',
}

export default function Header() {
  const { pathname } = useLocation()
  const base = '/' + pathname.split('/')[1]
  const title = titles[base] ?? 'SalesLens'

  return (
    <header className="header">
      <h1 className="header-title">{title}</h1>
      <div className="header-meta">
        <span className="header-date">
          {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </span>
      </div>
    </header>
  )
}
