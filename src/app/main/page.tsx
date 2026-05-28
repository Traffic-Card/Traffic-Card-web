import AppHeader from '../../components/common/AppHeader'
import CardSlider from '../../components/main/CardSlider'
import KoreaWeatherSection from '../../components/main/KoreaWeatherSection'
import { FIXED_LOCATIONS } from '../../constants/locations'
import styles from './main.module.css'

export default function MainPage() {
  return (
    <div className={styles.page}>
      <AppHeader activeTab="home" />

      <main className={styles.sliderArea}>
        <div className={styles.sliderInner}>
          <span className={styles.sliderLabel}>교통정보</span>
          <CardSlider locations={FIXED_LOCATIONS} />

          <span className={`${styles.sliderLabel} ${styles.sliderLabelSection}`}>기상정보</span>
          <KoreaWeatherSection />
        </div>
      </main>
    </div>
  )
}
