import { FormProps } from "@/types/form"
import { ManageResturantFormData, manageResturantFormSchema } from "./validaiton"
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

const ManageResturantForm = ({ onSave, isLoading }: FormProps<FormData>) => {
  const form = useForm<ManageResturantFormData>({
    resolver: yupResolver(manageResturantFormSchema),
    defaultValues: {
      cuisines: [],
      menuItems: [{ name: "", price: 0 }]
    }
  })
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
        <UploadSection />
        {isLoading ? <LoadingButton /> : <Button type="submit">Create</Button>}
      </form>
    </Form>
  )
}

export default ManageResturantForm
