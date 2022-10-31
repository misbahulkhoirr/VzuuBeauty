import { CART_ADD_SUCCESS, CART_ADD_FAILED } from '../../../../actions/v2/cart/cartAddAction'

const initialState =
{
    isLoading: false,
    data: false,
    errorMessage: false
}

const cartAddReducer = (state = initialState, action) =>
{
    switch(action.type)
    {
        case "CARD_ADD_ATTEMPT":
            return {
                ...state,
                isLoading: true,
                data: false,
                errorMessage: false
            }
            break
        case CART_ADD_SUCCESS:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case CART_ADD_FAILED:
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

export default cartAddReducer