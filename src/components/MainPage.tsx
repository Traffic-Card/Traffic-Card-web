import { trafficCards } from '../mock/data'
import type { TrafficCard } from '../types/api'

export function MainPage({
  card,
  activeIndex,
  onSelectCard,
  onGoLogin,
  onGoSignup,
  onGoRegion,
}: {
  card: TrafficCard
  activeIndex: number
  onSelectCard: (index: number) => void
  onGoLogin: () => void
  onGoSignup: () => void
  onGoRegion: () => void
}) {
  return (
    <article className="mock-screen">
      <div className="screen-header">
        <span className="screen-label">메인 페이지</span>
        <div className="actions">
          <button type="button" onClick={onGoLogin}>
            Log in
          </button>
          <button type="button" onClick={onGoSignup}>
            Sign up
          </button>
        </div>
      </div>

      <div className="screen-frame">
        <div className="screen-title-row">
          <h2>Traffic Slider</h2>
          <button type="button" className="ghost-button" onClick={onGoRegion}>
            My Region
          </button>
        </div>

        <div className="hero-copy">
          <p>자주 방문하는 지역을 등록하고</p>
          <p>간편하게 교통 정보를 확인하세요.</p>
        </div>

        <div className="traffic-highlight">
          <div className={`traffic-card traffic-${card.congestion}`}>
            <span className="badge">{card.label}</span>
            <strong>{card.district}</strong>
            <p>예상 이동 시간 {card.eta}</p>
          </div>
          <div className="traffic-metrics">
            <p>현재 혼잡도</p>
            <strong>
              {card.congestion === 'smooth' && '원활'}
              {card.congestion === 'normal' && '보통'}
              {card.congestion === 'busy' && '혼잡'}
            </strong>
            <span>TMAP 교통 API 응답을 카드 형태로 노출</span>
          </div>
        </div>

        <div className="card-strip">
          {trafficCards.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={activeIndex === index ? 'mini-card active' : 'mini-card'}
              onClick={() => onSelectCard(index)}
            >
              <span>{item.label}</span>
              <strong>{item.district}</strong>
            </button>
          ))}
        </div>

        <div className="dots" aria-label="slider index">
          {trafficCards.map((item, index) => (
            <span key={item.id} className={index === activeIndex ? 'dot active' : 'dot'} />
          ))}
        </div>
      </div>
    </article>
  )
}
