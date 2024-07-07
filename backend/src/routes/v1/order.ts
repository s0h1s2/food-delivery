import { jwtCheck, jwtParse } from "@/middlewares/auth"
import OrderController from "@/controllers/OrderController"
import express from "express"
const orderRouter = express.Router()

orderRouter.post("/checkout/create-checkout-session", jwtCheck, jwtParse, OrderController.createOrderCheckoutSession)


export { orderRouter }
