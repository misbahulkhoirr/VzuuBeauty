import { ORDER_DETAIL_ATTEMPT, ORDER_DETAIL_SUCCESS, ORDER_DETAIL_FAILED } from '../../../../actions/v2/transaction/OrderDetailAction'

const initialState =
{
    isLoading: false,
    data: false,
    errorMessage: false
}

const OrderDetailReducer = (state = initialState, action) =>
{
    switch(action.type)
    {
        case ORDER_DETAIL_ATTEMPT:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case ORDER_DETAIL_SUCCESS:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case ORDER_DETAIL_FAILED:
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

export default OrderDetailReducer