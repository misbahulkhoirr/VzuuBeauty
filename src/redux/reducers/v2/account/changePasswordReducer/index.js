import {
    CHANGE_PASSWORD_ATTEMPT,
    CHANGE_PASSWORD_FAILED,
    CHANGE_PASSWORD_SUCCESS
} from '../../../../actions/v2/account/changePasswordAction'

const initialState = {
    isLoading: false,
    data: false,
    errorMessage: false
}

const changePasswordReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_PASSWORD_ATTEMPT:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case CHANGE_PASSWORD_FAILED:
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

export default changePasswordReducer
