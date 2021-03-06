import axios from "axios"
import config from "config"

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

axiosInstance.interceptors.response.use(
  res => Promise.resolve(res),
  err =>
    err && err.response && err.response.data
      ? Promise.reject(err.response.data)
      : Promise.reject(err)
)

export default axiosInstance
