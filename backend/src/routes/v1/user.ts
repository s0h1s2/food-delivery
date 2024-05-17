import express from "express";
import UserController from "@/controllers/UserController";
import { validateSchema } from "@/middlewares/validator";
import { CreateUserInput } from "@/validations/UserValidation";

const userRouter = express.Router()

userRouter.post("/", validateSchema(CreateUserInput), UserController.createUser)


export { userRouter }


