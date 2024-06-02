import client from "@/lib/client"
import { Resturant } from "@/types/resturant"
import { useMutation, useQuery } from "react-query"
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
      console.log(e)
      throw new Error("Unable to create resturant.")
    }
  }
  const { mutate: createResturant, isLoading, isSuccess, error } = useMutation(createResturantRequest)
  if (isSuccess) {
    toast.success("Resturant created!")
  }
  if (error) {
    toast.error("Unable to create resturant.")
  }
  return {
    createResturant,
    isLoading,
  }
}
export const useGetMyResturant = () => {
  const getMyResturantRequest = async (): Promise<Resturant> => {
    try {
      const response = await client.get("/resturants")
      return response.data
    } catch (e) {
      throw new Error("restaurant was not found.")
    }
  }
  const { data: resturant, isLoading } = useQuery("fetchMyResturant", getMyResturantRequest)
  return { resturant, isLoading }
}
export const useUpdateResturant = () => {
  const updateResturantRequest = async (resturantData: FormData) => {
    return await client.put("/resturants", resturantData)
  }
  const { mutate: updateResturant, isSuccess, isLoading, error } = useMutation(updateResturantRequest)
  if (error) {
    toast.error("Update Resturant Failed.")
  }
  if (isSuccess) {
    toast.success("Resturant Updated")
  }
  return {
    updateResturant,
    isLoading
  }
}
