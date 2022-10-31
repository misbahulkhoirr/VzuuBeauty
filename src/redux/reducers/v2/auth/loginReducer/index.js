import { LOGIN_ATTEMPT, LOGIN_FAILED, LOGIN_SUCCESS } from '../../../../actions/v2/auth/loginAction'

const initialState =
{
    isLoading: false,
    data: false,
    errorMessage: false
}

const loginReducer = (state = initialState, action) =>
{
    switch(action.type)
    {
        case LOGIN_ATTEMPT:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case LOGIN_FAILED:
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

export default loginReducer