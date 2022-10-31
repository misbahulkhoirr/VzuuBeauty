import { CART_ATTEMPT, CART_FAILED, CART_SUCCESS } from '../../../../actions/v2/cart/cartAction'

const initialState =
{
    isLoading: false,
    data: false,
    errorMessage: false
}

const cartReducer = (state = initialState, action) =>
{
    // console.log('data', action.payload && action.payload.data)
    switch(action.type)
    {
        case CART_ATTEMPT:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case CART_SUCCESS:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case CART_FAILED:
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

export default cartReducer