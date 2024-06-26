import { z } from "zod";

const schema = z.object({
  resturantName: z.string().min(1),
  city: z.string().min(1),
  country: z.string().min(1),
  deliveryPrice: z.string(),
  estimatedDeliveryTime: z.string(),
  cuisines: z.array(z.string()),
  menuItems: z.array(z.object({ name: z.string(), price: z.string() }))
})

export const ResturantInputCreate = schema
export const ResturantCitySearch = schema.pick({ city: true })

export type CreateResturantBody = z.infer<typeof ResturantInputCreate>
export type UpdateResturantBody = z.infer<typeof ResturantInputCreate>
