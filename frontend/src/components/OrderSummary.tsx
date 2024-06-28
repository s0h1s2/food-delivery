import { CartItem } from "@/types/cart"
import { Resturant } from "@/types/resturant"
import { CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Separator } from "./ui/separator"

interface Props {
  cartItems: CartItem[]
  restaurant: Resturant
}
const OrderSummary = ({ cartItems, restaurant }: Props) => {
  const getTotalCost = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0) + restaurant.deliveryPrice
  }

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tight flex justify-between">
          <span>Your Order</span>
          <span>${getTotalCost()}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {cartItems.map((item) => (
          <div className="flex justify-between">
            <span>
              <Badge variant="outline" className="mr-2">
                {item.quantity}
              </Badge>
              {item.name}
            </span>
            <span className="flex items-center gap-1">
              ${(item.price * item.quantity) / 100}
            </span>
          </div>
        ))}
        <Separator>
          <div className="flex justify-between">
            <span>Delivery</span>
            <span>${restaurant.deliveryPrice}</span>
          </div>
        </Separator>
      </CardContent>
    </>
  )
}

export default OrderSummary
