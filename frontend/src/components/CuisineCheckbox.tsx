import { ControllerRenderProps, FieldValues } from "react-hook-form"
import { FormControl, FormItem, FormLabel } from "./ui/form"
import { Checkbox } from "./ui/checkbox"

interface Props {
  name: string
  field: ControllerRenderProps<FieldValues, "cuisines">
}
const CuisineCheckbox = ({ name, field }: Props) => {
  return (
    <FormItem className="flex flex-row items-center space-x-1 space-y-0 mt-2">
      <FormControl>
        <Checkbox className="bg-white" checked={field.value.includes(name)} onCheckedChange={(checked) => {
          if (checked) {
            field.onChange([...field.value, name])
            return
          }
          field.onChange(field.value.filter((val: string) => val != name))
        }} />
      </FormControl>
      <FormLabel className="text-sm font-normal">{name}</FormLabel>
    </FormItem>
  )
}

export default CuisineCheckbox
