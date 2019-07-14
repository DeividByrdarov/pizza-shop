import { createStore, applyMiddleware } from "redux"
import { persistStore, persistReducer } from "redux-persist"
import thunk from "redux-thunk"
import storage from "redux-persist/lib/storage"
import { composeWithDevTools } from "redux-devtools-extension"

import rootReducer from "redux/reducers"

const pReducer = persistReducer(
  {
    key: "root",
    storage,
    whitelist: ["authReducer", "cartReducer"],
  },
  rootReducer
)

export const store = createStore(
  pReducer,
  composeWithDevTools(applyMiddleware(thunk))
)
export const persistor = persistStore(store)
