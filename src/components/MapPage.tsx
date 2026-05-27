import type { FavoriteRegionRequest } from '../types/api'

export function MapPage({
  activeIndex,
  onMove,
  places,
  onEdit,
}: {
  activeIndex: number
  onMove: (index: number) => void
  places: FavoriteRegionRequest[]
  onEdit: () => void
}) {
  const safeIndex = places.length === 0 ? 0 : Math.max(0, Math.min(activeIndex, places.length - 1))
  const place = places[safeIndex]

  if (!place) {
    return (
      <article className="mock-screen">
        <div className="screen-header">
          <span className="screen-label">My Region 조회 페이지</span>
          <button type="button" className="ghost-button" onClick={onEdit}>
            Edit Region
          </button>
        </div>
        <div className="screen-frame form-frame">
          <h2>My Region</h2>
          <p className="status-text">등록된 지역이 아직 없습니다. 수정 페이지에서 첫 지역을 추가하세요.</p>
        </div>
      </article>
    )
  }

  return (
    <article className="mock-screen">
      <div className="screen-header">
        <span className="screen-label">My Region 조회 페이지</span>
        <button type="button" className="ghost-button" onClick={onEdit}>
          Edit Region
        </button>
      </div>

      <div className="screen-frame">
        <h2>My Region</h2>
        <div className="map-stage">
          <button
            type="button"
            className="arrow-button"
            onClick={() => onMove(safeIndex === 0 ? places.length - 1 : safeIndex - 1)}
          >
            ←
          </button>
          <div className="map-placeholder">
            <span>{place.alias}</span>
            <strong>{place.regionName}</strong>
            <p>{place.address}</p>
          </div>
          <button
            type="button"
            className="arrow-button"
            onClick={() => onMove(safeIndex === places.length - 1 ? 0 : safeIndex + 1)}
          >
            →
          </button>
        </div>

        <div className="place-summary">
          <strong>{place.regionName}</strong>
          <p>
            좌표 {place.latitude.toFixed(4)}, {place.longitude.toFixed(4)}
          </p>
        </div>

        <div className="dots" aria-label="saved places">
          {places.map((item, index) => (
            <span
              key={`${item.alias}-${item.address}`}
              className={index === safeIndex ? 'dot active' : 'dot'}
            />
          ))}
        </div>
      </div>
    </article>
  )
}
