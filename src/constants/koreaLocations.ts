export type KoreaLocation = {
  id: number
  name: string
  latitude: number
  longitude: number
}

export const KOREA_LOCATIONS: KoreaLocation[] = [
  { id:  1, name: '서울',    latitude: 37.5665, longitude: 126.9780 },
  { id:  2, name: '인천',    latitude: 37.4563, longitude: 126.7052 },
  { id:  3, name: '대전/세종', latitude: 36.4801, longitude: 127.2890 },
  { id:  4, name: '청주',    latitude: 36.6424, longitude: 127.4890 },
  { id:  5, name: '충주',    latitude: 36.9910, longitude: 127.9259 },
  { id:  6, name: '강릉',    latitude: 37.7519, longitude: 128.8761 },
  { id:  7, name: '속초',    latitude: 38.2070, longitude: 128.5918 },
  { id:  8, name: '대구',    latitude: 35.8714, longitude: 128.6014 },
  { id:  9, name: '광주',    latitude: 35.1595, longitude: 126.8526 },
  { id: 10, name: '부산',    latitude: 35.1796, longitude: 129.0756 },
  { id: 11, name: '제주',    latitude: 33.4996, longitude: 126.5312 },
  { id: 12, name: '서귀포',  latitude: 33.2541, longitude: 126.5600 },
  { id: 13, name: '독도',    latitude: 37.2426, longitude: 131.8647 },
]
