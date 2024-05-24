import { Resturant } from "@/models/resturant";
import { CreateResturantBody } from "@/validations/ResturantValidation";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import cloudinary from "cloudinary"
import Logger from "@/util/Logger";
const createResturant = async (req: Request, res: Response) => {
  try {
    const existingResturant = await Resturant.findOne({ user: req.userId })
    if (existingResturant) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: "Resturant currently exist." })
    }
    const resturantInfo = req.body as CreateResturantBody
    const image = req.file as Express.Multer.File
    const base64Image = Buffer.from(image.buffer).toString("base64")
    const dataUri = `data:${image.mimetype};base64,${base64Image}`
    const uploadResponse = await cloudinary.v2.uploader.upload(dataUri)
    await Resturant.create({ user: req.userId, ...resturantInfo, imageUrl: uploadResponse.url, lastUpdated: new Date() })
    return res.status(StatusCodes.OK).json({})
  } catch (err) {
    Logger.error(err)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: "Error creating resturant" })
  }
}

export default {
  createResturant
}
