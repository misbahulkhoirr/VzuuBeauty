import { SHIPPING_ADDRESS_ATTEMPT, SHIPPING_ADDRESS_FAILED, SHIPPING_ADDRESS_SUCCESS } from '../../../../actions/v2/account/ShippingAddressAction'

const initialState =
{
    isLoading: false,
    // Default:{},
    data: false,
    errorMessage: false
}

const ShippingAddressReducer = (state = initialState, action) =>
{
    switch(action.type)
    {
        case SHIPPING_ADDRESS_ATTEMPT:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case SHIPPING_ADDRESS_SUCCESS:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                // Default: action.payload && action.payload.data.map((item) => {
                //     if(item.default === 'true'){
                //         return item
                //     }
                // }),
                errorMessage: action.payload.errorMessage
            }
            break
        case SHIPPING_ADDRESS_FAILED:
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

export default ShippingAddressReducer