export interface MenuItem {
  _id: string
  name: string
  price: number
  quantity: number
}
export interface Resturant {
  _id: string
  resturantName: string
  city: string
  country: string
  menuItems: MenuItem[]
  deliveryPrice: number
  estimatedDeliveryTime: number
  userId: string
  cuisines: string[]
  imageUrl: string
  lastUpdated: Date
}
