import { User } from "./User"
import { OrderDetails } from "./OrderDetails"
import { Action } from "redux"

export type Order = {
  id: number
  total: number
  orderDetails: OrderDetails[]
  user: User
}

type OrdersForUserPayload = {
  orders: Order[]
}

export type OrderAction = Action & {
  payload: OrdersForUserPayload
}
