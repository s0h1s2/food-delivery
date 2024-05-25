import { Navigate, Route, Routes } from 'react-router-dom'
import { ROUTES } from './constants'
import Layout from './layouts/Layout'
import HomePage from './pages/HomePage'
import AuthCallbackPage from "./pages/AuthCallbackPage"
import UserProfilePage from './pages/UserProfilePage'
import { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { addAccessTokenInterceptor } from './lib/client'
import ManageResturantPage from './pages/ManageResturantPage'
export const AppRoutes = () => {
  const { getAccessTokenSilently } = useAuth0()
  useEffect(() => {
    console.log("HERE?")
    addAccessTokenInterceptor(getAccessTokenSilently)
  }, [getAccessTokenSilently])
  return (
    <Routes>

      <Route path={ROUTES.HOME} element={<Layout> <HomePage /> </Layout>} />
      <Route path={ROUTES.AUTH_CALLBACK} element={<AuthCallbackPage />} />
      <Route path={ROUTES.USER_PROFILE} element={<Layout showHero={false}><UserProfilePage /></Layout>} />
      <Route path={ROUTES.MANAGE_USER_RESTURANT} element={<Layout><ManageResturantPage /></Layout>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}
