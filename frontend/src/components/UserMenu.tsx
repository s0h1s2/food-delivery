import { CircleUserRound } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { useAuth0 } from "@auth0/auth0-react"
import { Link } from "react-router-dom"
import { ROUTES } from "@/constants"
import { Separator } from "./ui/separator"
import { Button } from "./ui/button"

const UserMenu = () => {
  const { user, logout } = useAuth0()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center px-3 font-bold hover:text-orange-500 gap-2">
        <CircleUserRound className="text-orange-500" />
        {user?.email}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link className="font-bold hover:text-orange-500" to={ROUTES.MANAGE_USER_RESTURANT}>
            Manage Resturant
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link className="font-bold hover:text-orange-500" to={ROUTES.USER_PROFILE}>
            User Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Link to="/">
          </Link>
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem>
          <Button onClick={() => logout()} className="flex flex-1 font-bold bg-orange-500">Logout</Button>
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserMenu
