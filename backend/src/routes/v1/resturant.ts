import express from "express";
import multer from "multer"
import path from "path"
import ResturantController from "@/controllers/ResturantController"
import { validateSchema } from "@/middlewares/validator";
import { ResturantInputCreate } from "@/validations/ResturantValidation";
import { jwtCheck, jwtParse } from "@/middlewares/auth";
const router = express.Router()
const storage = multer.memoryStorage()

const FILE_SIZE = 5 * 1024 * 1024 // 5 MB

const upload = multer({
  storage,
  limits: {
    fileSize: FILE_SIZE
  },
  fileFilter: (_, file, cb) => {
    const fileTypes = /jpeg|png|jpg/
    const mimeType = fileTypes.test(file.mimetype)
    const extension = fileTypes.test(path.extname(file.originalname).toLowerCase())
    if (mimeType && extension) {
      return cb(null, true)
    }
    cb(Error("Error: File upload only supports the following filetypes - " + fileTypes))
  }
})
router.get("/", jwtCheck, jwtParse, ResturantController.getMyResturant)
router.post("/", jwtCheck, jwtParse, upload.single("imageFile"), validateSchema(ResturantInputCreate), ResturantController.createResturant)
router.put("/", jwtCheck, jwtParse, upload.single("imageFile"), validateSchema(ResturantInputCreate), ResturantController.updateResturant)


export { router as resturantRouter }
