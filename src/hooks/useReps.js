import { useQuery } from '@tanstack/react-query'
import { reps } from '../data/reps'

const fetchReps = () =>
  new Promise((resolve) => setTimeout(() => resolve(reps), 300))

export function useReps() {
  return useQuery({ queryKey: ['reps'], queryFn: fetchReps })
}

export function useRep(id) {
  return useQuery({
    queryKey: ['reps', id],
    queryFn: () =>
      new Promise((resolve) =>
        setTimeout(() => resolve(reps.find((r) => r.id === id) ?? null), 300)
      ),
  })
}
