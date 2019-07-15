import { AxiosRequestConfig } from "axios"
import { Dispatch } from "redux"
import { addNotificationMessage } from "redux/actions/Notification"
import axiosInstance from "redux/axiosInstance"

type RequestType = {
  REQUEST: string
  SUCCESS: string
  FAILURE: string
}

type AxiosMethodsWithConfig = "get" | "delete" | "head"
type AxiosMethodsWithBody = "post" | "put" | "patch"

type AxiosMethods = AxiosMethodsWithBody | AxiosMethodsWithConfig

type AxiosProps =
  | [AxiosMethods, string]
  | [AxiosMethods, string, any]
  | [AxiosMethods, string, AxiosRequestConfig]
  | [AxiosMethods, string, any, AxiosRequestConfig]

export const asyncAction = <P = any>(
  type: RequestType,
  [method, uri, ...axiosProps]: AxiosProps,
  extraCallback?: (data: P, dispatch: Dispatch) => void
) => async (dispatch: Dispatch) => {
  dispatch(actionCreator.request(type))
  try {
    let res
    if (method === "get" || method === "delete" || method === "head") {
      res = await axiosInstance[method](uri, axiosProps[0])
    } else if (method === "patch" || method === "post" || method === "put") {
      res = await axiosInstance[method](uri, axiosProps[0], axiosProps[1])
    }

    if (res) {
      const payload = res.data
      dispatch(actionCreator.success(type, payload))
      if (extraCallback) extraCallback(payload, dispatch)
    }
  } catch (error) {
    dispatch(actionCreator.failure(type, error))
    addNotificationMessage({
      title: error.message,
      level: "error",
    })(dispatch)
  }
}

export const createRequestTypes = (type: string): RequestType => ({
  REQUEST: `${type}_REQUEST`,
  SUCCESS: `${type}_SUCCESS`,
  FAILURE: `${type}_FAILURE`,
})

export const actionCreator = {
  request: (type: RequestType) => ({ type: type.REQUEST }),
  success: (type: RequestType, payload?: any) => ({
    type: type.SUCCESS,
    payload,
  }),
  failure: (type: RequestType, error: Error) => ({
    type: type.FAILURE,
    error,
  }),
}
