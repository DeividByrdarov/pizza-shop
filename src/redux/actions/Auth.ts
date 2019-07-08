import { Dispatch } from "redux"
import {
  createRequestTypes,
  actionCreator,
} from "helpers/actionHelpers"
import axiosInstance from "redux/axiosInstance"
import { addNotificationMessage } from "./Notification"
import { User } from "types/User"

export type AuthBody = {
  username: string
  password: string
}

export type AuthResponse = {
  token: string
}

export const LOGIN = createRequestTypes("LOGIN")
export const LOGOUT = createRequestTypes("LOGOUT")
export const REGISTER = createRequestTypes("REGISTER")

export const logout = () => async (dispatch: Dispatch) => {
  dispatch(actionCreator.success(LOGOUT))
  localStorage.removeItem("access_token")
}

export const login = (user: AuthBody) => async (dispatch: Dispatch) => {
  dispatch(actionCreator.request(LOGIN))
  try {
    const {
      data: { token },
    } = await axiosInstance.post<AuthResponse>(`/users/login/`, user)

    localStorage.setItem("access_token", token)
    dispatch(actionCreator.success(LOGIN, { token }))
  } catch (error) {
    dispatch(actionCreator.failure(LOGIN, error))
    addNotificationMessage({
      message: error.response.data.message,
      level: "error",
      title: "Error!",
    })(dispatch)
  }
}

export const register = (user: AuthBody) => async (dispatch: Dispatch) => {
  dispatch(actionCreator.request(REGISTER))
  try {
    const { data } = await axiosInstance.post<User>(`/users/register`, {
      ...user,
      role: "USER",
    })

    const token = btoa(`${data.username}:${data.password}`)
    localStorage.setItem("access_token", token)
    dispatch(actionCreator.success(REGISTER, { user: data, token }))
  } catch (error) {
    dispatch(actionCreator.failure(REGISTER, error))
    addNotificationMessage({
      message: error.response.data.message,
      level: "error",
      title: "Error!",
    })(dispatch)
  }
}
