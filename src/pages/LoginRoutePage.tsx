import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppState } from '../app/AppStateContext'
import { LoginPage } from '../components/LoginPage'
import type { LoginRequest } from '../types/api'

export function LoginRoutePage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, statusMessage } = useAppState()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const destination =
    typeof location.state === 'object' &&
    location.state !== null &&
    'from' in location.state &&
    typeof location.state.from === 'string'
      ? location.state.from
      : '/my-region'

  async function handleSubmit(payload: LoginRequest) {
    setIsSubmitting(true)
    try {
      await login(payload)
      navigate(destination, { replace: true })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <LoginPage
      onBack={() => navigate('/')}
      onSubmit={(payload) => void handleSubmit(payload)}
      statusMessage={isSubmitting ? '로그인 요청 중입니다...' : statusMessage}
    />
  )
}
