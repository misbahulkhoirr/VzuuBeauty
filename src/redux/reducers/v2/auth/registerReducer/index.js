import { REGISTER_ATTEMPT, REGISTER_FAILED, REGISTER_SUCCESS } from '../../../../actions/v2/auth/registerAction'

const initialState =
{
    isLoading: false,
    data: false,
    errorMessage: false
}

const registerReducer = (state = initialState, action) =>
{
    switch(action.type)
    {
        case REGISTER_ATTEMPT:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case REGISTER_SUCCESS:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case REGISTER_FAILED:
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

export default registerReducer