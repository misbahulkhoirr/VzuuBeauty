import { CITY_ATTEMPT, CITY_FAILED, CITY_SUCCESS } from '../../../../actions/v2/address/cityAction'

const initialState =
{
    isLoading: false,
    data: false,
    errorMessage: false
}

const cityReducer = (state = initialState, action) =>
{
    switch(action.type)
    {
        case CITY_ATTEMPT:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case CITY_SUCCESS:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case CITY_FAILED:
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

export default cityReducer