import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppStateProvider } from './app/AppStateContext'
import MainPage from './app/main/page'
import LoginPage from './app/login/page'
import SignupPage from './app/signup/page'
import RegionPage from './app/region/page'
import RegionEditPage from './app/region/edit/page'
import NotFoundPage from './app/not-found/page'
import { ROUTES } from './constants/routes'

export default function App() {
  return (
    <AppStateProvider>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.MAIN}        element={<MainPage />} />
          <Route path={ROUTES.LOGIN}       element={<LoginPage />} />
          <Route path={ROUTES.SIGNUP}      element={<SignupPage />} />
          <Route path={ROUTES.REGION}      element={<RegionPage />} />
          <Route path={ROUTES.REGION_EDIT} element={<RegionEditPage />} />
          <Route path="*"                  element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AppStateProvider>
  )
}
