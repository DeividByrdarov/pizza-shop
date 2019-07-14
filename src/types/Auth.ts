import { Action } from "redux"
import { User } from "./User"

export type LoginPayload = User

export type AuthAction = Action & {
  payload: LoginPayload
}
