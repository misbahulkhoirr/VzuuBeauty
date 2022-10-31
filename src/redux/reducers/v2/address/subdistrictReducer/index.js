import { SUBDISTRICT_ATTEMPT, SUBDISTRICT_FAILED, SUBDISTRICT_SUCCESS } from '../../../../actions/v2/address/subdistrictAction'

const initialState =
{
    isLoading: false,
    data: false,
    errorMessage: false
}

const subdistrictReducer = (state = initialState, action) =>
{
    switch(action.type)
    {
        case SUBDISTRICT_ATTEMPT:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case SUBDISTRICT_SUCCESS:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case SUBDISTRICT_FAILED:
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

export default subdistrictReducer