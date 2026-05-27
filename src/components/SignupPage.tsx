import { useState } from 'react'
import type { SignupRequest } from '../types/api'

const initialForm: SignupRequest = {
  username: '',
  password: '',
  homeRegion: {
    alias: 'Home',
    address: '',
    regionName: '',
    latitude: 37.4518,
    longitude: 126.653,
  },
}

export function SignupPage({
  onBack,
  onSubmit,
  statusMessage,
}: {
  onBack: () => void
  onSubmit: (payload: SignupRequest) => void
  statusMessage: string
}) {
  const [form, setForm] = useState<SignupRequest>(initialForm)

  return (
    <article className="mock-screen">
      <span className="screen-label">회원가입 페이지</span>
      <div className="screen-frame form-frame">
        <h2>회원가입</h2>
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
              placeholder="traffic_user"
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
              placeholder="8자 이상 입력"
              value={form.password}
              onChange={(event) =>
                setForm((current) => ({ ...current, password: event.target.value }))
              }
            />
          </label>
          <label>
            <span>자택 별칭</span>
            <input
              type="text"
              placeholder="Home"
              value={form.homeRegion.alias}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  homeRegion: { ...current.homeRegion, alias: event.target.value },
                }))
              }
            />
          </label>
          <label>
            <span>자택 주소</span>
            <input
              type="text"
              placeholder="도로명 주소 입력"
              value={form.homeRegion.address}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  homeRegion: { ...current.homeRegion, address: event.target.value },
                }))
              }
            />
          </label>
          <label>
            <span>지역명</span>
            <input
              type="text"
              placeholder="예: 용현동"
              value={form.homeRegion.regionName}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  homeRegion: { ...current.homeRegion, regionName: event.target.value },
                }))
              }
            />
          </label>
          <label>
            <span>위도 / 경도</span>
            <div className="coordinate-grid">
              <input
                type="number"
                step="0.0001"
                value={form.homeRegion.latitude}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    homeRegion: {
                      ...current.homeRegion,
                      latitude: Number(event.target.value),
                    },
                  }))
                }
              />
              <input
                type="number"
                step="0.0001"
                value={form.homeRegion.longitude}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    homeRegion: {
                      ...current.homeRegion,
                      longitude: Number(event.target.value),
                    },
                  }))
                }
              />
            </div>
          </label>
          <p className="status-text">{statusMessage}</p>
          <div className="form-actions">
            <button type="button" className="ghost-button" onClick={onBack}>
              Back
            </button>
            <button type="submit">Sign Up</button>
          </div>
        </form>
      </div>
    </article>
  )
}
