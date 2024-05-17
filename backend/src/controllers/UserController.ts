import User from "@/models/user"
import Logger from "@/util/Logger"
import { CreateUserBody } from "@/validations/UserValidation"
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
export default {
  createUser
}
