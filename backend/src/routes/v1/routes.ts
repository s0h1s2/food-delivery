import express from "express"
import { userRouter } from "./user"
import { resturantRouter } from "./resturant"
import { orderRouter } from "./order"

const router = express.Router()
router.use("/users", userRouter)
router.use("/resturants", resturantRouter)
router.use("/orders", orderRouter)

export default router
