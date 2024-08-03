import mongoose, { InferSchemaType } from "mongoose";
const menuItemSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true, default: () => new mongoose.Types.ObjectId() },
  name: { type: String, required: true },
  price: { type: Number, required: true }
})

const resturantSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  resturantName: { type: String, required: true },
  city: { type: String, required: true },
  cuisines: [{ type: String, required: true }],
  country: { type: String, required: true },
  imageUrl: { type: String, required: true },
  lastUpdated: { type: Date, required: true },
  menuItems: [menuItemSchema],
  deliveryPrice: { type: Number, required: true },
  estimatedDeliveryTime: { type: Number, required: true }

})

export type MenuItem = InferSchemaType<typeof menuItemSchema>
export type Resturant = InferSchemaType<typeof resturantSchema>

export const Resturant = mongoose.model("Resturant", resturantSchema)

