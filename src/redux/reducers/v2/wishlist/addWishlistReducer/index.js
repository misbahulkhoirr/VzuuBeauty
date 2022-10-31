import {
    ADD_WISHLIST_ATTEMPT,
    ADD_WISHLIST_FAILED,
    ADD_WISHLIST_SUCCESS
} from '../../../../actions/v2/wishlist/addWishlistAction'

const initialState = {
    isLoading: false,
    data: false,
    errorMessage: false
}

const addWishlistReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_WISHLIST_ATTEMPT:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case ADD_WISHLIST_SUCCESS:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case ADD_WISHLIST_FAILED:
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

export default addWishlistReducer
