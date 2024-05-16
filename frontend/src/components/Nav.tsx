import { useAuth0 } from "@auth0/auth0-react"
import { Button } from "./ui/button"
import UserMenu from "./UserMenu"

const Nav = () => {
  // TODO: move button to single component
  const { loginWithRedirect, isAuthenticated } = useAuth0()
  return (
    <span className="flex space-x-2 items-center">
      {
        isAuthenticated ? (<UserMenu />) : (
          <Button onClick={async () => await loginWithRedirect()} variant="ghost" className="font-bold hover:text-orange-500 hover:bg-white">
            Login
          </Button>
        )
      }
    </span>
  )
}

export default Nav
