import { IUser } from "@/types/User"
import z from "zod"
export const CreateUserInput: z.ZodType<IUser> = z.object({
  auth0Id: z.string(),
  email: z.string().email(),
  city: z.string().optional(),
  name: z.string().optional(),
  country: z.string().optional(),
  addressLine1: z.string().optional()
})
export type CreateUserBody = z.infer<typeof CreateUserInput>




