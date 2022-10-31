import { UPDATE_PROFILE_ATTEMPT, UPDATE_PROFILE_FAILED, UPDATE_PROFILE_SUCCESS } from '../../../../actions/v2/account/updateProfileAction'

const initialState =
{
    isLoading: false,
    data: false,
    errorMessage: false
}

const updateProfileReducer = (state = initialState, action) =>
{
    switch(action.type)
    {
        case UPDATE_PROFILE_ATTEMPT:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case UPDATE_PROFILE_FAILED:
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

export default updateProfileReducer