import { InferType, object, string, number, array, mixed } from "yup"

export const manageResturantFormSchema = object({
  resturantName: string().required(),
  city: string().required(),
  country: string().required(),
  deliveryPrice: number().required(),
  estimatedDeliveryTime: number().required(),
  cuisines: array(string()).min(1).required(),
  menuItems: array().of(object().shape({
    name: string().required("is required"),
    price: number().required("is required").typeError("Must be a number")
  })),
  imageFile: mixed().required("Image is required")
})

export type ManageResturantFormData = InferType<typeof manageResturantFormSchema>
