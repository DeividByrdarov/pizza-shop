import { AppState } from "./reducers"

export const getAuthReducer = (state: AppState) => state.authReducer
export const getProductsReducer = (state: AppState) => state.productsReducer
export const getNotificationReducer = (state: AppState) =>
  state.notificationReducer
