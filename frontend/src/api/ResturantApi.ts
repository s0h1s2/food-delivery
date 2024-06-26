import client from "@/lib/client"
import { Resturant } from "@/types/resturant"
import { SearchState } from "@/types/search"
import { useMutation, useQuery } from "react-query"
import { toast } from "react-toastify"
type searchResturantResponse = {
  data: Resturant[]
  currentPage: number
  totalPages: number
}
export const useSearchResturants = (search: SearchState, city?: string) => {
  const params = new URLSearchParams()
  params.set("searchQuery", search.searchQuery)
  params.set("page", search.page.toString())
  params.set("selectedCuisines", search.selectedCuisines.join(","))
  params.set("sortOption", search.sortOption)
  const createSearcRequest = async (): Promise<searchResturantResponse> => {
    const response = await client.get(`/resturants/search/${city}?${params.toString()}`)
    if (response.status != 200) {
      throw new Error("Unable to get resturants")
    }
    return response.data
  }
  const { data: results, isLoading } = useQuery(["searchResturants", search, city], createSearcRequest, {
    enabled: !!city,
    retry: false
  })
  return {
    results,
    isLoading
  }
}
export const useGetResaurantDetail = (id?: string) => {
  const getResaurantDetailRequest = async (): Promise<Resturant> => {
    try {
      const response = await client.get(`/resturants/${id}`)
      return response.data
    } catch (e) {
      throw new Error("Unable to get restuarant detail.")
    }
  }

  const { data: resturant, isLoading } = useQuery("getResturantDetail", getResaurantDetailRequest, {
    enabled: !!id
  })

  return {
    resturant,
    isLoading
  }
}
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
