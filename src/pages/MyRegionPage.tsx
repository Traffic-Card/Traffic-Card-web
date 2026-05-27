import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPage } from '../components/MapPage'
import { useAppState } from '../app/AppStateContext'

export function MyRegionPage() {
  const navigate = useNavigate()
  const { activeCard, favoriteRegions, loadRegions, setActiveCard } = useAppState()

  useEffect(() => {
    void loadRegions()
  }, [loadRegions])

  return (
    <MapPage
      activeIndex={Math.min(activeCard, favoriteRegions.length - 1)}
      onMove={setActiveCard}
      places={favoriteRegions}
      onEdit={() => navigate('/my-region/edit')}
    />
  )
}
