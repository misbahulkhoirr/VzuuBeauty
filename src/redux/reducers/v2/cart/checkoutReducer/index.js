import { CHECKOUT_ATTEMPT, CHECKOUT_FAILED, CHECKOUT_SUCCESS } from '../../../../actions/v2/cart/checkoutAction'

const initialState =
{
    isLoading: false,
    data: false,
    errorMessage: false
}

const checkoutReducer = (state = initialState, action) =>
{
    switch(action.type)
    {
        case CHECKOUT_ATTEMPT:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case CHECKOUT_SUCCESS:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case CHECKOUT_FAILED:
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

export default checkoutReducer