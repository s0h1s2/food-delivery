import { useGetMyUser, useUpdateUser } from "@/api/UserApi"
import LoadingSpinner from "@/components/LoadingSpinner"
import { UserProfileForm } from "@/forms/user-profile-forms/UserProfileForm"
import { UserProfileFormData } from "@/forms/user-profile-forms/validation"

const UserProfilePage = () => {
  const { currentUser, isLoading: isUserLoading } = useGetMyUser()
  const { updateUser, isLoading } = useUpdateUser()
  const handleUpdateUser = async (formData: UserProfileFormData) => {
    await updateUser(formData)
  }
  if (isUserLoading) {
    return <LoadingSpinner />
  }
  return (
    <UserProfileForm currentUser={currentUser} onSave={handleUpdateUser} isLoading={isLoading} />
  )
}

export default UserProfilePage
