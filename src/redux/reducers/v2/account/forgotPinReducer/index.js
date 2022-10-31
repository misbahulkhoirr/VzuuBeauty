import {
    FORGOT_PIN_ATTEMPT,
    FORGOT_PIN_FAILED,
    FORGOT_PIN_SUCCESS
} from '../../../../actions/v2/account/forgotPinAction'

const initialState = {
    isLoading: false,
    data: false,
    errorMessage: false
}

const forgotPinReducer = (state = initialState, action) => {
    switch (action.type) {
        case FORGOT_PIN_ATTEMPT:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case FORGOT_PIN_SUCCESS:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case FORGOT_PIN_FAILED:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
        default:
            return state
    }
}

export default forgotPinReducer
