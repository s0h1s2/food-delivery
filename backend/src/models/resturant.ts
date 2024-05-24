import mongoose from "mongoose";
import { IResturant } from "@/types/Resturant";
import { IMenuItem } from "@/types/MenuItem";
const menuItemSchema = new mongoose.Schema<IMenuItem>({
  name: { type: String, required: true },
  price: { type: Number, required: true }
})
const resturantSchema = new mongoose.Schema<IResturant>({
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
export const Resturant = mongoose.model("Resturant", resturantSchema)

