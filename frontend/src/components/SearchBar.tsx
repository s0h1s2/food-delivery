import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { InferType, object, string } from "yup"
import { Form, FormControl, FormField, FormItem } from "./ui/form"
import { Search } from "lucide-react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useEffect } from "react"

const formSchema = object({
  searchQuery: string().required()
})
export type SearchForm = InferType<typeof formSchema>

interface Props {
  searchQuery: string
  onSubmit: (formData: SearchForm) => void
  placeholder: string
  onReset?: () => void
}

const SearchBar = ({ searchQuery, placeholder, onSubmit, onReset }: Props) => {
  const form = useForm<SearchForm>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      searchQuery: searchQuery
    }
  })
  useEffect(() => {
    form.reset({ searchQuery })
  }, [form, searchQuery])
  const handleReset = () => {
    form.reset({
      searchQuery: ""
    })
    if (onReset) {
      onReset()
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={`flex items-center flex-1 gap-3 justify-between flex-row border-2 rounded-full p-3 mx-5 ${form.formState.errors.searchQuery && "border-red-500"}`}>
        <Search strokeWidth={2.5} size={30} className="ml-1 text-orange-500 hidden md:block" />
        <FormField control={form.control} name="searchQuery" render={({ field }) => (
          <FormItem className="flex-1">
            <FormControl>
              <Input {...field} placeholder={placeholder} className="border-none focus:outline-none shadow-none text-xl focus-visiable:ring-0" />
            </FormControl>
          </FormItem>
        )} />
        <Button onClick={handleReset} type="button" variant="outline" className="rounded-full">Reset</Button>
        <Button type="submit" className="rounded-full bg-orange-500">
          Search
        </Button>
      </form>
    </Form>
  )
}

export default SearchBar
