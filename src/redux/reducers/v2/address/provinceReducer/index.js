import { PROVINCE_ATTEMPT, PROVINCE_FAILED, PROVINCE_SUCCESS } from '../../../../actions/v2/address/provinceAction'

const initialState =
{
    isLoading: false,
    data: false,
    errorMessage: false
}

const provinceReducer = (state = initialState, action) =>
{
    switch(action.type)
    {
        case PROVINCE_ATTEMPT:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case PROVINCE_SUCCESS:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case PROVINCE_FAILED:
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

export default provinceReducer