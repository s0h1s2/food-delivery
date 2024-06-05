import { ROUTES } from "@/constants"
import { Resturant } from "@/types/resturant"
import { Link } from "react-router-dom"

interface Props {
  resturant: Resturant
}
const SearchResultCard = ({ resturant }: Props) => {
  return (
    <Link to={`${ROUTES.DETAIL}/${resturant._id}`}>
      <div></div>
    </Link>
  )
}

export default SearchResultCard
