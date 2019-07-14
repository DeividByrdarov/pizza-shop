import { LOGIN, LOGOUT, REGISTER } from "redux/actions/Auth"
import { AuthAction } from "types/Auth"
import { User } from "types/User"
import { Action } from "redux"

type State = {
  user: User | {}
  isLoggedIn: boolean
}

const initialState: State = {
  user: {},
  isLoggedIn: false,
}

const authReducer = (state = initialState, incomingAction: Action) => {
  const action = incomingAction as AuthAction

  switch (action.type) {
    case LOGOUT.SUCCESS:
      return {
        ...state,
        user: {},
        token: "",
        isLoggedIn: false,
      }
    case LOGIN.SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
      }
    case REGISTER.SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
      }
    default:
      return state
  }
}

export default authReducer
