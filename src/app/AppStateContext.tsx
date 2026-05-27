import {
  useCallback,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { favoriteRegionApi, memberApi } from '../lib/api'
import { getRecentCardIndex, setRecentCardIndex, setTokens } from '../lib/storage'
import { defaultFavoriteRegions, trafficCards } from '../mock/data'
import type { FavoriteRegionRequest, LoginRequest, SignupRequest } from '../types/api'

type AppStateContextValue = {
  activeCard: number
  favoriteRegions: FavoriteRegionRequest[]
  statusMessage: string
  setActiveCard: (index: number) => void
  login: (payload: LoginRequest) => Promise<void>
  signup: (payload: SignupRequest) => Promise<void>
  loadRegions: () => Promise<void>
  syncRegions: () => Promise<void>
}

const AppStateContext = createContext<AppStateContextValue | null>(null)

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [activeCard, setActiveCardState] = useState(() => {
    const savedIndex = getRecentCardIndex()
    return !Number.isNaN(savedIndex) && savedIndex >= 0 && savedIndex < trafficCards.length
      ? savedIndex
      : 0
  })
  const [favoriteRegions, setFavoriteRegions] =
    useState<FavoriteRegionRequest[]>(defaultFavoriteRegions)
  const [statusMessage, setStatusMessage] = useState(
    '백엔드 연동 전에는 목업 데이터로 흐름을 검증하고 있습니다.',
  )

  useEffect(() => {
    setRecentCardIndex(activeCard)
  }, [activeCard])

  const setActiveCard = useCallback((index: number) => {
    setActiveCardState(index)
  }, [])

  const login = useCallback(async (payload: LoginRequest) => {
    try {
      const response = await memberApi.login(payload)
      setTokens(response.accessToken, response.refreshToken)
      setStatusMessage(
        `로그인 성공: ${response.grantType} 토큰을 sessionStorage에 저장했습니다.`,
      )
    } catch (error) {
      setStatusMessage(`로그인 실패: ${toErrorMessage(error)}`)
      throw error
    }
  }, [])

  const signup = useCallback(async (payload: SignupRequest) => {
    try {
      const response = await memberApi.signup(payload)
      setStatusMessage(
        `회원가입 성공: memberId ${response.memberId}, username ${response.username}`,
      )
    } catch (error) {
      setStatusMessage(`회원가입 실패: ${toErrorMessage(error)}`)
      throw error
    }
  }, [])

  const loadRegions = useCallback(async () => {
    try {
      const response = await favoriteRegionApi.findAll()
      if (response.length > 0) {
        setFavoriteRegions(response)
      }
      setStatusMessage(`서버에서 즐겨찾기 지역 ${response.length}개를 불러왔습니다.`)
    } catch (error) {
      setStatusMessage(`지역 조회 실패: ${toErrorMessage(error)}`)
      throw error
    }
  }, [])

  const syncRegions = useCallback(async () => {
    try {
      const response = await favoriteRegionApi.sync({ regions: favoriteRegions })
      setFavoriteRegions(response)
      setStatusMessage(`즐겨찾기 지역 ${response.length}개를 서버와 동기화했습니다.`)
    } catch (error) {
      setStatusMessage(`지역 동기화 실패: ${toErrorMessage(error)}`)
      throw error
    }
  }, [favoriteRegions])

  const value = useMemo<AppStateContextValue>(
    () => ({
      activeCard,
      favoriteRegions,
      statusMessage,
      setActiveCard,
      login,
      signup,
      loadRegions,
      syncRegions,
    }),
    [activeCard, favoriteRegions, statusMessage, setActiveCard, login, signup, loadRegions, syncRegions],
  )

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
}

export function useAppState() {
  const context = useContext(AppStateContext)

  if (!context) {
    throw new Error('useAppState must be used within AppStateProvider')
  }

  return context
}

function toErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message
  }

  return '알 수 없는 오류가 발생했습니다.'
}
