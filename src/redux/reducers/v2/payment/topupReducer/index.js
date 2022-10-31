import {
    TOPUP_ATTEMPT,
    TOPUP_FAILED,
    TOPUP_SUCCESS
} from '../../../../actions/v2/payment/topupAction'

const initialState = {
    isLoading: false,
    data: false,
    errorMessage: false
}

const topupReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOPUP_ATTEMPT:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case TOPUP_SUCCESS:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case TOPUP_FAILED:
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

export default topupReducer
