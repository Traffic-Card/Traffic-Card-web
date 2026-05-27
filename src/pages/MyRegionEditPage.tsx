import { useNavigate } from 'react-router-dom'
import { useAppState } from '../app/AppStateContext'
import { MapEditPage } from '../components/MapEditPage'

export function MyRegionEditPage() {
  const navigate = useNavigate()
  const { favoriteRegions, statusMessage, syncRegions } = useAppState()

  return (
    <MapEditPage
      places={favoriteRegions}
      onBack={() => navigate('/my-region')}
      onSync={() => void syncRegions()}
      statusMessage={statusMessage}
    />
  )
}
