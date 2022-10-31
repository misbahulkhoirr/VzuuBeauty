import { CREATE_REVIEW_ATTEMPT, CREATE_REVIEW_SUCCESS, CREATE_REVIEW_FAILED } from '../../../../actions/v2/review/reviewAction'

const initialState =
{
    isLoading: false,
    data: false,
    errorMessage: false
}

const createreviewReducer = (state = initialState, action) =>
{
    switch(action.type)
    {
        case CREATE_REVIEW_ATTEMPT:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case CREATE_REVIEW_SUCCESS:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case CREATE_REVIEW_FAILED:
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

export default createreviewReducer