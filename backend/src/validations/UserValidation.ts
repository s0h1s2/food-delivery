import z from "zod"
const schema = z.object({
  auth0Id: z.string(),
  email: z.string().email(),
  city: z.string().optional(),
  name: z.string().optional(),
  country: z.string().optional(),
  addressLine1: z.string().optional()
})

export const UserInputCreate = schema
export const UserInputUpdate = schema.omit({ email: true, auth0Id: true })

export type CreateUserBody = z.infer<typeof UserInputCreate>

export type UpdateUserBody = z.infer<typeof UserInputUpdate>




