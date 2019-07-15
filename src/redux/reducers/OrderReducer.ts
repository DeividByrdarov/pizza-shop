import { Action } from "redux"
import { OrderAction, Order } from "types/Order"
import { GET_USER_ORDERS } from "redux/actions/Order"

type State = {
  orders: Order[]
}

const initialState: State = {
  orders: [],
}

const orderReducer = (state = initialState, incommingAction: Action) => {
  const action = incommingAction as OrderAction
  switch (action.type) {
    case GET_USER_ORDERS.SUCCESS:
      return {
        ...state,
        orders: action.payload.orders,
      }
    default:
      return state
  }
}

export default orderReducer
