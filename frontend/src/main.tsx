import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './AppRoutes.tsx'
import "./global.css"
import AuthProviderWithNavigate from './auth/AuthProviderWithNavigate.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProviderWithNavigate>
        <AppRoutes />
      </AuthProviderWithNavigate>
    </BrowserRouter>
  </React.StrictMode >,
)
