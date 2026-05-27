import { useNavigate } from 'react-router-dom'
import { MainPage } from '../components/MainPage'
import { trafficCards } from '../mock/data'
import { useAppState } from '../app/AppStateContext'

export function MainRoutePage() {
  const navigate = useNavigate()
  const { activeCard, setActiveCard } = useAppState()

  return (
    <MainPage
      card={trafficCards[activeCard]}
      activeIndex={activeCard}
      onSelectCard={setActiveCard}
      onGoLogin={() => navigate('/login')}
      onGoSignup={() => navigate('/signup')}
      onGoRegion={() => navigate('/my-region')}
    />
  )
}
