import { useFieldArray, useFormContext } from 'react-hook-form'
import { ManageResturantFormData } from './validaiton'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const MenuSection = () => {
  const { control } = useFormContext<ManageResturantFormData>()
  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "menuItems"
  })
  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Menu</h2>
        <FormDescription>
          Create your menu and give each item a name and a price.
        </FormDescription>
      </div>
      <FormField control={control} name="menuItems" render={() => (
        <FormItem className="flex flex-col gap-2">
          {fields.map((_, index) => (
            <div key={index} className="flex flex-row items-end gap-2">
              <FormField control={control} name={`menuItems.${index}.name`} render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1">
                    Name <FormMessage />
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Pizza" className="bg-white" />
                  </FormControl>
                </FormItem>

              )} />
              <FormField control={control} name={`menuItems.${index}.price`} render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1">
                    Price ($) <FormMessage />
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="8.0" className="bg-white" />
                  </FormControl>
                </FormItem>

              )} />

              <Button onClick={() => remove(index)} type="button" className="bg-red-500 max-h-fit">Remove</Button>
            </div>
          ))}
        </FormItem>
      )} />
      <Button type="button" onClick={() => append({ name: "", price: 0 })}>Add</Button>
    </div>
  )
}

export default MenuSection
