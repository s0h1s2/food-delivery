import { useGetResaurantDetail } from "@/api/ResturantApi"
import LoadingSpinner from "@/components/LoadingSpinner"
import { useParams } from "react-router-dom"

const DetailPage = () => {
  const { id } = useParams()
  const { isLoading,resturant  } = useGetResaurantDetail(id)
  if (isLoading) {
    return <LoadingSpinner />
  }
  if (!resturant) {
    return <h6>Restuarant is not found.</h6>
  }
  return (
    <div>{resturant._id}</div>
  )
}

export default DetailPage
