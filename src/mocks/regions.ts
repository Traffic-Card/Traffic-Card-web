import type { FavoriteRegionResponse, TrafficCard } from '../types/api'

export const mockRegionCongestion: Record<number, {
  congestion: TrafficCard['congestion']
  updatedAt: string
}> = {
  1: { congestion: 'normal', updatedAt: '14:30' },
  2: { congestion: 'smooth', updatedAt: '14:31' },
  3: { congestion: 'busy',   updatedAt: '14:32' },
  4: { congestion: 'normal', updatedAt: '14:33' },
}

export const mockFavoriteRegions: FavoriteRegionResponse[] = [
  {
    id: 1,
    alias: 'Home',
    address: '인천광역시 연수구 송도동 1-1',
    regionName: '인천 연수구',
    latitude: 37.3826,
    longitude: 126.6569,
  },
  {
    id: 2,
    alias: 'School',
    address: '인천광역시 미추홀구 인하로 100',
    regionName: '인천 미추홀구',
    latitude: 37.4500,
    longitude: 126.6524,
  },
  {
    id: 3,
    alias: 'Hospital',
    address: '인천광역시 남동구 구월동 1234',
    regionName: '인천 남동구',
    latitude: 37.4480,
    longitude: 126.7310,
  },
  {
    id: 4,
    alias: 'Gym',
    address: '서울특별시 강남구 테헤란로 521',
    regionName: '서울 강남구',
    latitude: 37.5066,
    longitude: 127.0560,
  },
]
