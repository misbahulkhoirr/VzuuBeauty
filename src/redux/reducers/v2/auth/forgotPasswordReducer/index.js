import {
    FORGOT_PASSWORD_ATTEMPT,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILED
} from '../../../../actions/v2/auth/forgotPasswordAction'

const initialState = {
    isLoading: false,
    data: false,
    errorMessage: false
}

const forgotPasswordReducer = (state = initialState, action) => {
    switch (action.type) {
        case FORGOT_PASSWORD_ATTEMPT:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case FORGOT_PASSWORD_FAILED:
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

export default forgotPasswordReducer
