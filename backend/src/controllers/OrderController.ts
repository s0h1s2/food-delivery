import { MenuItem, Resturant } from "@/models/resturant"
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
    const session = await createSession(lineItems, "TEST_ORDER_ID", restuarant.deliveryPrice, restuarant._id.toString())
    if (!session.url) {
      return res.status(500).send()
    }
    return res.json({ url: session.url })
  } catch (error) {
    Logger.error(error)
    return res.status(StatusCodes.SERVICE_UNAVAILABLE).send()
  }

}
const createLineItems = (checkout: CheckoutSessionRequest, menuItems: MenuItem[]) => {
  const lineItems = checkout.cartItems.map((cart) => {
    const menuItem = menuItems.find((item) => item._id.toString() === cart.menuItemId.toString())
    if (!menuItem) {
      throw new Error(`Menu item not found:${menuItem}`)
    }
    const line_item: Stripe.Checkout.SessionCreateParams.LineItem = {
      price_data: {
        currency: 'usd',
        unit_amount: menuItem.price,
        product_data: {
          name: menuItem.name
        }
      },
      quantity: parseInt(cart.quantity)
    }
    return line_item
  })
  return lineItems
}

export default {
  createOrderCheckoutSession
}
const createSession = async (lineItems: Stripe.Checkout.SessionCreateParams.LineItem[], orderId: string, deliveryPrice: number, restuarantId: string) => {
  const sessionData = await STRIPE.checkout.sessions.create({
    line_items: lineItems,
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: "Delivery",
          type: "fixed_amount",
          fixed_amount: {
            amount: deliveryPrice,
            currency: 'usd'
          }
        }
      }
    ],
    mode: "payment",
    metadata: {
      orderId,
      restuarantId
    },
    success_url: `${FRONTEND_URL}/order-status?success=true`,
    cancel_url: `${FRONTEND_URL}/detail/${restuarantId}?cancelled=true`,
  })
  return sessionData
}

