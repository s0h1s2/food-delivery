import { useCreateResturant, useGetMyResturant, useUpdateResturant } from "@/api/ResturantApi"
import LoadingSpinner from "@/components/LoadingSpinner"
import ManageResturantForm from "@/forms/manage-resturant-form/ManageResturantForm"

const ManageResturantPage = () => {
  const { createResturant, isLoading } = useCreateResturant()
  const { isLoading: isResturantLoading, resturant } = useGetMyResturant()
  const { updateResturant, isLoading: isUpdateLoading } = useUpdateResturant()
  return (
    <>
      {isResturantLoading ? (<LoadingSpinner />) : (
        <ManageResturantForm resturant={resturant} isLoading={isLoading || isUpdateLoading} onSave={(data) => {
          if (resturant) {
            updateResturant(data)
            return
          }
          createResturant(data)
        }} />
      )}
    </>
  )
}

export default ManageResturantPage
