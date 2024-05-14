import { Navigate, Route, Routes } from 'react-router-dom'
import { ROUTES } from './constants'
import Layout from './layouts/Layout'

export const AppRoutes = () => {
  return (
    <Routes>

      <Route path={ROUTES.HOME} element={<Layout>Home</Layout>} />
      <Route path={ROUTES.USER_PROFILE} element={<span>User Profile</span>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}
