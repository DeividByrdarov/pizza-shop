import { Dispatch } from "redux"
import {
  createRequestTypes,
  actionCreator,
  asyncAction,
} from "helpers/actionHelpers"
import { User } from "types/User"
import { clearCart } from "./Cart"
import { History } from "history"

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
  clearCart()(dispatch)
}

export const login = (user: AuthBody, history: History<any>) =>
  asyncAction<LoginResponse>(LOGIN, ["post", `/api/users/login/`, user], () =>
    history.push("/")
  )

export const register = (user: AuthBody, history: History<any>) =>
  asyncAction<User>(
    REGISTER,
    ["post", `/api/users/register/`, { ...user, role: "USER" }],
    () => history.push("/")
  )
