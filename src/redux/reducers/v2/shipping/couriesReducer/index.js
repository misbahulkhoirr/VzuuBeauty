import { COURIES_ATTEMPT, COURIES_FAILED, COURIES_SUCCESS } from '../../../../actions/v2/shipping/couriesAction'

const initialState =
{
    isLoading: false,
    data: false,
    errorMessage: false
}

const couriesReducer = (state = initialState, action) =>
{
    switch(action.type)
    {
        case COURIES_ATTEMPT:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case COURIES_SUCCESS:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case COURIES_FAILED:
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

export default couriesReducer