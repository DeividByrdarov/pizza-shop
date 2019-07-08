import React, { useRef, useEffect } from "react"
import { connect } from "react-redux"
import NotificationSystem, { Style } from "react-notification-system"

import { getNotificationReducer } from "redux/selectors"
import { AppState } from "redux/reducers"

const mapStateToProps = (state: AppState) => ({
  notification: getNotificationReducer(state),
})

type Props = ReturnType<typeof mapStateToProps> & {}

const style: Style = {
  NotificationItem: {
    DefaultStyle: {
      margin: "20px 10px",
    },
  },
  MessageWrapper: {
    DefaultStyle: {
      margin: 0,
      padding: 0,
      fontSize: "19px",
    },
  },
  Title: {
    DefaultStyle: {
      fontSize: "17px",
      margin: "0 0 10px 0",
      padding: 0,
      fontWeight: "bold",
    },
  },
}

const Notifications: React.SFC<Props> = ({ notification }) => {
  const notificationSystem = useRef<NotificationSystem.System>(null)

  useEffect(() => {
    if (notification.level) {
      notificationSystem.current!.addNotification({
        ...notification,
        position: "tr",
        autoDismiss: 4,
      })
    }
  }, [notification])

  return <NotificationSystem ref={notificationSystem} style={style} />
}

export default connect(mapStateToProps)(Notifications)
