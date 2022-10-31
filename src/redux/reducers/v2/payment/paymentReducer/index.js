import {
    PAYMENT_ATTEMPT,
    PAYMENT_FAILED,
    PAYMENT_SUCCESS
} from '../../../../actions/v2/payment/paymentAction'

const initialState = {
    isLoading: false,
    data: false,
    errorMessage: false
}

const paymentReducer = (state = initialState, action) => {
    switch (action.type) {
        case PAYMENT_ATTEMPT:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case PAYMENT_SUCCESS:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case PAYMENT_FAILED:
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

export default paymentReducer
