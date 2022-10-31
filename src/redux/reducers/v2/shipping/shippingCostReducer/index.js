import { SHIPPING_COST_ATTEMPT, SHIPPING_COST_FAILED, SHIPPING_COST_SUCCESS } from '../../../../actions/v2/shipping/shippingCostAction'

const initialState =
{
    isLoading: false,
    data: false,
    errorMessage: false
}

const shippingCostReducer = (state = initialState, action) =>
{
    switch(action.type)
    {
        case SHIPPING_COST_ATTEMPT:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case SHIPPING_COST_SUCCESS:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case SHIPPING_COST_FAILED:
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

export default shippingCostReducer