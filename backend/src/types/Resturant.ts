import { IMenuItem } from "./MenuItem";
import { IUser } from "./User";

export interface IResturant {
  user: IUser
  resturantName: string
  city: string
  country: string
  deliveryPrice: number
  estimatedDeliveryPrice: number
  cuisines: string[]
  menuItems: IMenuItem[]
  imageUrl: string
  lastUpdated: Date
}
