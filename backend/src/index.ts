import express from "express"
import cors from "cors"
import "dotenv/config"
import logger from "./util/Logger"
import mongoose from "mongoose"
import morgan from "morgan"
import routes from "./routes/v1/routes"
import { v2 as cloudinary } from "cloudinary"

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      auth0Id?: string;
    }
  }
}

mongoose.connect(process.env.MONGODB_CONNECTION as string).then(() => logger.info("Connected to database.")).catch((e) => logger.error("Unable to connect to database: " + e))
cloudinary.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME
})

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ credentials: true, origin: "http://localhost:5173" }))
app.use(morgan("tiny"))
app.use("/api/v1", routes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  logger.info(`Server is listening on port ${PORT}`)
})
