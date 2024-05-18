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
    const accessToken = await getAccessTokenSilently()
    return client.post("/users/", user, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  }
  const { mutateAsync: createUser, isLoading, isSuccess, isError } = useMutation(createUserRequest)
  return {
    createUser,
    isLoading,
    isSuccess,
    isError
  }
}
