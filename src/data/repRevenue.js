import { reps } from './reps'

const MONTHS = [
  'Apr 2025', 'May 2025', 'Jun 2025', 'Jul 2025',
  'Aug 2025', 'Sep 2025', 'Oct 2025', 'Nov 2025',
  'Dec 2025', 'Jan 2026', 'Feb 2026', 'Mar 2026',
]

// Deterministic seasonal multipliers (same for every rep — varies the shape)
const MULTIPLIERS = [0.72, 0.88, 0.65, 1.05, 0.90, 1.12, 0.98, 1.18, 1.32, 1.10, 1.22, 1.38]

// Each rep gets a slight individual offset based on index to differentiate curves
const REP_OFFSETS = [0, 0.08, -0.06, 0.12, 0.04, -0.10, 0.07, -0.04, 0.09, -0.08]

export const repMonthlyRevenue = Object.fromEntries(
  reps.map((rep, ri) => {
    const avg = rep.revenue / 12
    const data = MONTHS.map((month, mi) => ({
      month,
      revenue: Math.round(avg * (MULTIPLIERS[mi] + REP_OFFSETS[ri])),
    }))
    return [rep.id, data]
  })
)
