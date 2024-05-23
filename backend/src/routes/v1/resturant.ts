import express from "express";
import multer from "multer"

import ResturantController from "@/controllers/ResturantController"
const router = express.Router()
const storage = multer.memoryStorage()

const FILE_SIZE = 5 * 1024 * 1024 // 5 MB

const upload = multer({
  storage,
  limits: {
    fileSize: FILE_SIZE
  }
})
router.post("/", upload.single("imageFile"), ResturantController.createResturant)

export default router
