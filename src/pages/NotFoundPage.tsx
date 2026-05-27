import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <article className="mock-screen">
      <span className="screen-label">페이지를 찾을 수 없습니다</span>
      <div className="screen-frame form-frame">
        <h2>404</h2>
        <p className="status-text">요청한 페이지가 없어서 메인으로 이동할 수 있게 준비해뒀습니다.</p>
        <div className="form-actions">
          <Link to="/" className="nav-link active">
            Go Main
          </Link>
        </div>
      </div>
    </article>
  )
}
