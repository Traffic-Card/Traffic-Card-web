import { useState } from 'react'
import type { LoginRequest } from '../types/api'

export function LoginPage({
  onBack,
  onSubmit,
  statusMessage,
}: {
  onBack: () => void
  onSubmit: (payload: LoginRequest) => void
  statusMessage: string
}) {
  const [form, setForm] = useState<LoginRequest>({
    username: '',
    password: '',
  })

  return (
    <article className="mock-screen">
      <span className="screen-label">로그인 페이지</span>
      <div className="screen-frame form-frame">
        <h2>로그인</h2>
        <form
          className="auth-form"
          onSubmit={(event) => {
            event.preventDefault()
            onSubmit(form)
          }}
        >
          <label>
            <span>아이디</span>
            <input
              type="text"
              placeholder="demo_user"
              value={form.username}
              onChange={(event) =>
                setForm((current) => ({ ...current, username: event.target.value }))
              }
            />
          </label>
          <label>
            <span>비밀번호</span>
            <input
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(event) =>
                setForm((current) => ({ ...current, password: event.target.value }))
              }
            />
          </label>
          <p className="status-text">{statusMessage}</p>
          <div className="form-actions">
            <button type="button" className="ghost-button" onClick={onBack}>
              Back
            </button>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </article>
  )
}
