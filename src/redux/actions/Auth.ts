import { Dispatch } from "redux"
import {
  createRequestTypes,
  actionCreator,
  asyncAction,
} from "helpers/actionHelpers"
import axiosInstance from "redux/axiosInstance"
import { User } from "types/User"

export type AuthBody = {
  username: string
  password: string
}

export type LoginResponse = {
  token: string
}

export const LOGIN = createRequestTypes("LOGIN")
export const LOGOUT = createRequestTypes("LOGOUT")
export const REGISTER = createRequestTypes("REGISTER")

export const logout = () => async (dispatch: Dispatch) => {
  dispatch(actionCreator.success(LOGOUT))
  localStorage.removeItem("access_token")
}

export const login = (user: AuthBody) =>
  asyncAction<LoginResponse>(
    LOGIN,
    axiosInstance.post(`/users/login/`, user),
    ({ token }) => {
      localStorage.setItem("access_token", token)
    }
  )

export const register = (user: AuthBody) =>
  asyncAction<User>(
    REGISTER,
    axiosInstance.post(`/users/register/`, {
      ...user,
      role: "USER",
    })
  )
