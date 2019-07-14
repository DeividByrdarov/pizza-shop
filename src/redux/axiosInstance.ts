import axios from "axios"
import config from "config"
import { getToken } from "helpers/authHelpers"

const axiosInstance = axios.create({
  baseURL: config.baseUrl,
  headers: {
    "Content-type": "application/json",
  },
  paramsSerializer(params) {
    const searchParams = new URLSearchParams()
    for (const key of Object.keys(params)) {
      const param = params[key]
      if (Array.isArray(param)) {
        for (const p of param) {
          searchParams.append(key, p)
        }
      } else {
        searchParams.append(key, param)
      }
    }
    return searchParams.toString()
  },
})

axiosInstance.interceptors.request.use(config => {
  const token = getToken()
  if (token) config.headers["Authorization"] = `Basic ${token}`

  return config
})

axiosInstance.interceptors.response.use(
  res => res,
  err => (err && err.response && err.response.data ? err.response.data : err)
)

export default axiosInstance
