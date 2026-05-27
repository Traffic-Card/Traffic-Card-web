import type { TrafficCard } from '../types/api'

export const mockTrafficCards: TrafficCard[] = [
  { id: 1, label: '강남구',  district: '서울특별시 강남구',      congestion: 'busy',   eta: '14:30' },
  { id: 2, label: '송도',    district: '인천광역시 연수구',      congestion: 'normal', eta: '14:31' },
  { id: 3, label: '홍대',    district: '서울특별시 마포구',      congestion: 'smooth', eta: '14:32' },
  { id: 4, label: '판교',    district: '경기도 성남시 분당구',   congestion: 'normal', eta: '14:33' },
  { id: 5, label: '여의도',  district: '서울특별시 영등포구',    congestion: 'busy',   eta: '14:34' },
]
