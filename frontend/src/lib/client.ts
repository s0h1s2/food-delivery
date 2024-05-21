import axios from "axios"
const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true
});

export const addAccessTokenInterceptor = (getAccessToken: any) => {
  client.interceptors.request.use(async (config) => {
    const token = await getAccessToken()
    config.headers.Authorization = `Bearer ${token}`
    return config
  })
}
export default client
