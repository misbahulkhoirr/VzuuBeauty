import { CART_REMOVE_ATTEMPT, CART_REMOVE_FAILED, CART_REMOVE_SUCCESS } from '../../../../actions/v2/cart/cartRemoveAction'

const initialState =
{
    isLoading: false,
    data: false,
    errorMessage: false
}

const cartRemoveReducer = (state = initialState, action) =>
{
    // console.log('reducer', action.payload)
    switch(action.type)
    {
        case CART_REMOVE_ATTEMPT:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case CART_REMOVE_SUCCESS:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case CART_REMOVE_FAILED:
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

export default cartRemoveReducer