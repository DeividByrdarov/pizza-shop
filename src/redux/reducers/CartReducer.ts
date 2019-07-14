import { Action } from "redux"

import { CartAction } from "types/Cart"
import { Product } from "types/Product"
import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from "redux/actions/Cart"

type State = {
  items: Product[]
}

const initialState: State = {
  items: [],
}

const cartReducer = (state = initialState, incommingAction: Action) => {
  const action = incommingAction as CartAction

  switch (action.type) {
    case CLEAR_CART.SUCCESS:
      return {
        ...state,
        items: [],
      }
    case REMOVE_FROM_CART.SUCCESS:
      return {
        ...state,
        items: state.items.filter(product => product.id !== action.payload),
      }
    case ADD_TO_CART.SUCCESS:
      const payload = action.payload as Product
      const foundItem = state.items.find(product => product.id === payload.id)

      if (foundItem) {
        return {
          ...state,
          items: state.items.map(product => {
            if (product.id === payload.id) {
              product.quantity++
            }
            return product
          }),
        }
      }

      return {
        ...state,
        items: [...state.items, { ...payload, quantity: 1 }],
      }
    default:
      return state
  }
}

export default cartReducer
