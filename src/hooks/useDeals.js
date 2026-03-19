import { useQuery } from '@tanstack/react-query'
import { deals } from '../data/deals'

const fetchDeals = () =>
  new Promise((resolve) => setTimeout(() => resolve(deals), 300))

export function useDeals() {
  return useQuery({ queryKey: ['deals'], queryFn: fetchDeals })
}

export function useDealsByRep(repId) {
  return useQuery({
    queryKey: ['deals', 'rep', repId],
    queryFn: () =>
      new Promise((resolve) =>
        setTimeout(
          () => resolve(deals.filter((d) => d.repId === repId)),
          300
        )
      ),
    enabled: !!repId,
  })
}
