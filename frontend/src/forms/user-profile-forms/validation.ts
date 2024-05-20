import { InferType, object, string } from "yup"
export const schema = object({
  email: string().optional(),
  name: string().required(),
  city: string().required(),
  country: string().required(),
  addressLine1: string().required(),
})

export type UserProfileFormData = InferType<typeof schema>
