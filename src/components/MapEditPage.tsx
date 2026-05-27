import type { FavoriteRegionRequest } from '../types/api'

export function MapEditPage({
  places,
  onBack,
  onSync,
  statusMessage,
}: {
  places: FavoriteRegionRequest[]
  onBack: () => void
  onSync: () => void
  statusMessage: string
}) {
  return (
    <article className="mock-screen">
      <span className="screen-label">My Region 수정 페이지</span>
      <div className="screen-frame">
        <h2>My Region Edit</h2>
        <div className="edit-list">
          {places.map((place) => (
            <div key={`${place.alias}-${place.address}`} className="edit-row">
              <input type="text" value={place.alias} readOnly />
              <input type="text" value={place.address} readOnly />
              <button type="button" className="icon-button">
                -
              </button>
            </div>
          ))}
          <div className="edit-row">
            <input type="text" value="+" readOnly />
            <input type="text" value="새 위치를 추가하세요" readOnly />
            <button type="button" className="icon-button">
              +
            </button>
          </div>
        </div>

        <div className="edit-note">
          현재 백엔드는 즐겨찾기 지역을 개별 저장하는 대신 전체 목록을 한 번에 sync 합니다.
          따라서 프론트에서도 편집 상태를 모아 PUT 요청으로 전송하면 됩니다.
        </div>

        <p className="status-text">{statusMessage}</p>
        <div className="form-actions">
          <button type="button" className="ghost-button" onClick={onBack}>
            Back
          </button>
          <button type="button" onClick={onSync}>
            Sync Regions
          </button>
        </div>
      </div>
    </article>
  )
}
