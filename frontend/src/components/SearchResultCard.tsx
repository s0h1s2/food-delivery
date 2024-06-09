import { ROUTES } from "@/constants"
import { Resturant } from "@/types/resturant"
import { AspectRatio } from "@radix-ui/react-aspect-ratio"
import { Banknote, Clock, Dot } from "lucide-react"
import { Link } from "react-router-dom"

interface Props {
  resturant: Resturant
}
const SearchResultCard = ({ resturant }: Props) => {
  return (
    <Link to={`${ROUTES.DETAIL}/${resturant._id}`} className="grid lg:grid-cols[2fr_3fr] gap-5 group">
      <AspectRatio ratio={16 / 6}>
        <img src={resturant.imageUrl} alt="Resturant Photo" className="rounded-md w-full h-full object-cover" />
      </AspectRatio>
      <div>
        <h3 className="text-2xl font-bold tracking-tight mb-2 group-hover:underline">
          {resturant.resturantName}
        </h3>
        <div id="card-content" className="grid md:grid-cols-2 gap-2">
          <div className="flex flex-row flex-wrap">
            {resturant.cuisines.map((item, index) => (
              <span className="flex">
                <span>{item}</span>
                {index < resturant.cuisines.length - 1 && <Dot />}
              </span>
            ))}
          </div>

          <div className="flex gap-2 flex-col">
            <div className="flex items-center gap-1 text-green-600">
              <Clock className="text-green-600" />
              {resturant.estimatedDeliveryTime} Mins
            </div>
            <div className="flex items-center gap-1">
              <Banknote />
              Delivery from ${(resturant.deliveryPrice / 100).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default SearchResultCard
