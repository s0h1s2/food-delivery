import { useCreateResturant } from "@/api/ResturantApi"
import ManageResturantForm from "@/forms/manage-resturant-form/ManageResturantForm"

const ManageResturantPage = () => {
  const { createResturant, isLoading } = useCreateResturant()
  return (
    <>
      <ManageResturantForm isLoading={isLoading} onSave={(data) => {
        console.log(...data)
        createResturant(data)
      }} />
    </>
  )
}

export default ManageResturantPage
