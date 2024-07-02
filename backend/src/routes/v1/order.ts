import express from "express"
const orderRouter = express.Router()
orderRouter.post("/checkout/create-checkout-session")

export { orderRouter }
