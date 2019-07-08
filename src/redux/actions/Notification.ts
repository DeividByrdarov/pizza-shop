import { Dispatch } from "redux"

import { Notification } from "types/Notification"

export const ADD_NOTIFICATION = "ADD_NOTIFICATION"

export const addNotificationMessage = (notification: Notification) => (
  dispatch: Dispatch
) => {
  dispatch({ type: ADD_NOTIFICATION, payload: notification })
}
