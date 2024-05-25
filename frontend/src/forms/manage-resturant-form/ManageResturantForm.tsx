import { FormProps } from "@/types/form"
import { ManageResturantFormData, manageResturantFormSchema } from "./validaiton"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Form } from "@/components/ui/form"
import DetailSection from "./DetailSection"
import { Separator } from "@/components/ui/separator"

const ManageResturantForm = ({ onSave, isLoading }: FormProps<ManageResturantFormData>) => {
  const form = useForm<ManageResturantFormData>({
    resolver: yupResolver(manageResturantFormSchema),
    defaultValues: {
      cuisines: [],
      menuItems: [{ name: "", price: 0 }]
    }
  })
  const onSubmit = (data: ManageResturantFormData) => {
    console.log(data, onSave, isLoading)
    // onSave(data)
    // TODO: convert json to form-data
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-gray-100 p-10 rounded-lg">
        <DetailSection />
        <Separator />
      </form>
    </Form>
  )
}

export default ManageResturantForm
