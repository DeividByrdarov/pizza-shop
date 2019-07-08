import { ADD_NOTIFICATION } from "redux/actions/Notification";
import { Notification, NotificationAction } from "types/Notification";

const initialState: Notification = {
  message: '',
  title: '',
  level: undefined,
}

const notificationReducer = (state = initialState, action: NotificationAction) => {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return action.payload
    default:
      return state
  }
}

export default notificationReducer