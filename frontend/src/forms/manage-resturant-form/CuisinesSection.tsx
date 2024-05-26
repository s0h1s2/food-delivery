import { FormDescription, FormField, FormItem } from "@/components/ui/form"
import { useFormContext } from "react-hook-form"
import { ManageResturantFormData } from "./validaiton"
import { CUISINES_LIST } from "@/constants"
import CuisineCheckbox from "@/components/CuisineCheckbox"

const CuisinesSection = () => {
  const { control } = useFormContext<ManageResturantFormData>()
  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Cuisines</h2>
        <FormDescription>
          Select the cuisines that your resturant serves!.
        </FormDescription>
      </div>
      <FormField name="cuisines" control={control} render={({ field }) => (
        <FormItem>
          <div className="grid md:grid-cols-5 gap-1">
            {CUISINES_LIST.map((cuisine) => {
              {/*@ts-ignore*/ }
              return (< CuisineCheckbox key={cuisine} name={cuisine} field={field} />)
            })}
          </div>
        </FormItem>
      )} />

    </div>
  )
}

export default CuisinesSection
