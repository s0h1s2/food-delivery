import { useAuth0 } from "@auth0/auth0-react"
import { useLocation } from "react-router-dom"
import { Button } from "./ui/button"
import LoadingButton from "./LoadingButton"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import { UserProfileForm } from "@/forms/user-profile-forms/UserProfileForm"
import { useGetMyUser } from "@/api/UserApi"
import { UserProfileFormData } from "@/forms/user-profile-forms/validation"
interface Props {
  onCheckout: (userData: UserProfileFormData) => void
  disabled: boolean
}
const CheckoutButton = ({ onCheckout, disabled }: Props) => {
  const { isAuthenticated, isLoading: isAuthLoading, loginWithRedirect } = useAuth0()
  const { currentUser, isLoading } = useGetMyUser()
  const { pathname } = useLocation()
  const onLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: pathname
      }
    })
  }
  if (!isAuthenticated) {
    return <Button onClick={onLogin} className="bg-orange-500 flex-1">Login to checkout</Button>
  }
  if (isAuthLoading || !currentUser) {
    return <LoadingButton />
  }
  return (

    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={disabled} className="bg-orange-500 flex-1">Go to checkout</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] md:min-w-[700px] bg-gray-50">
        <UserProfileForm currentUser={currentUser} onSave={onCheckout} isLoading={isLoading} />
      </DialogContent>
    </Dialog>
  )
}

export default CheckoutButton
