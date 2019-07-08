import { Dispatch } from "redux"

import { createRequestTypes, actionCreator } from "helpers/actionHelpers"
import axiosInstance from "redux/axiosInstance"
import { addNotificationMessage } from "./Notification"
import { Product } from "types/Product"

export const GET_PRODUCTS = createRequestTypes("GET_PRODUCTS")

export const getProducts = () => async (dispatch: Dispatch) => {
  dispatch(actionCreator.request(GET_PRODUCTS))
  try {
    const { data: products } = await axiosInstance.get<Product[]>(`/products/`)
    dispatch(actionCreator.success(GET_PRODUCTS, products))
  } catch (error) {
    dispatch(actionCreator.failure(GET_PRODUCTS, error))
    addNotificationMessage({
      message: error.response.data.message,
      level: "error",
      title: "Error!",
    })(dispatch)
  }
}
