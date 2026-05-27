export type AppView = 'main' | 'login' | 'signup' | 'map' | 'edit'

export type HomeRegionRequest = {
  alias: string
  address: string
  regionName: string
  latitude: number
  longitude: number
}

export type LoginRequest = {
  username: string
  password: string
}

export type SignupRequest = {
  username: string
  password: string
  homeRegion: HomeRegionRequest
}

export type MemberDetailResponse = {
  memberId: number
  username: string
}

export type TokenResponse = {
  grantType: string
  accessToken: string
  refreshToken: string
}

export type FavoriteRegionRequest = {
  id?: number
  alias: string
  address: string
  regionName: string
  latitude: number
  longitude: number
}

export type FavoriteRegionSyncRequest = {
  regions: FavoriteRegionRequest[]
}

export type FavoriteRegionResponse = {
  id: number
  alias: string
  address: string
  regionName: string
  latitude: number
  longitude: number
}

export type TrafficCard = {
  id: number
  label: string
  district: string
  congestion: 'smooth' | 'normal' | 'busy'
  eta: string
}
