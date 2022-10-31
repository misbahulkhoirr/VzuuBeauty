import {
    VERIFY_OTP_ATTEMPT,
    VERIFY_OTP_SUCCESS,
    VERIFY_OTP_FAILED
} from '../../../../actions/v2/auth/verifyOTPAction'

const initialState = {
    isLoading: false,
    data: false,
    errorMessage: false
}

const verifyOTPReducer = (state = initialState, action) => {
    switch (action.type) {
        case VERIFY_OTP_ATTEMPT:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case VERIFY_OTP_SUCCESS:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case VERIFY_OTP_FAILED:
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

export default verifyOTPReducer
