import { useNavigate } from 'react-router-dom'
import { useAppState } from '../../app/AppStateContext'
import { ROUTES } from '../../constants/routes'
import styles from './AppHeader.module.css'
import logoUrl from '../../assets/logo.png'

type Props = {
  activeTab?: 'home' | 'region' | 'route' | null
}

export default function AppHeader({ activeTab = null }: Props) {
  const { isLoggedIn, username, logout } = useAppState()
  const navigate = useNavigate()

  return (
    <>
      <header className={styles.topBar}>
        <div className={styles.topBarInner}>
          <img
            className={styles.logo}
            src={logoUrl}
            alt="트래픽 카드 로고"
            onClick={() => navigate(ROUTES.MAIN)}
          />
          <div className={styles.authArea}>
            {isLoggedIn ? (
              <>
                <span className={styles.username}>{username}</span>
                <button
                  className={styles.authBtn}
                  onClick={() => { logout(); navigate(ROUTES.MAIN) }}
                >
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <button className={styles.authBtn} onClick={() => navigate(ROUTES.LOGIN)}>
                  로그인
                </button>
                <button className={styles.authBtn} onClick={() => navigate(ROUTES.SIGNUP)}>
                  회원가입
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <nav className={styles.navTabs}>
        <div className={styles.navInner}>
          <button
            className={`${styles.tab} ${activeTab === 'home' ? styles.tabActive : ''}`}
            onClick={() => navigate(ROUTES.MAIN)}
          >
            홈
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'region' ? styles.tabActive : ''}`}
            onClick={() => navigate(isLoggedIn ? ROUTES.REGION : ROUTES.LOGIN)}
          >
            관심지역
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'route' ? styles.tabActive : ''}`}
            onClick={() => navigate(isLoggedIn ? ROUTES.ROUTE : ROUTES.LOGIN)}
          >
            길찾기
          </button>
        </div>
      </nav>
    </>
  )
}
