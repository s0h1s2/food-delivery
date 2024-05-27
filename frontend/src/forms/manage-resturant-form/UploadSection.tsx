import { useFormContext } from "react-hook-form"
import { ManageResturantFormData } from "./validaiton"
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { AspectRatio } from "@radix-ui/react-aspect-ratio"

const UploadSection = () => {
  const { control, watch } = useFormContext<ManageResturantFormData>()
  const existingImageUrl = watch("imageFile") as File

  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Image</h2>
        <FormDescription>
          Add an image that will be displayed on your resturant listing in the search result. Add a new image will overwrite existing one.
        </FormDescription>
      </div>
      <div className="flex flex-col gap-8 w-[50%]">
        {existingImageUrl && (
          <AspectRatio ratio={16 / 9}>
            <img className="rounded-md object-cover h-full w-full" src={URL.createObjectURL(existingImageUrl)} alt="Resturant Image" />
          </AspectRatio>
        )}
        <FormField name="imageFile" control={control} render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input type="file" onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : null)} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
      </div>
    </div>
  )
}

export default UploadSection
