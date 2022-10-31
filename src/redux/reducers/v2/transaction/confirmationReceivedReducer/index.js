import {
    CONFIRMATION_RECEIVED_SUCCESS,
    CONFIRMATION_RECEIVED_FAILED
} from '../../../../actions/v2/transaction/confirmationReceivedAction'

const initialState = {
    isLoading: false,
    data: false,
    errorMessage: false
}

const confirmationReceivedReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CONFIRMATION_RECEIVED_ATTEMPT':
            return {
                ...state,
                isLoading: true,
                data: false,
                errorMessage: false
            }
            break
        case CONFIRMATION_RECEIVED_SUCCESS:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case CONFIRMATION_RECEIVED_FAILED:
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

export default confirmationReceivedReducer
