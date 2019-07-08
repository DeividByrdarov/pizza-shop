import { Action } from "redux";
import { User } from "./User";

export type LoginPayload = {
  user: User
  token: string
}

export type AuthAction = Action & {
  payload: LoginPayload
}