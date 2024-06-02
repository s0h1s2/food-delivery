import { Resturant } from "@/models/resturant";
import { CreateResturantBody, UpdateResturantBody } from "@/validations/ResturantValidation";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import cloudinary from "cloudinary"
import Logger from "@/util/Logger";
const PAGE_SIZE = 10

const uploadImage = async (file: Express.Multer.File) => {
  const image = file
  const base64Image = Buffer.from(image.buffer).toString("base64")
  const dataUri = `data:${image.mimetype};base64,${base64Image}`
  const uploadResponse = await cloudinary.v2.uploader.upload(dataUri)
  return uploadResponse.url
}

const getResturantsByCity = async (req: Request, res: Response) => {
  Logger.info("Search resutrants by city")
  try {
    const city = req.params.city
    const searchQuery = req.query.searchQuery as string || ""
    const sortOption = req.query.sortOption as string || "lastUpdated"
    const selectedCuisiens = req.query.cuisines as string || ""
    const page = parseInt(req.query.page as string) || 1
    let query: any = {}
    query["city"] = new RegExp(city, "i")
    const cityCheck = await Resturant.countDocuments(query)
    if (cityCheck === 0) {
      return res.status(StatusCodes.NOT_FOUND).json([])
    }
    if (selectedCuisiens) {
      const cuisinesArray = selectedCuisiens.split(",").map((cuisine) => new RegExp(cuisine, "i"))
      query["cuisines"] = { $all: cuisinesArray }
    }
    if (searchQuery) {
      const searchQueryRegex = new RegExp(searchQuery, "i")
      query["$or"] = [
        { resturantName: searchQueryRegex },
        { cuisines: { $in: [searchQueryRegex] } }
      ]
    }
    const skip = (page - 1) * PAGE_SIZE

    const resturants = await Resturant.find(query).sort({ [sortOption]: 1 }).skip(skip).limit(PAGE_SIZE).lean()
    const total = await Resturant.countDocuments(query)
    return res.json({ data: resturants, currentPage: page, totalPages: Math.ceil(total / PAGE_SIZE) })
  } catch (e) {
    Logger.error("Error at search resturant by city" + e)
  }
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
  updateResturant,
  getResturantsByCity
}
