import { type FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppState } from '../../context/AppStateContext'
import AppHeader from '../../components/common/AppHeader'
import KakaoMapPicker, { type PickedLocation } from '../../components/map/KakaoMapPicker'
import { signup, login as loginApi } from '../../lib/api'
import { ROUTES } from '../../constants/routes'
import styles from './signup.module.css'

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

function IconMapPin() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function IconTag() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  )
}

export default function SignupPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [alias, setAlias] = useState('')
  const [homeLocation, setHomeLocation] = useState<PickedLocation | null>(null)
  const [showPicker, setShowPicker] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAppState()
  const navigate = useNavigate()

  function handlePickerSelect(loc: PickedLocation) {
    setHomeLocation(loc)
    setShowPicker(false)
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!username.trim() || !password.trim() || !homeLocation || !alias.trim()) {
      setError('모든 항목을 입력하세요.')
      return
    }
    if (password !== confirmPassword) {
      setError('패스워드가 일치하지 않습니다.')
      return
    }
    setLoading(true)
    setError('')
    try {
      await signup({
        username,
        password,
        homeRegion: {
          alias,
          address: homeLocation.address,
          regionName: homeLocation.regionName,
          latitude: homeLocation.latitude,
          longitude: homeLocation.longitude,
        },
      })
      await loginApi({ username, password })
      login(username)
      navigate(ROUTES.MAIN)
    } catch (err) {
      setError(err instanceof Error ? err.message : '회원가입에 실패했습니다.')
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
            <h2 className={styles.title}>회원 가입</h2>

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

              <div className={styles.inputField}>
                <input
                  className={styles.input}
                  type="password"
                  placeholder="패스워드 확인"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                />
                <span className={styles.icon}><IconLock /></span>
              </div>

              {/* 주소: 아이콘 클릭 or 필드 클릭 → 지도 열기 */}
              <div
                className={`${styles.inputField} ${styles.clickable}`}
                onClick={() => setShowPicker(true)}
              >
                <input
                  className={styles.input}
                  type="text"
                  placeholder="거주지 주소 (클릭하여 지도에서 선택)"
                  value={homeLocation?.address ?? ''}
                  readOnly
                />
                <span className={`${styles.icon} ${styles.iconActive}`}><IconMapPin /></span>
              </div>

              <div className={styles.inputField}>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="거주지 별칭  (예: 우리집)"
                  value={alias}
                  onChange={e => setAlias(e.target.value)}
                />
                <span className={styles.icon}><IconTag /></span>
              </div>
            </div>

            {error && <p className={styles.error}>{error}</p>}

            <button className={styles.submitBtn} type="submit" disabled={loading}>
              {loading ? '처리 중...' : '회원가입 →'}
            </button>

            <p className={styles.switchLink}>
              이미 계정이 있으신가요?{' '}
              <span onClick={() => navigate(ROUTES.LOGIN)}>로그인</span>
            </p>
          </form>
        </div>
      </div>

      {showPicker && (
        <KakaoMapPicker
          onSelect={handlePickerSelect}
          onClose={() => setShowPicker(false)}
        />
      )}
    </div>
  )
}
