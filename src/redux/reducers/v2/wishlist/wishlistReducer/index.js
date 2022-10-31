import {
    WISHLIST_ATTEMPT,
    WISHLIST_FAILED,
    WISHLIST_SUCCESS
} from '../../../../actions/v2/wishlist/wishlistAction'

const initialState = {
    isLoading: false,
    data: false,
    errorMessage: false
}

const wishlistReducer = (state = initialState, action) => {
    switch (action.type) {
        case WISHLIST_ATTEMPT:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case WISHLIST_SUCCESS:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case WISHLIST_FAILED:
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

export default wishlistReducer
