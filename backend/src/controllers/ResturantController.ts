import { Resturant } from "@/models/resturant";
import { CreateResturantBody, UpdateResturantBody } from "@/validations/ResturantValidation";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import cloudinary from "cloudinary"
import Logger from "@/util/Logger";
const uploadImage = async (file: Express.Multer.File) => {
  const image = file
  const base64Image = Buffer.from(image.buffer).toString("base64")
  const dataUri = `data:${image.mimetype};base64,${base64Image}`
  const uploadResponse = await cloudinary.v2.uploader.upload(dataUri)
  return uploadResponse.url
}
const createResturant = async (req: Request, res: Response) => {
  try {
    const existingResturant = await Resturant.findOne({ user: req.userId })
    if (existingResturant) {
      Logger.error("Resutrant currently exist.")
      return res.status(StatusCodes.BAD_REQUEST).json({ error: "Resturant currently exist." })
    }
    Logger.info("Create resturant")
    const resturantInfo = req.body as CreateResturantBody

    const uploadResponse = await uploadImage(req.file!)
    await Resturant.create({ user: req.userId, ...resturantInfo, imageUrl: uploadResponse, lastUpdated: new Date() })
    return res.status(StatusCodes.CREATED).json({})
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
const updateResturant = async (req: Request, res: Response) => {
  Logger.info("Update resturant")
  try {
    const resturant = await Resturant.findOne({
      user: req.userId
    })
    if (!resturant) {
      return res.status(StatusCodes.NOT_FOUND).send({ error: "Resturant not found." })
    }
    const body = req.body as UpdateResturantBody
    if (req.file) {
      const imageUrl = await uploadImage(req.file)
      resturant.imageUrl = imageUrl
    }
    resturant.resturantName = body.resturantName
    resturant.country = body.country
    resturant.city = body.city
    resturant.cuisines = body.cuisines
    resturant.deliveryPrice = parseFloat(body.deliveryPrice)
    resturant.estimatedDeliveryTime = parseInt(body.estimatedDeliveryTime)
    resturant.menuItems = body.menuItems.map((item) => ({
      name: item.name,
      price: parseFloat(item.price)
    }))
    resturant.save()
    return res.status(StatusCodes.OK).json(resturant)
  } catch (err) {
    Logger.error("Update resturant error:" + err)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: "Something went wrong." })
  }
}
export default {
  createResturant,
  getMyResturant,
  updateResturant
}
