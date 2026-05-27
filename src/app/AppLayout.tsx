import { NavLink, Outlet } from 'react-router-dom'
import { deployPlan, storagePlan } from '../mock/data'

export function AppLayout() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Web Programming Project</p>
          <h1>Traffic Slider</h1>
          <p className="subtitle">
            Spring API DTO에 맞춘 프론트 구조와 발표용 MVP 화면 흐름을 실제 페이지 라우팅으로
            정리했습니다.
          </p>
        </div>
        <div className="status-card">
          <span className="status-dot" />
          <div>
            <strong>Route-Based Structure</strong>
            <p>메인, 로그인, 회원가입, My Region 조회/수정 페이지 분리 완료</p>
          </div>
        </div>
      </header>

      <nav className="view-nav" aria-label="page navigation">
        <NavLink to="/" end className={getNavClassName}>
          Main
        </NavLink>
        <NavLink to="/login" className={getNavClassName}>
          Login
        </NavLink>
        <NavLink to="/signup" className={getNavClassName}>
          Sign Up
        </NavLink>
        <NavLink to="/my-region" className={getNavClassName}>
          My Region
        </NavLink>
        <NavLink to="/my-region/edit" className={getNavClassName}>
          Edit Region
        </NavLink>
      </nav>

      <main className="dashboard">
        <section className="preview-panel">
          <Outlet />
        </section>

        <aside className="planning-panel">
          <section className="plan-card">
            <p className="plan-title">현재 반영한 페이지</p>
            <ul>
              <li>`/` 메인 페이지</li>
              <li>`/login` 로그인 페이지</li>
              <li>`/signup` 회원가입 페이지</li>
              <li>`/my-region` My Region 조회 페이지</li>
              <li>`/my-region/edit` My Region 수정 페이지</li>
            </ul>
          </section>

          <section className="plan-card">
            <p className="plan-title">Web Storage / DB 분리 전략</p>
            <ul>
              {storagePlan.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="plan-card">
            <p className="plan-title">배포 구조 초안</p>
            <ul>
              {deployPlan.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </aside>
      </main>
    </div>
  )
}

function getNavClassName({ isActive }: { isActive: boolean }) {
  return isActive ? 'nav-link active' : 'nav-link'
}
