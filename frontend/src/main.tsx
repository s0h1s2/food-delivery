import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './AppRoutes.tsx'
import { QueryClient, QueryClientProvider } from "react-query"
import { ToastContainer } from "react-toastify"
import AuthProviderWithNavigate from './auth/AuthProviderWithNavigate.tsx'
// CSS
import "./global.css"
import 'react-toastify/dist/ReactToastify.css';
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
          <ToastContainer />
        </AuthProviderWithNavigate>
      </QueryClientProvider >
    </BrowserRouter>
  </React.StrictMode >,
)
