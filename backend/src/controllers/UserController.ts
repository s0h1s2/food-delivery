import User from "@/models/user"
import Logger from "@/util/Logger"
import { CreateUserBody, UpdateUserBody } from "@/validations/UserValidation"
import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
const createUser = async (req: Request, res: Response) => {
  try {
    const body = req.body as CreateUserBody
    const existingUser = await User.findOne({ auth0Id: body.auth0Id })
    if (existingUser) {
      Logger.info("User already exist.")
      res.status(StatusCodes.OK).send()
      return
    }
    const newUser = new User(body)
    await newUser.save()
    Logger.info("User Created")
    res.status(StatusCodes.CREATED).json({ result: newUser })
  } catch (e) {
    Logger.error(`Create user error happend ${e}`)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send()
  }
}
const getUserInfo = async (req: Request, res: Response) => {

}
const updateCurrentUser = async (req: Request, res: Response) => {
  try {
    const body = req.body as UpdateUserBody
    const user = await User.findById(req.userId)
    if (!user) {
      res.status(StatusCodes.NOT_FOUND).json({ error: "User not found." })
      return
    }
    const updatedUser = await User.findOneAndUpdate({ auth0Id: req.userId }, body)
    res.status(StatusCodes.OK).json({ data: updatedUser })
  } catch (error) {
    Logger.error(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send()
  }
}
export default {
  createUser,
  getUserInfo,
  updateCurrentUser
}
