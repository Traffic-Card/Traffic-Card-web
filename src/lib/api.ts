import type {
  FavoriteRegionResponse,
  FavoriteRegionSyncRequest,
  LoginRequest,
  MemberDetailResponse,
  SignupRequest,
  TokenResponse,
} from '../types/api'
import { getAccessToken } from './storage'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080'

async function request<T>(path: string, init?: RequestInit) {
  const token = getAccessToken()
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers ?? {}),
    },
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(text || `Request failed with status ${response.status}`)
  }

  if (response.status === 204) {
    return null as T
  }

  return (await response.json()) as T
}

export const memberApi = {
  signup(payload: SignupRequest) {
    return request<MemberDetailResponse>('/api/v1/members/signup', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  },

  login(payload: LoginRequest) {
    return request<TokenResponse>('/api/v1/members/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  },
}

export const favoriteRegionApi = {
  findAll() {
    return request<FavoriteRegionResponse[]>('/api/v1/regions')
  },

  sync(payload: FavoriteRegionSyncRequest) {
    return request<FavoriteRegionResponse[]>('/api/v1/regions', {
      method: 'PUT',
      body: JSON.stringify(payload),
    })
  },
}
