import { FormControl, FormDescription, FormField, FormMessage, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useFormContext } from 'react-hook-form'
import { ManageResturantFormData } from './validaiton'

const DetailSection = () => {
  const { control } = useFormContext<ManageResturantFormData>()
  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Details</h2>
        <FormDescription>
          Enter the details about the resturant
        </FormDescription>
      </div>
      <FormField control={control} name="resturantName" render={({ field }) => (
        <FormItem>
          <FormLabel>Resturant Name</FormLabel>
          <FormControl>
            <Input {...field} className="bg-white" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )} />
      <div className="flex flex-col md:flex-row gap-4">
        <FormField control={control} name="city" render={({ field }) => (
          <FormItem className='w-full'>
            <FormLabel>City</FormLabel>
            <FormControl>
              <Input {...field} className="bg-white" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={control} name="country" render={({ field }) => (
          <FormItem className='w-full'>
            <FormLabel>Country</FormLabel>
            <FormControl>
              <Input {...field} className="bg-white" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
      </div>
      <FormField control={control} name="deliveryPrice" render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>Delivery Price ({field.value}$)</FormLabel>
          <FormControl>
            <Input {...field} className="bg-white" placeholder="1.50" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )} />
      <FormField control={control} name="estimatedDeliveryTime" render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>Estimated Delivery Time(minutes)</FormLabel>
          <FormControl>
            <Input {...field} className="bg-white" placeholder="30" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )} />

    </div >
  )
}

export default DetailSection
