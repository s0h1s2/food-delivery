import { useCreateResturant, useGetMyResturant } from "@/api/ResturantApi"
import LoadingSpinner from "@/components/LoadingSpinner"
import ManageResturantForm from "@/forms/manage-resturant-form/ManageResturantForm"

const ManageResturantPage = () => {
  const { createResturant, isLoading } = useCreateResturant()
  const { isLoading: isResturantLoading, resturant } = useGetMyResturant()
  if (isResturantLoading) {
    return (
      <LoadingSpinner />
    )
  }
  return (
    <>
      <ManageResturantForm resturant={resturant} isLoading={isLoading} onSave={(data) => {
        createResturant(data)
      }} />
    </>
  )
}

export default ManageResturantPage
