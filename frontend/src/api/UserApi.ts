import { UserProfileFormData } from "@/forms/user-profile-forms/validation"
import client from "@/lib/client"
import { useAuth0 } from "@auth0/auth0-react"
import { useMutation } from "react-query"

type CreateUserRequest = {
  auth0Id: string
  email: string
}
export const useCreateUser = () => {
  const { getAccessTokenSilently } = useAuth0()

  const createUserRequest = async (user: CreateUserRequest) => {
    return client.post("/users/", user)
  }
  const { mutateAsync: createUser, isLoading, isSuccess, isError } = useMutation(createUserRequest)
  return {
    createUser,
    isLoading,
    isSuccess,
    isError
  }
}
export const useUpdateUser = () => {
  const updateUserRequest = (formData: UserProfileFormData) => {
    return client.put("/users", formData)
  }
  const { mutateAsync: updateUser, isLoading, isSuccess, isError, error, reset } = useMutation(updateUserRequest)
  return { updateUser, isLoading, isSuccess, isError, error, reset }
}
