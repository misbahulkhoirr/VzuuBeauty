import { LOGIN_GOOGLE_ATTEMPT, LOGIN_GOOGLE_SUCCESS, LOGIN_GOOGLE_FAILED } from '../../../../actions/v2/auth/loginGoogleAction'

const initialState =
{
    isLoading: false,
    data: false,
    errorMessage: false
}

const loginGoogleReducer = (state = initialState, action) =>
{
    switch(action.type)
    {
        case LOGIN_GOOGLE_ATTEMPT:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case LOGIN_GOOGLE_SUCCESS:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case LOGIN_GOOGLE_FAILED:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage.data.errors
            }
        default:
            return state
    }
}

export default loginGoogleReducer