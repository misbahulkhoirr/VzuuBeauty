import {
    RESEND_OTP_REGIST_ATTEMPT,
    RESEND_OTP_REGIST_SUCCESS,
    RESEND_OTP_REGIST_FAILED
} from '../../../../actions/v2/auth/resendOTPRegistAction'

const initialState = {
    isLoading: false,
    data: false,
    errorMessage: false
}

const resendOTPRegistReducer = (state = initialState, action) => {
    switch (action.type) {
        case RESEND_OTP_REGIST_ATTEMPT:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case RESEND_OTP_REGIST_SUCCESS:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case RESEND_OTP_REGIST_FAILED:
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

export default resendOTPRegistReducer
