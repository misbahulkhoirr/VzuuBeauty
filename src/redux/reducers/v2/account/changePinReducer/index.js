import {
    CHANGE_PIN_ATTEMPT,
    CHANGE_PIN_FAILED,
    CHANGE_PIN_SUCCESS
} from '../../../../actions/v2/account/changePinAction'

const initialState = {
    isLoading: false,
    data: false,
    errorMessage: false
}

const changePinReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_PIN_ATTEMPT:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case CHANGE_PIN_SUCCESS:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case CHANGE_PIN_FAILED:
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

export default changePinReducer
