import { AppState } from "./reducers"

export const getAuthReducer = (state: AppState) => state.authReducer
export const getCartReducer = (state: AppState) => state.cartReducer
export const getOrderReducer = (state: AppState) => state.orderReducer
export const getProductsReducer = (state: AppState) => state.productsReducer
export const getNotificationReducer = (state: AppState) =>
  state.notificationReducer
