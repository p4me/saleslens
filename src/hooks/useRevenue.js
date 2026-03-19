import { useQuery } from '@tanstack/react-query'
import { monthlyRevenue, revenueByRegion, revenueByCategory } from '../data/revenue'

const delay = (data) =>
  new Promise((resolve) => setTimeout(() => resolve(data), 300))

export function useMonthlyRevenue() {
  return useQuery({ queryKey: ['revenue', 'monthly'], queryFn: () => delay(monthlyRevenue) })
}

export function useRevenueByRegion() {
  return useQuery({ queryKey: ['revenue', 'region'], queryFn: () => delay(revenueByRegion) })
}

export function useRevenueByCategory() {
  return useQuery({ queryKey: ['revenue', 'category'], queryFn: () => delay(revenueByCategory) })
}
