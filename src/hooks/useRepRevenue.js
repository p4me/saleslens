import { useQuery } from '@tanstack/react-query'
import { repMonthlyRevenue } from '../data/repRevenue'

export function useRepMonthly(repId) {
  return useQuery({
    queryKey: ['revenue', 'rep', repId],
    queryFn: () =>
      new Promise((resolve) =>
        setTimeout(() => resolve(repMonthlyRevenue[repId] ?? []), 300)
      ),
    enabled: !!repId,
  })
}
