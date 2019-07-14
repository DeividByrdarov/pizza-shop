import { ADD_NOTIFICATION } from "redux/actions/Notification"
import { Notification, NotificationAction } from "types/Notification"
import { Action } from "redux"

const initialState: Notification = {
  title: "",
  level: undefined,
}

const notificationReducer = (state = initialState, incommingAction: Action) => {
  const action = incommingAction as NotificationAction

  switch (action.type) {
    case ADD_NOTIFICATION:
      return action.payload
    default:
      return state
  }
}

export default notificationReducer
