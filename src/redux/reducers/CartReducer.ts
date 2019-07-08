import { Action } from "redux"

type State = {
  items: []
}

const initialState: State = {
  items: [],
}

const cartReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default cartReducer
