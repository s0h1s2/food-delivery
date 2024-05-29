import { z } from "zod";

const schema = z.object({
  resturantName: z.string().min(1),
  city: z.string().min(1),
  country: z.string().min(1),
  deliveryPrice: z.number(),
  estimatedDeliveryTime: z.number(),
  cuisines: z.array(z.string()),
  menuItems: z.
}).strict()
export const ResturantInputCreate = schema

export type CreateResturantBody = z.infer<typeof ResturantInputCreate>
