import { LOGIN, LOGOUT, REGISTER } from "redux/actions/Auth"
import { AuthAction } from "types/Auth"
import { User } from "types/User"

type State = {
  user: User | {}
  token: string
  isLoggedIn: boolean
}

const initialState: State = {
  user: {},
  token: "",
  isLoggedIn: false,
}

const authReducer = (state = initialState, action: AuthAction) => {
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
        ...action.payload,
        isLoggedIn: true,
      }
    case REGISTER.SUCCESS:
      return {
        ...state,
        ...action.payload,
        isLoggedIn: true,
      }
    default:
      return state
  }
}

export default authReducer
