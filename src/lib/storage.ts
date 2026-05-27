const storageKeys = {
  accessToken: 'traffic-card.access-token',
  refreshToken: 'traffic-card.refresh-token',
  recentCardIndex: 'traffic-card.recent-card-index',
} as const

export function getAccessToken() {
  return sessionStorage.getItem(storageKeys.accessToken)
}

export function isAuthenticated() {
  return Boolean(getAccessToken())
}

export function setTokens(accessToken: string, refreshToken: string) {
  sessionStorage.setItem(storageKeys.accessToken, accessToken)
  sessionStorage.setItem(storageKeys.refreshToken, refreshToken)
}

export function clearTokens() {
  sessionStorage.removeItem(storageKeys.accessToken)
  sessionStorage.removeItem(storageKeys.refreshToken)
}

export function getRecentCardIndex() {
  const value = localStorage.getItem(storageKeys.recentCardIndex)
  return value ? Number(value) : 0
}

export function setRecentCardIndex(index: number) {
  localStorage.setItem(storageKeys.recentCardIndex, String(index))
}
