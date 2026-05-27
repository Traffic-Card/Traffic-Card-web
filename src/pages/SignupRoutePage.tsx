import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppState } from '../app/AppStateContext'
import { SignupPage } from '../components/SignupPage'
import type { SignupRequest } from '../types/api'

export function SignupRoutePage() {
  const navigate = useNavigate()
  const { signup, statusMessage } = useAppState()
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(payload: SignupRequest) {
    setIsSubmitting(true)
    try {
      await signup(payload)
      navigate('/login')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <SignupPage
      onBack={() => navigate('/')}
      onSubmit={(payload) => void handleSubmit(payload)}
      statusMessage={isSubmitting ? '회원가입 요청 중입니다...' : statusMessage}
    />
  )
}
