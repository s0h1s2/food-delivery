import React from 'react'
import { Auth0Provider } from "@auth0/auth0-react"

interface Props {
  children: React.ReactNode
}

const AuthProviderWithNavigate = ({ children }: Props) => {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN
  const clientId = import.meta.env.VITE_AUTH0_CLIENTID
  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL
  if (!domain || !clientId || !redirectUri) {
    throw new Error("Unable to initiliaze AUTH0")

  }
  return (
    <Auth0Provider domain={domain} clientId={clientId} authorizationParams={{ redirect_uri: redirectUri }}>
      {children}
    </Auth0Provider>
  )
}

export default AuthProviderWithNavigate
