import { User } from "./User"
import { OrderDetails } from "./OrderDetails"

export type Order = {
  total: number
  orderDetails: OrderDetails
  user: User
}
