import { AxiosResponse } from "axios"
import { Dispatch } from "redux"
import { addNotificationMessage } from "redux/actions/Notification"

interface RequestType {
  REQUEST: string
  SUCCESS: string
  FAILURE: string
}

export const asyncAction = <P>(
  type: RequestType,
  action: Promise<AxiosResponse<P>>,
  extraCallback?: () => void
) => async (dispatch: Dispatch) => {
  dispatch(actionCreator.request(type))
  try {
    const payload = await action
    dispatch(actionCreator.success(type, payload))
    if (extraCallback) extraCallback()
  } catch (error) {
    dispatch(actionCreator.failure(type, error))
    addNotificationMessage({
      message: error.response.data.message,
      level: "error",
      title: "Error!",
    })(dispatch)
  }
}

export const createRequestTypes = (type: string): RequestType => ({
  REQUEST: `${type}_REQUEST`,
  SUCCESS: `${type}_SUCCESS`,
  FAILURE: `${type}_FAILURE`,
})

export const actionCreator = {
  request: (type: RequestType) => ({ type: type.REQUEST }),
  success: (type: RequestType, payload?: any) => ({
    type: type.SUCCESS,
    payload,
  }),
  failure: (type: RequestType, error: Error) => ({
    type: type.FAILURE,
    error,
  }),
}
