import React, { useEffect } from "react"
import { connect } from "react-redux"

import * as OrderActions from "redux/actions/Order"
import { AppState } from "redux/reducers"
import { getAuthReducer, getOrderReducer } from "redux/selectors"
import {
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@material-ui/core"
import { Order } from "types/Order"

const mapStateToProps = (state: AppState) => ({
  user: getAuthReducer(state).user,
  orders: getOrderReducer(state).orders,
})

const mapDispatchToProps = {
  getOrdersForUser: OrderActions.getOrdersForUser,
}

type Props = ReturnType<typeof mapStateToProps> & {
  getOrdersForUser: (user_id: number) => Promise<void>
}

const User: React.SFC<Props> = ({ user, orders, getOrdersForUser }) => {
  useEffect(() => {
    if (user) getOrdersForUser(user.id)
  }, [getOrdersForUser, user])

  if (!user) return <div>loading...</div>

  return (
    <>
      <Typography className="mb-5" variant="h3">
        {user.username}
      </Typography>
      <Typography className="mb-3" variant="h5">
        User orders:
      </Typography>
      {orders.map((order: Order) => (
        <Card className="mb-3" key={order.id}>
          <CardContent>
            <Typography variant="h6">
              Order total: {Number(order.total).toFixed(2)} $
            </Typography>
            <Typography variant="subtitle1">Products</Typography>
            <List>
              {order.orderDetails.map(orderDetails => (
                <ListItem>
                  <ListItemText
                    primary={`Product: ${orderDetails.product.name}`}
                    secondary={`Quantity: ${orderDetails.quantity}`}
                  />
                </ListItem>
              ))}
            </List>
            <Button
              className="d-flex ml-auto"
              variant="outlined"
              color="primary"
            >
              Re-order
            </Button>
          </CardContent>
        </Card>
      ))}
    </>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User)
