import { Resturant } from "@/models/resturant"
import { IMenuItem } from "@/types/MenuItem"
import Logger from "@/util/Logger"
import { Response, Request } from "express"
import { StatusCodes } from "http-status-codes"
import Stripe from "stripe"
const STRIPE = new Stripe(process.env.STRIPE_API_KEY as string)
const FRONTEND_URL = process.env.FRONTEND_URL as string
type CheckoutSessionRequest = {
  cartItems: {
    menuItemId: string
    name: string
    quantity: string
  }[]
  deliveryDetails: {
    email: string
    name: string
    addressLine1: string
    city: string
  }
  resturantId: string
}
const createOrderCheckoutSession = async (req: Request, res: Response) => {
  try {
    const checkoutSessionRequest: CheckoutSessionRequest = req.body
    const restuarant = await Resturant.findById(checkoutSessionRequest.resturantId)
    if (!restuarant) {
      throw new Error("Restuarant not found.")
    }
    const lineItems = createLineItems(checkoutSessionRequest, restuarant.menuItems)

  } catch (error) {
    Logger.error(error)
    return res.status(StatusCodes.SERVICE_UNAVAILABLE).send({ message: error.raw.message })
  }
}
const createLineItems = (checkout: CheckoutSessionRequest, menuItems: IMenuItem[]) => { }

export default {
  createOrderCheckoutSession
}
