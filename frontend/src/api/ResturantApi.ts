import client from "@/lib/client"
import { useMutation } from "react-query"
import { toast } from "react-toastify"

export const useCreateResturant = () => {
  const createResturantRequest = async (data: FormData) => {
    try {
      const response = await client.post("/resturants", data, {
        headers: {
          'Content-Type': "multipart/form-data"
        }
      })
      return response
    } catch (e) {
      throw new Error("Unable to create resturant.")
    }
  }
  const { mutate: createResturant, isLoading, isSuccess, error } = useMutation(createResturantRequest)
  if (isSuccess) {
    toast.success("Resturant created!")
  }
  if (error) {
    toast.error("Unable to update resturant.")
  }
  return {
    createResturant,
    isLoading,
  }
}
