import {
    RESET_PASSWORD_ATTEMPT,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED
} from '../../../../actions/v2/auth/resetPasswordAction'

const initialState = {
    isLoading: false,
    data: false,
    errorMessage: false
}

const resetPasswordReducer = (state = initialState, action) => {
    switch (action.type) {
        case RESET_PASSWORD_ATTEMPT:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case RESET_PASSWORD_FAILED:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage.data
            }
        default:
            return state
    }
}

export default resetPasswordReducer
