import { Resturant } from '@/types/resturant'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Dot } from 'lucide-react'
interface Props {
  restaurant: Resturant
}
const RestaurantInfo = ({ restaurant }: Props) => {
  return (
    <Card className="border-sla">
      <CardHeader>
        <CardTitle className="text-3xl font-bold tracking-tight">
          {restaurant.resturantName}
        </CardTitle>
        <CardDescription>
          {restaurant.city}, {restaurant.country}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex">
        {restaurant.cuisines.map((cuisine, index) => (
          <span className="flex">
            <span>{cuisine}</span>
            {index < restaurant.cuisines.length - 1 && <Dot />}
          </span>
        ))}
      </CardContent>
    </Card>
  )
}

export default RestaurantInfo
