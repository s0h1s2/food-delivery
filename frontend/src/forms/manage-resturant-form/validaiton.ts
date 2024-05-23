import { InferType, object, string, number, array } from "yup"
export const schema = object({
  resturantName: string().required(),
  city: string().required(),
  country: string().required(),
  deliveryPrice: number().required(),
  estimatedDeliveryTime: number().required(),
  cuisines: array().min(1).required(),
  menuItems: array().of(object().shape({
    name: string().required(),
    price: number().required()
  })).compact((v) => !v.checked)


})

export type ManageResturantFormData = InferType<typeof schema>
