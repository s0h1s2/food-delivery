import { useGetResaurantDetail } from "@/api/ResturantApi"
import LoadingSpinner from "@/components/LoadingSpinner"
import MenuItem from "@/components/MenuItem"
import OrderSummary from "@/components/OrderSummary"
import RestaurantInfo from "@/components/RestaurantInfo"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Card } from "@/components/ui/card"
import { MenuItem as MenuItemType } from "@/types/resturant"
import { useState } from "react"
import { useParams } from "react-router-dom"
const DetailPage = () => {
  const { id } = useParams()
  const { isLoading, resturant } = useGetResaurantDetail(id)
  const [cartItems, setCartItems] = useState<MenuItemType[]>(() => {
    const storedCartItems = sessionStorage.getItem(`cartItems-${resturant?._id}`)
    return storedCartItems ? JSON.parse(storedCartItems) : []

  })
  const removeFromCart = (menuItem: MenuItemType) => {
    setCartItems((prevState) => (prevState.filter((cart) => cart._id !== menuItem._id)))
  }
  const addToCart = (menuItem: MenuItemType) => {
    setCartItems((prevState) => {
      const existingCartItem = prevState.find((item) => item._id == menuItem._id)
      let updatedCartItems;
      if (existingCartItem) {
        updatedCartItems = prevState.map((cart) => cart._id == existingCartItem._id ? {
          ...cart,
          quantity: cart.quantity + 1
        } : cart)
      } else {
        updatedCartItems = [...prevState, {
          price: menuItem.price,
          _id: menuItem._id,
          name: menuItem.name,
          quantity: 1
        }]
      }
      sessionStorage.setItem(`cartItems-${resturant?._id}`, JSON.stringify(updatedCartItems))

      return updatedCartItems
    })
  }
  if (isLoading) {
    return <LoadingSpinner />
  }
  if (!resturant) {
    return <h6>Restuarant is not found.</h6>
  }
  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img className="rounded-md object-cover h-full w-full " src={resturant.imageUrl} alt="" />
      </AspectRatio>
      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
        <div className="flex flex-col gap-4">
          <RestaurantInfo restaurant={resturant} />
          <span className="text-2xl font-bold tracking-tight">Menu</span>
          {resturant.menuItems.map((menuItem) => (
            <MenuItem menuItem={menuItem} addToCart={addToCart} />
          ))}
        </div>
        <Card>
          <OrderSummary restaurant={resturant} cartItems={cartItems} removeFromCart={removeFromCart} />
        </Card>
      </div>
    </div>
  )

}

export default DetailPage
