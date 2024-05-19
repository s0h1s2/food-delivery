import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { auth } from "express-oauth2-jwt-bearer";
import { StatusCodes } from "http-status-codes";
import User from "@/models/user";
import Logger from "@/util/Logger";


export const jwtCheck = async (_: Request, res: Response, next: NextFunction) => {
  try {
    auth({
      audience: process.env.AUTH0_AUDIENCE,
      issuerBaseURL: process.env.AUTH0_BASE_URL,
      tokenSigningAlg: 'RS256',
    });

    next()
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).send()
  }


}
export const jwtParse = async (req: Request, res: Response, next: NextFunction) => {
  Logger.info("Decode json web token in middleware.")
  const { authorization } = req.headers
  if (!authorization || !authorization.startsWith("Bearer ")) {
    Logger.warn("Autherization header not found.")
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Token doesn't exist." })
  }
  const token = authorization.split(" ")[1]
  try {
    const decoded = jwt.decode(token) as jwt.JwtPayload
    const auth0Id = decoded.sub
    const user = await User.findOne({ auth0Id })
    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).send()
    }
    req.userId = user._id.toString()
    req.auth0Id = auth0Id
    next()
  } catch (error) {
    Logger.error(error)
    return res.status(StatusCodes.UNAUTHORIZED).send({ error: "Could not authenticate." })
  }

}
