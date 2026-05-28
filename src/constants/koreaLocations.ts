export type KoreaLocation = {
  id: number
  name: string
  lat: number
  lon: number
}

export const KOREA_LOCATIONS: KoreaLocation[] = [
  { id:  1, name: '서울',    lat: 37.5665, lon: 126.9780 },
  { id:  2, name: '인천',    lat: 37.4563, lon: 126.7052 },
  { id:  3, name: '대전/세종', lat: 36.4801, lon: 127.2890 },
  { id:  4, name: '청주',    lat: 36.6424, lon: 127.4890 },
  { id:  5, name: '충주',    lat: 36.9910, lon: 127.9259 },
  { id:  6, name: '강릉',    lat: 37.7519, lon: 128.8761 },
  { id:  7, name: '속초',    lat: 38.2070, lon: 128.5918 },
  { id:  8, name: '대구',    lat: 35.8714, lon: 128.6014 },
  { id:  9, name: '광주',    lat: 35.1595, lon: 126.8526 },
  { id: 10, name: '부산',    lat: 35.1796, lon: 129.0756 },
  { id: 11, name: '제주',    lat: 33.4996, lon: 126.5312 },
  { id: 12, name: '서귀포',  lat: 33.2541, lon: 126.5600 },
  { id: 13, name: '독도',    lat: 37.2426, lon: 131.8647 },
]
