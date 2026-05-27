import { useNavigate } from 'react-router-dom'
import { useAppState } from '../AppStateContext'
import Button from '../../components/common/Button'
import CardSlider from '../../components/main/CardSlider'
import { FIXED_LOCATIONS } from '../../constants/locations'
import { ROUTES } from '../../constants/routes'
import styles from './main.module.css'

export default function MainPage() {
  const { isLoggedIn, username } = useAppState()
  const navigate = useNavigate()

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerSpacer} />
        <h1 className={styles.title}>Traffic Card</h1>
        <div className={styles.nav}>
          {isLoggedIn ? (
            <p>{username}</p>
          ) : (
            <>
              <Button onClick={() => navigate(ROUTES.LOGIN)}>Login</Button>
              <Button onClick={() => navigate(ROUTES.SIGNUP)}>Sign Up</Button>
            </>
          )}
        </div>
      </div>

      <div className={styles.hero}>
        <div className={styles.heroText}>
          <p>자주 방문하는 지역을 등록하고</p>
          <p>간편하게 교통 정보를 확인하세요!</p>
        </div>
        <Button onClick={() => navigate(isLoggedIn ? ROUTES.REGION : ROUTES.LOGIN)}>
          My MAP
        </Button>
      </div>

      <CardSlider locations={FIXED_LOCATIONS} />
    </div>
  )
}
