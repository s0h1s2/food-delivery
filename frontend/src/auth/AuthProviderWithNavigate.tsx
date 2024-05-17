import React from 'react'
import { AppState, Auth0Provider, User } from "@auth0/auth0-react"
import { useCreateUser } from '@/api/UserApi'

interface Props {
  children: React.ReactNode
}

const AuthProviderWithNavigate = ({ children }: Props) => {
  const { createUser, isSuccess } = useCreateUser()
  const domain = import.meta.env.VITE_AUTH0_DOMAIN
  const clientId = import.meta.env.VITE_AUTH0_CLIENTID
  const redirectUri = window.location.origin
  if (!domain || !clientId || !redirectUri) {
    throw new Error("Unable to initiliaze AUTH0")

  }
  function onRedirectCallback(appState?: AppState | undefined, user?: User | undefined): void {
    if (user?.sub && user.email) {
      createUser({ auth0Id: user.sub, email: user.email })
      console.log(isSuccess)
    }
  }

  return (
    <Auth0Provider domain={domain} clientId={clientId} authorizationParams={{ redirect_uri: redirectUri }} onRedirectCallback={onRedirectCallback}>
      {children}
    </Auth0Provider>
  )
}

export default AuthProviderWithNavigate
