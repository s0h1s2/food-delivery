import client from "@/lib/client"
import { useMutation } from "react-query"

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
