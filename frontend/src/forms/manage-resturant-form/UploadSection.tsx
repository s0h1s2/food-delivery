import { useFormContext } from "react-hook-form"
import { ManageResturantFormData } from "./validaiton"
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const UploadSection = () => {
  const { control } = useFormContext<ManageResturantFormData>()
  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Image</h2>
        <FormDescription>
          Add an image that will be displayed on your resturant listing in the search result. Add a new image will overwrite existing one.
        </FormDescription>
      </div>
      <div className="flex flex-col gap-8 w-[50%]">
        <FormField name="imageFile" control={control} render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input accept=".jpg, .jpeg, .png" type="file" onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : null)} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
      </div>
    </div>
  )
}

export default UploadSection
