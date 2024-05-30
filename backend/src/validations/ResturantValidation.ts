import { z } from "zod";

const schema = z.object({
  resturantName: z.string().min(1),
  city: z.string().min(1),
  country: z.string().min(1),
  deliveryPrice: z.string(),
  estimatedDeliveryTime: z.string(),
  cuisines: z.array(z.string()),
  menuItems: z.array(z.object({ name: z.string(), price: z.string() }))
}).strict()

export const ResturantInputCreate = schema

export type CreateResturantBody = z.infer<typeof ResturantInputCreate>
