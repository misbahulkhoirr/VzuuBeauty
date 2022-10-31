import {
    PAYMENT_WALLET_ATTEMPT,
    PAYMENT_WALLET_FAILED,
    PAYMENT_WALLET_SUCCESS
} from '../../../../actions/v2/payment/paymentwalletAction'

const initialState = {
    isLoading: false,
    data: false,
    errorMessage: false
}

const paymentwalletReducer = (state = initialState, action) => {
    switch (action.type) {
        case PAYMENT_WALLET_ATTEMPT:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case PAYMENT_WALLET_SUCCESS:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case PAYMENT_WALLET_FAILED:
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

export default paymentwalletReducer
