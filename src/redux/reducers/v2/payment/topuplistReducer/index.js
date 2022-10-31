import {
    TOPUP_LIST_ATTEMPT,
    TOPUP_LIST_FAILED,
    TOPUP_LIST_SUCCESS
} from '../../../../actions/v2/payment/topuplistAction'

const initialState = {
    isLoading: false,
    data: false,
    errorMessage: false
}

const topuplistReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOPUP_LIST_ATTEMPT:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case TOPUP_LIST_SUCCESS:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case TOPUP_LIST_FAILED:
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

export default topuplistReducer
