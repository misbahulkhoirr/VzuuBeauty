import { PROFILE_ATTEMPT, PROFILE_FAILED, PROFILE_SUCCESS } from '../../../../actions/v2/account/profileAction'

const initialState =
{
    isLoading: false,
    data: false,
    errorMessage: false
}

const profileReducer = (state = initialState, action) =>
{
    switch(action.type)
    {
        case PROFILE_ATTEMPT:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case PROFILE_SUCCESS:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case PROFILE_FAILED:
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

export default profileReducer