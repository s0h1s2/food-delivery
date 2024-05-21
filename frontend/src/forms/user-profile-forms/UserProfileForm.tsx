import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserProfileFormData, schema } from "./validation";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { UserCog } from "lucide-react";
import { UserInfoResponse } from "@/types/user";
import { useEffect } from "react";
interface Props {
  onSave: (data: UserProfileFormData) => void
  isLoading: boolean
  currentUser?: UserInfoResponse
}
export const UserProfileForm = ({ onSave, isLoading, currentUser }: Props) => {
  const form = useForm<UserProfileFormData>({ resolver: yupResolver(schema), defaultValues: currentUser });
  useEffect(() => {
    form.reset(currentUser)
  }, [currentUser, form])
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSave)} className="space-y-4 bg-gray-50 rounded-lg p-4 md:p-10">
        <div>
          <h2 className="text-2xl font-bold">
            <div className="flex flex-row gap-2">
              <UserCog />
              User Profile Form
            </div>
          </h2>
          <FormDescription>
            View and change your profile information here
          </FormDescription>
        </div>
        <FormField control={form.control} name="email" render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input {...field} disabled className="bg-white" />
            </FormControl>
            <FormMessage />
          </FormItem>)} />
        <FormField control={form.control} name="name" render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input {...field} className="bg-white" />
            </FormControl>
            <FormMessage />
          </FormItem>)} />

        <div className="flex flex-col md:flex-row gap-4">
          <FormField control={form.control} name="addressLine1" render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Address Line 1</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>)} />
          <FormField control={form.control} name="city" render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>)} />

          <FormField control={form.control} name="country" render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>)} />
        </div>
        {isLoading ? <LoadingButton /> : <Button type="submit" className="bg-orange-500">Update Profile</Button>}
      </form>
    </Form>
  );
};

