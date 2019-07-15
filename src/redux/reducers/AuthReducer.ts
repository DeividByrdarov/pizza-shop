import { LOGIN, LOGOUT, REGISTER } from "redux/actions/Auth"
import { AuthAction } from "types/Auth"
import { User } from "types/User"
import { Action } from "redux"

type State = {
  user: User | null
  isLoggedIn: boolean
}

const initialState: State = {
  user: null,
  isLoggedIn: false,
}

const authReducer = (state = initialState, incomingAction: Action) => {
  const action = incomingAction as AuthAction

  switch (action.type) {
    case LOGOUT.SUCCESS:
      return {
        ...state,
        user: null,
        isLoggedIn: false,
      }
    case LOGIN.SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLoggedIn: !!action.payload,
      }
    case REGISTER.SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLoggedIn: !!action.payload,
      }
    default:
      return state
  }
}

export default authReducer
