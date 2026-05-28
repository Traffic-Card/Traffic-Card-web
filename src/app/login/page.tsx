import { type FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppState } from '../../context/AppStateContext'
import AppHeader from '../../components/common/AppHeader'
import { login as loginApi } from '../../lib/api'
import { ROUTES } from '../../constants/routes'
import styles from './login.module.css'

function IconPerson() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

function IconLock() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAppState()
  const navigate = useNavigate()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!username.trim() || !password.trim()) {
      setError('아이디와 패스워드를 입력하세요.')
      return
    }
    setLoading(true)
    setError('')
    try {
      await loginApi({ username, password })
      login(username)
      navigate(ROUTES.MAIN)
    } catch (err) {
      setError(err instanceof Error ? err.message : '로그인에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <AppHeader />

      <div className={styles.contentArea}>
        <div className={styles.contentInner}>
          <form className={styles.formCard} onSubmit={handleSubmit}>
            <h2 className={styles.title}>로그인</h2>

            <div className={styles.fields}>
              <div className={styles.inputField}>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="아이디"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
                <span className={styles.icon}><IconPerson /></span>
              </div>

              <div className={styles.inputField}>
                <input
                  className={styles.input}
                  type="password"
                  placeholder="패스워드"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <span className={styles.icon}><IconLock /></span>
              </div>
            </div>

            {error && <p className={styles.error}>{error}</p>}

            <button className={styles.submitBtn} type="submit" disabled={loading}>
              {loading ? '로그인 중...' : '로그인 →'}
            </button>

            <p className={styles.switchLink}>
              계정이 없으신가요?{' '}
              <span onClick={() => navigate(ROUTES.SIGNUP)}>회원가입</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
