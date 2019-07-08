import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"

import { store, persistor } from "./store"
import Routes from "./Routes"

import "./styles/bootstrap/bootstrap.min.css"
import "./styles/bootstrap/bootstrap-reboot.min.css"
import "./styles/bootstrap/bootstrap-grid.min.css"
import "./styles/index.scss"

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Routes />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
)
