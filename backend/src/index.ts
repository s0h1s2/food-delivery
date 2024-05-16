import express from "express"
import cors from "cors"
import "dotenv/config"
import logger from "./util/logger"
import mongoose from "mongoose"
import routes from "./routes/v1/routes"
mongoose.connect(process.env.MONGODB_CONNECTION as string).then(() => logger.info("Connected to database.")).catch((e) => logger.error("Unable to connect to database: " + e))


const app = express()
app.use(express.json())
app.use(cors())
app.use("/api/v1", routes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  logger.info(`Server is listening on port ${PORT}`)
})
