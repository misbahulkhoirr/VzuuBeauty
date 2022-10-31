import {
    ACTIVASI_ACCOUNT_ATTEMPT,
    ACTIVASI_ACCOUNT_SUCCESS,
    ACTIVASI_ACCOUNT_FAILED
} from '../../../../actions/v2/auth/activasiAccountAction'

const initialState = {
    isLoading: false,
    data: false,
    errorMessage: false
}

const activasiAccountReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIVASI_ACCOUNT_ATTEMPT:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case ACTIVASI_ACCOUNT_SUCCESS:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case ACTIVASI_ACCOUNT_FAILED:
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

export default activasiAccountReducer
