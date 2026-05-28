import type { TrafficCard } from '../types/api'

type CongestionInfo = {
  label: string
  color: string
}

export const CONGESTION_MAP: Record<TrafficCard['congestion'], CongestionInfo> = {
  smooth: { label: '원활', color: '#22c55e' },
  normal: { label: '보통', color: '#f59e0b' },
  busy:   { label: '혼잡', color: '#ef4444' },
}
