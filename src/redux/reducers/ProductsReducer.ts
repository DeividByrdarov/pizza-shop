import { Action } from "redux"

import { ProductAction, Product } from "types/Product"
import { GET_PRODUCTS } from "redux/actions/Products"

type State = {
  products: Product[]
}

const initialState: State = {
  products: [],
}

const productsReducer = (state = initialState, incommingAction: Action) => {
  const action = incommingAction as ProductAction

  switch (action.type) {
    case GET_PRODUCTS.SUCCESS:
      return { ...state, products: action.payload.products }
    default:
      return state
  }
}

export default productsReducer
