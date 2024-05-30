import { FormProps } from "@/types/form"
import { ManageResturantFormData, manageResturantFormSchema } from "./validaiton"
import { Resturant } from "@/types/resturant"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Form } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import DetailSection from "./DetailSection"
import CuisinesSection from "./CuisinesSection"
import MenuSection from "./MenuSection"
import UploadSection from "./UploadSection"
import LoadingButton from "@/components/LoadingButton"
import { Button } from "@/components/ui/button"
import convertToFormData from "json-form-data"
import { useEffect } from "react"

const ManageResturantForm = ({ onSave, isLoading, resturant }: FormProps<FormData> & { resturant?: Resturant }) => {
  const form = useForm<ManageResturantFormData>({
    resolver: yupResolver(manageResturantFormSchema),
    defaultValues: {
      cuisines: [],
      menuItems: [{ price: 0, name: "" }]

    }
  })
  useEffect(() => {
    if (!resturant) {
      return
    }
    const updateResturant = {
      ...resturant
    }
    form.reset(updateResturant)
  }, [resturant, form])

  const onSubmit = (data: ManageResturantFormData) => {
    const result = convertToFormData(data)
    onSave(result)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-gray-100 p-10 rounded-lg">
        <DetailSection />
        <Separator />
        <CuisinesSection />
        <Separator />
        <MenuSection />
        <Separator />
        <UploadSection imageUrl={resturant?.imageUrl} />
        {isLoading ? <LoadingButton /> : <Button type="submit">Create</Button>}
      </form>
    </Form>
  )
}

export default ManageResturantForm
