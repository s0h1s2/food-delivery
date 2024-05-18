import React from 'react'
import { Auth0Provider } from "@auth0/auth0-react"
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/constants'

interface Props {
  children: React.ReactNode
}

const AuthProviderWithNavigate = ({ children }: Props) => {
  const navigate = useNavigate()
  const domain = import.meta.env.VITE_AUTH0_DOMAIN
  const clientId = import.meta.env.VITE_AUTH0_CLIENTID
  const redirectUri = window.location.origin
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE
  if (!domain || !clientId || !redirectUri || !audience) {
    throw new Error("Unable to initiliaze AUTH0")

  }
  function onRedirectCallback(): void {
    navigate(ROUTES.AUTH_CALLBACK)
  }

  return (
    <Auth0Provider domain={domain} clientId={clientId} authorizationParams={{ redirect_uri: redirectUri, audience: audience }} onRedirectCallback={onRedirectCallback}>
      {children}
    </Auth0Provider>
  )
}

export default AuthProviderWithNavigate
