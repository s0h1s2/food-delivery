import { Schema, model } from "mongoose";
import { IUser } from "../types/user";

const userSchema = new Schema<IUser>({
  auth0Id: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  addressLine1: {
    type: String
  },
  city: {
    type: String
  },
  country: {
    type: String
  },
})

const User = model<IUser>("user", userSchema)
export default User

