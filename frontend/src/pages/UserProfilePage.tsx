import { useUpdateUser } from "@/api/UserApi"
import { UserProfileForm } from "@/forms/user-profile-forms/UserProfileForm"
import { UserProfileFormData } from "@/forms/user-profile-forms/validation"

const UserProfilePage = () => {
  const { updateUser, isLoading } = useUpdateUser()
  const handleUpdateUser = async (formData: UserProfileFormData) => {
    await updateUser(formData)
  }
  return (
    <div>
      <UserProfileForm onSave={handleUpdateUser} isLoading={isLoading} />
    </div>
  )
}

export default UserProfilePage
