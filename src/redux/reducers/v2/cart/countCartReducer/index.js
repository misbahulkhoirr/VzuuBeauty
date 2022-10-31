import { COUNT_CART_ATTEMPT, COUNT_CART_FAILED, COUNT_CART_SUCCESS } from '../../../../actions/v2/cart/countCartAction'

const initialState =
{
    isLoading: false,
    data: false,
    errorMessage: false
}

const countCartReducer = (state = initialState, action) =>
{
    switch(action.type)
    {
        case COUNT_CART_ATTEMPT:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case COUNT_CART_SUCCESS:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case COUNT_CART_FAILED:
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

export default countCartReducer