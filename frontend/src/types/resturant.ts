export interface MenuItem {
  name: string
  price: number
}
export interface Resturant {
  _id: string
  resturantName: string
  city: string
  country: string
  menuItems: MenuItem[]
  deliveryPrice: number
  estimatedDeliveryPrice: number
  userId: string
  cuisines: string[]
  imageUrl: string
  lastUpdated: Date
}
