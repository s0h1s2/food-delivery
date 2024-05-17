import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './AppRoutes.tsx'
import { QueryClient, QueryClientProvider } from "react-query"
import "./global.css"
import AuthProviderWithNavigate from './auth/AuthProviderWithNavigate.tsx'
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProviderWithNavigate>
          <AppRoutes />
        </AuthProviderWithNavigate>
      </QueryClientProvider >
    </BrowserRouter>
  </React.StrictMode >,
)
