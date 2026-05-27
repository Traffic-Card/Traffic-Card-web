import { type FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppState } from '../AppStateContext'
import Button from '../../components/common/Button'
import { loginApi } from '../../lib/api'
import { ROUTES } from '../../constants/routes'
import styles from './login.module.css'

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
      navigate(ROUTES.REGION)
    } catch (err) {
      setError(err instanceof Error ? err.message : '로그인에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <h2 className={styles.title}>로그인</h2>

      <div className={styles.formArea}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label className={styles.label}>아이디</label>
            <input
              className={styles.input}
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>패스워드</label>
            <input
              className={styles.input}
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.actions}>
            <Button type="button" onClick={() => navigate(ROUTES.MAIN)}>Back</Button>
            <Button type="submit" variant="solid" disabled={loading}>
              {loading ? '로그인 중...' : 'Login'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
