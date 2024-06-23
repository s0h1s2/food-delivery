import { Link } from "react-router-dom"

interface Props {
  total: number
  city: string
}
const SearchResultInfo = ({ total, city }: Props) => {
  return (
    <div className="text-xl font-bold flex flex-col gap-3 justify-center lg:items-center lg:flex-row">
      <span>{total} Resturants found in {city}
        - <Link to="/" className="text-sm font-semibold underline cursor-pointer text-blue-500">Change Location</Link>
      </span>
    </div>
  )
}

export default SearchResultInfo
