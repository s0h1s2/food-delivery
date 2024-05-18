import { useCreateUser } from "@/api/UserApi"
import { ROUTES } from "@/constants"
import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"

const AuthCallbackPage = () => {
  const navigate = useNavigate()
  const hasUserCreated = useRef(false)
  const { user } = useAuth0()
  const { createUser } = useCreateUser()
  useEffect(() => {
    if (user?.sub && user.email && !hasUserCreated.current) {
      createUser({ auth0Id: user.sub, email: user.email })
      hasUserCreated.current = true
    }
    navigate(ROUTES.HOME)
  }, [hasUserCreated, navigate, user])

  return (
    <div>Loading...</div>
  )
}

export default AuthCallbackPage
