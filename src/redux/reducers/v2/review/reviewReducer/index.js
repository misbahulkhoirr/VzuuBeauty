import { REVIEW_PRODUCT_ATTEMPT, REVIEW_PRODUCT_FAILED, REVIEW_PRODUCT_SUCCESS } from '../../../../actions/v2/review/reviewAction'

const initialState =
{
    isLoading: false,
    data: false,
    errorMessage: false
}

const reviewReducer = (state = initialState, action) =>
{
    switch(action.type)
    {
        case REVIEW_PRODUCT_ATTEMPT:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case REVIEW_PRODUCT_SUCCESS:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case REVIEW_PRODUCT_FAILED:
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

export default reviewReducer