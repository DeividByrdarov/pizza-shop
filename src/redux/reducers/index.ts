import { combineReducers } from "redux"

import authReducer from "./AuthReducer"
import cartReducer from "./CartReducer"
import productsReducer from "./ProductsReducer"
import notificationReducer from "./NotificationReduceer"

const rootReducer = combineReducers({
  authReducer,
  cartReducer,
  productsReducer,
  notificationReducer,
})

export default rootReducer

export type AppState = ReturnType<typeof rootReducer>
