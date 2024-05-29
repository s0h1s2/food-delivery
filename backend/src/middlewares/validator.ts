import Logger from "@/util/Logger"
import { Request, Response, NextFunction } from "express"
import { StatusCodes } from "http-status-codes"
import z, { ZodError } from "zod"
export const validateSchema = (schema: z.ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Logger.info("Validate request body")
    try {
      schema.parse(req.body)
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        Logger.error("Validation failed.")
        Logger.error(error)
        res.status(StatusCodes.BAD_REQUEST).json({ error: error })
      } else {
        Logger.error(error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" })
      }
    }
  }
}
