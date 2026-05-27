import { type FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppState } from '../AppStateContext'
import Button from '../../components/common/Button'
import KakaoMapPicker, { type PickedLocation } from '../../components/KakaoMapPicker'
import { signup, loginApi } from '../../lib/api'
import { ROUTES } from '../../constants/routes'
import styles from './signup.module.css'

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
      navigate(ROUTES.REGION)
    } catch (err) {
      setError(err instanceof Error ? err.message : '회원가입에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <h2 className={styles.title}>회원 가입</h2>

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
          <div className={styles.field}>
            <label className={styles.label}>패스워드 재확인</label>
            <input
              className={styles.input}
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>거주지</label>
            <div className={styles.addressRow}>
              <input
                className={styles.input}
                type="text"
                placeholder="지도에서 위치를 선택하세요"
                value={homeLocation?.address ?? ''}
                readOnly
              />
              <Button type="button" onClick={() => setShowPicker(true)}>지도</Button>
            </div>
          </div>
          <div className={styles.field}>
            <label className={styles.label}>거주지 별칭</label>
            <input
              className={styles.input}
              type="text"
              placeholder="예: Home"
              value={alias}
              onChange={e => setAlias(e.target.value)}
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.actions}>
            <Button type="button" onClick={() => navigate(ROUTES.MAIN)}>Back</Button>
            <Button type="submit" variant="solid" disabled={loading}>
              {loading ? '처리 중...' : 'Sign Up'}
            </Button>
          </div>
        </form>
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
