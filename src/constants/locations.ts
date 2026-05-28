export type FixedLocation = {
  id: number
  label: string
  district: string
  latitude: number
  longitude: number
}

export const FIXED_LOCATIONS: FixedLocation[] = [
  { id: 1, label: '광화문',     district: '서울 종로구',        latitude: 37.5759, longitude: 126.9769 },
  { id: 2, label: '카카오 본사', district: '경기 성남시 분당구',  latitude: 37.3998, longitude: 127.1068 },
  { id: 3, label: '인천공항',   district: '인천 중구',           latitude: 37.4420, longitude: 126.4514 },
  { id: 4, label: '해운대',     district: '부산 해운대구',        latitude: 35.1620, longitude: 129.1598 },
  { id: 5, label: '홍대입구역', district: '서울 마포구',          latitude: 37.5573, longitude: 126.9245 },
]
