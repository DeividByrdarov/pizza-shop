import React from "react"
import { connect } from "react-redux"
import { Typography, Button } from "@material-ui/core"

import ProductDisplay from "components/ProductDisplay"
import * as NotificationActions from "redux/actions/Notification"
import { AppState } from "redux/reducers"
import { getAuthReducer } from "redux/selectors"
import { Notification } from "types/Notification"

const mapStateToProps = (state: AppState) => ({
  isLoggedIn: getAuthReducer(state).isLoggedIn,
})

const mapDispatchToProps = {
  addNotificationMessage: NotificationActions.addNotificationMessage,
}

type Props = ReturnType<typeof mapStateToProps> & {
  addNotificationMessage: (notification: Notification) => void
}

const Home: React.SFC<Props> = ({ isLoggedIn, addNotificationMessage }) => {
  return (
    <div>
      {isLoggedIn ? (
        <ProductDisplay />
      ) : (
        <>
          <Typography variant="h5">
            Login to see products and create orders
          </Typography>
          <Button
            onClick={() =>
              addNotificationMessage({
                level: "error",
                title: "Test",
              })
            }
          >
            Click Me!
          </Button>
        </>
      )}
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
