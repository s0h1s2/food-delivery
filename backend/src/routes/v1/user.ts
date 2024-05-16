import express from "express";

const userRouter = express.Router()

userRouter.post("/", (_, res) => {
  res.json({ "Hello": "World!" })
})

export { userRouter }


