import express from "express"
import cors from "cors"
import "dotenv/config"
import logger from "./util/Logger"
import mongoose from "mongoose"
import routes from "./routes/v1/routes"
import { auth } from "express-oauth2-jwt-bearer"

mongoose.connect(process.env.MONGODB_CONNECTION as string).then(() => logger.info("Connected to database.")).catch((e) => logger.error("Unable to connect to database: " + e))


const app = express()
const jwtCheck = auth({
  audience: 'mern-food-order-api',
  issuerBaseURL: 'https://dev-sttlwjxbf82ebrpe.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});

app.use(express.json())
app.use(cors({ credentials: true, origin: "http://localhost:5173" }))
app.use("/api/v1", routes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  logger.info(`Server is listening on port ${PORT}`)
})
