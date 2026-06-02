import type {
  SignupRequest,
  LoginRequest,
  TokenResponse,
  MemberDetailResponse,
  FavoriteRegionRequest,
  FavoriteRegionResponse,
} from '../types/api'

const BASE_URL = (import.meta.env.VITE_API_BASE_URL as string) ?? ''

export function getAccessToken(): string | null {
  return localStorage.getItem('accessToken')
}

export function setTokens(accessToken: string, refreshToken: string): void {
  localStorage.setItem('accessToken', accessToken)
  localStorage.setItem('refreshToken', refreshToken)
}

export function clearTokens(): void {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getAccessToken()
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((options.headers as Record<string, string>) ?? {}),
  }
  if (token) headers['Authorization'] = `Bearer ${token}`

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers })
  if (!res.ok) {
    if (res.status === 401) {
      clearTokens()
      window.dispatchEvent(new CustomEvent('auth:expired'))
    }
    const body = await res.json().catch(() => ({}))
    throw new Error(body.message ?? `HTTP ${res.status}`)
  }
  if (res.status === 204) return undefined as T
  return res.json()
}

export async function signup(data: SignupRequest): Promise<MemberDetailResponse> {
  return request<MemberDetailResponse>('/api/v1/members/signup', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function login(data: LoginRequest): Promise<TokenResponse> {
  const tokens = await request<TokenResponse>('/api/v1/members/login', {
    method: 'POST',
    body: JSON.stringify(data),
  })
  setTokens(tokens.accessToken, tokens.refreshToken)
  return tokens
}

export async function getRegions(): Promise<FavoriteRegionResponse[]> {
  return request<FavoriteRegionResponse[]>('/api/v1/regions')
}

export async function putRegions(regions: FavoriteRegionRequest[]): Promise<FavoriteRegionResponse[]> {
  return request<FavoriteRegionResponse[]>('/api/v1/regions', {
    method: 'PUT',
    body: JSON.stringify({ regions }),
  })
}
