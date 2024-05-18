import { Navigate, Route, Routes } from 'react-router-dom'
import { ROUTES } from './constants'
import Layout from './layouts/Layout'
import HomePage from './pages/HomePage'
import AuthCallbackPage from "./pages/AuthCallbackPage"
import UserProfilePage from './pages/UserProfilePage'
export const AppRoutes = () => {
  return (
    <Routes>

      <Route path={ROUTES.HOME} element={<Layout> <HomePage /> </Layout>} />
      <Route path={ROUTES.AUTH_CALLBACK} element={<AuthCallbackPage />} />
      <Route path={ROUTES.USER_PROFILE} element={<UserProfilePage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}
