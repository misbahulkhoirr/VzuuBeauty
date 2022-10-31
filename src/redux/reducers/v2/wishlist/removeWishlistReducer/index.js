import {
    REMOVE_WISHLIST_ATTEMPT,
    REMOVE_WISHLIST_FAILED,
    REMOVE_WISHLIST_SUCCESS
} from '../../../../actions/v2/wishlist/removeWishlistAction'

const initialState = {
    isLoading: false,
    data: false,
    errorMessage: false
}

const removeWishlistReducer = (state = initialState, action) => {
    switch (action.type) {
        case REMOVE_WISHLIST_ATTEMPT:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case REMOVE_WISHLIST_SUCCESS:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case REMOVE_WISHLIST_FAILED:
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

export default removeWishlistReducer
