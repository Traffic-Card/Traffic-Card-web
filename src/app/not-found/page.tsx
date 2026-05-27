import { useNavigate } from 'react-router-dom'
import PageContainer from '../../components/common/PageContainer'
import Button from '../../components/common/Button'
import { ROUTES } from '../../constants/routes'
import styles from './not-found.module.css'

export default function NotFoundPage() {
  const navigate = useNavigate()
  return (
    <PageContainer className={styles.page}>
      <p className={styles.code}>404</p>
      <p className={styles.message}>페이지를 찾을 수 없습니다.</p>
      <Button onClick={() => navigate(ROUTES.MAIN)}>홈으로</Button>
    </PageContainer>
  )
}
