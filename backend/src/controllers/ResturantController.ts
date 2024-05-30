import { Resturant } from "@/models/resturant";
import { CreateResturantBody } from "@/validations/ResturantValidation";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import cloudinary from "cloudinary"
import Logger from "@/util/Logger";
import { loggers } from "winston";
const createResturant = async (req: Request, res: Response) => {
  try {
    const existingResturant = await Resturant.findOne({ user: req.userId })
    if (existingResturant) {
      Logger.error("Resutrant currently exist.")
      return res.status(StatusCodes.BAD_REQUEST).json({ error: "Resturant currently exist." })
    }
    Logger.info("Create resturant")
    const resturantInfo = req.body as CreateResturantBody
    const image = req.file as Express.Multer.File
    const base64Image = Buffer.from(image.buffer).toString("base64")
    const dataUri = `data:${image.mimetype};base64,${base64Image}`
    const uploadResponse = await cloudinary.v2.uploader.upload(dataUri)
    await Resturant.create({ user: req.userId, ...resturantInfo, imageUrl: uploadResponse.url, lastUpdated: new Date() })
    return res.status(StatusCodes.OK).json({})
  } catch (err) {
    Logger.error("Resturant creation failed " + err)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: "Error creating resturant" })

  }
}
const getMyResturant = async (req: Request, res: Response) => {
  try {
    Logger.info("Fetch resturant info")
    const resturant = await Resturant.findOne({ user: req.userId })
    if (!resturant) {
      Logger.info("Resturant not found")
      return res.status(StatusCodes.NOT_FOUND).send({ error: "Resutrant not found." })
    }
    return res.send(resturant)
  } catch (e) {
    Logger.error("Fetch resturant failed " + e)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: "Unable to fetch resturant." })
  }
}
export default {
  createResturant,
  getMyResturant
}
