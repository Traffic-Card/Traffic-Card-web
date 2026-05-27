import type {
  FavoriteRegionRequest,
  TrafficCard,
} from '../types/api'

export const trafficCards: TrafficCard[] = [
  { id: 1, label: 'HOME', district: '인하대 후문', congestion: 'smooth', eta: '12분' },
  { id: 2, label: 'SCHOOL', district: '주안역 사거리', congestion: 'normal', eta: '18분' },
  { id: 3, label: 'WORK', district: '송도 센트럴파크', congestion: 'busy', eta: '27분' },
  { id: 4, label: 'GYM', district: '부평 문화의거리', congestion: 'normal', eta: '21분' },
  { id: 5, label: 'WEEKEND', district: '월미도 입구', congestion: 'smooth', eta: '16분' },
]

export const defaultFavoriteRegions: FavoriteRegionRequest[] = [
  {
    id: 1,
    alias: 'Home',
    address: '인천광역시 미추홀구 용현동',
    regionName: '용현동',
    latitude: 37.4489,
    longitude: 126.6531,
  },
  {
    id: 2,
    alias: 'School',
    address: '인천광역시 미추홀구 인하로 100',
    regionName: '인하대학교',
    latitude: 37.4518,
    longitude: 126.653,
  },
  {
    id: 3,
    alias: 'Hospital',
    address: '인천광역시 연수구 먼우금로 98',
    regionName: '연수동',
    latitude: 37.4101,
    longitude: 126.6784,
  },
  {
    id: 4,
    alias: 'Gym',
    address: '인천광역시 부평구 경원대로 1420',
    regionName: '부평동',
    latitude: 37.4913,
    longitude: 126.7233,
  },
  {
    id: 5,
    alias: 'Weekend',
    address: '인천광역시 중구 월미문화로 43',
    regionName: '월미도',
    latitude: 37.4737,
    longitude: 126.5974,
  },
]

export const storagePlan = [
  '로그인 상태와 access token은 sessionStorage로 먼저 관리',
  '최근 조회한 교통 카드 5개는 localStorage에 저장',
  '지도에서 조회한 좌표와 API 응답 캐시는 IndexedDB로 확장',
  '회원이 등록한 자주 가는 장소는 DBMS에 영속 저장',
]

export const deployPlan = [
  '프론트엔드는 Vite build 결과물을 Nginx로 서빙',
  '백엔드는 현재 Docker 컨테이너를 유지하고 /api 로 프록시',
  'GitHub Actions에서 build, lint 후 EC2에 자동 배포',
  '발표용 데모 계정과 샘플 위치 데이터는 seed 데이터로 준비',
]
