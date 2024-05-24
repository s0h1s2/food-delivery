import express from "express"
import { userRouter } from "./user"
import { resturantRouter } from "./resturant"

const router = express.Router()
router.use("/users", userRouter)
router.use("/resturants", resturantRouter)

export default router
