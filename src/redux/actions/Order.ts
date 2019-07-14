import { createRequestTypes, asyncAction } from "helpers/actionHelpers"
import axiosInstance from "redux/axiosInstance"
import { Product } from "types/Product"
import { OrderDetails } from "types/OrderDetails"
import { clearCart } from "./Cart"

export const CREATE_ORDER = createRequestTypes("CREATE_ORDER")

export const createOrder = (order: any) => {
  const body: OrderDetails = {
    ...order,
    orderDetails: order.items.map((item: Product) => ({
      quantity: item.quantity,
      product: item,
    })),
  }

  return asyncAction(
    CREATE_ORDER,
    axiosInstance.post(`/api/orders/`, body),
    (_, dispatch) => {
      // dispatch(clearCart())
    }
  )
}
