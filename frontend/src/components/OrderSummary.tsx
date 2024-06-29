import { MenuItem, Resturant } from "@/types/resturant"
import { CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Separator } from "./ui/separator"
import { Trash } from "lucide-react"
import CheckoutButton from "./CheckoutButton"

interface Props {
  cartItems: MenuItem[]
  restaurant: Resturant
  removeFromCart: (item: MenuItem) => void
}
const OrderSummary = ({ cartItems, restaurant, removeFromCart }: Props) => {
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
            <span className="flex items-center gap-2">
              <Trash className="cursor-pointer" color="red" size={20} onClick={() => removeFromCart(item)} />
              ${item.price * item.quantity}
            </span>
          </div>
        ))}
        <Separator />
        <div className="flex justify-between mt-2">
          <span>Delivery</span>
          <span>${restaurant.deliveryPrice}</span>
        </div>
        <Separator />
      </CardContent>
      <CardFooter>
        <CheckoutButton />
      </CardFooter>
    </>
  )
}

export default OrderSummary
