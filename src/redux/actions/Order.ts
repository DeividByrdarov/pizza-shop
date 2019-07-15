import { createRequestTypes, asyncAction } from "helpers/actionHelpers"
import { Product } from "types/Product"
import { clearCart } from "./Cart"
import { Order } from "types/Order"
import { addNotificationMessage } from "./Notification"

export const CREATE_ORDER = createRequestTypes("CREATE_ORDER")
export const GET_USER_ORDERS = createRequestTypes("GET_USER_ORDERS")

export const createOrder = (order: any) => {
  const body: Order = {
    ...order,
    orderDetails: order.items.map((item: Product) => ({
      quantity: item.quantity,
      product: item,
    })),
  }

  return asyncAction(
    CREATE_ORDER,
    ["post", `/api/orders/`, body],
    (_, dispatch) => {
      clearCart()(dispatch)
      addNotificationMessage({
        title: "Successfully created order! :)",
        level: "success",
      })(dispatch)
    }
  )
}

export const getOrdersForUser = (user_id: number) =>
  asyncAction(GET_USER_ORDERS, ["get", `/api/users/${user_id}/orders/`])
