import { HOME_ATTEMPT, HOME_SUCCESS, HOME_FAILED } from '../../../../actions/v2/home/HomeAction'

const initialState =
{
    isLoading: false,
    data: false,
    errorMessage: false
}

const homeReducer = (state = initialState, action) =>
{
    switch(action.type)
    {
        case HOME_ATTEMPT:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case HOME_SUCCESS:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case HOME_FAILED:
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

export default homeReducer