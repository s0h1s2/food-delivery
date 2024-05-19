import express from "express";
import UserController from "@/controllers/UserController";
import { validateSchema } from "@/middlewares/validator";
import { UserInputCreate, UserInputUpdate } from "@/validations/UserValidation";
import { jwtCheck, jwtParse } from "@/middlewares/auth";

const userRouter = express.Router()

userRouter.get("/me", jwtCheck, jwtParse, UserController.getUserInfo)
userRouter.post("/", jwtCheck, validateSchema(UserInputCreate), UserController.createUser)
userRouter.put("/", jwtCheck, jwtParse, validateSchema(UserInputUpdate), UserController.updateCurrentUser)




export { userRouter }


