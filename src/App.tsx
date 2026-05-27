import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { AppLayout } from './app/AppLayout'
import { AppStateProvider } from './app/AppStateContext'
import { ProtectedRoute } from './app/ProtectedRoute'
import { LoginRoutePage } from './pages/LoginRoutePage'
import { MainRoutePage } from './pages/MainRoutePage'
import { MyRegionEditPage } from './pages/MyRegionEditPage'
import { MyRegionPage } from './pages/MyRegionPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { SignupRoutePage } from './pages/SignupRoutePage'

function App() {
  return (
    <BrowserRouter>
      <AppStateProvider>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<MainRoutePage />} />
            <Route path="/login" element={<LoginRoutePage />} />
            <Route path="/signup" element={<SignupRoutePage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/my-region" element={<MyRegionPage />} />
              <Route path="/my-region/edit" element={<MyRegionEditPage />} />
            </Route>
            <Route path="/my-map" element={<Navigate to="/my-region" replace />} />
            <Route path="/my-map/edit" element={<Navigate to="/my-region/edit" replace />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </AppStateProvider>
    </BrowserRouter>
  )
}

export default App
