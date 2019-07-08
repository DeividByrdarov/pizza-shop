import { Action } from "redux";

export type Notification = {
  message: string
  level: "error" | "warning" | "info" | "success" | undefined
  title: string
}

export type NotificationAction = Action & {
  payload: Notification
}