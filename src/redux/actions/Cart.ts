import { Dispatch } from "redux"

import { createRequestTypes, actionCreator } from "helpers/actionHelpers"
import { Product } from "types/Product"

export const ADD_TO_CART = createRequestTypes("ADD_TO_CART")
export const REMOVE_FROM_CART = createRequestTypes("REMOVE_FROM_CART")
export const CLEAR_CART = createRequestTypes("CLEAR_CART")

export const addToCart = (product: Product) => (dispatch: Dispatch) => {
  dispatch(actionCreator.success(ADD_TO_CART, product))
}

export const removeFromCart = (id: number) => (dispatch: Dispatch) => {
  dispatch(actionCreator.success(REMOVE_FROM_CART, id))
}

export const clearCart = () => (dispatch: Dispatch) => {
  dispatch(actionCreator.success(CLEAR_CART))
}
