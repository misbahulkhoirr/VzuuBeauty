import {
    PRODUCT_ATTEMPT,
    PRODUCT_SUCCESS,
    PRODUCT_FAILED
} from '../../../../actions/v2/products/productAction'

const initialState = {
    isLoading: false,
    data: [],
    errorMessage: false
}

const ProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCT_ATTEMPT:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case PRODUCT_SUCCESS:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: [...state.data, ...action.payload.data],
                errorMessage: action.payload.errorMessage
            }
            break
        case PRODUCT_FAILED:
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

export default ProductReducer
