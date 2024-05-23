import { UserInfoResponse } from "./user"

export interface FormProps<T> {
  onSave: (data: T) => void
  isLoading: boolean
  currentUser?: UserInfoResponse
}
