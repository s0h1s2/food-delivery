import express from "express"
import cors from "cors"
import "dotenv/config"
import logger from "./util/logger"
import mongoose from "mongoose"
mongoose.connect(process.env.MONGODB_CONNECTION as string).then(() => logger.info("Connected to database.")).catch((e) => logger.error("Unable to connect to database: " + e))


const app = express()
app.use(express.json())
app.use(cors())

app.get("/test", (req, res) => {
  res.json({ "code": "Hello" })
})
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  logger.info(`Server is listening on port ${PORT}`)
})
