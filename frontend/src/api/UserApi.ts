import { UserProfileFormData } from "@/forms/user-profile-forms/validation"
import client from "@/lib/client"
import { UserInfoResponse } from "@/types/user"
import { useMutation, useQuery } from "react-query"
import { toast } from "sonner"

type CreateUserRequest = {
  auth0Id: string
  email: string
}

export const useCreateUser = () => {
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
export const useGetMyUser = () => {
  const getUserInfoRequest = async (): Promise<UserInfoResponse> => {
    const response = await client.get("/users/me")
    return response.data.user
  }
  const { data: currentUser, isLoading, error } = useQuery<UserInfoResponse>("fetchCurrentUser", getUserInfoRequest)
  if (error) {
    toast.error(error.toString())
  }
  return { currentUser, isLoading, error }
}
export const useUpdateUser = () => {
  const updateUserRequest = (formData: UserProfileFormData) => {
    return client.put("/users", formData)
  }
  const { mutateAsync: updateUser, isLoading, isSuccess, isError, error, reset } = useMutation(updateUserRequest)
  return { updateUser, isLoading, isSuccess, isError, error, reset }
}
