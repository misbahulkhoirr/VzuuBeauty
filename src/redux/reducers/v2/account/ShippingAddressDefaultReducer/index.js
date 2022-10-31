import { SHIPPING_ADDRESS_DEFAULT_ATTEMPT, SHIPPING_ADDRESS_DEFAULT_SUCCESS, SHIPPING_ADDRESS_DEFAULT_FAILED } from '../../../../actions/v2/account/ShippingAddressDefaultAction'

const initialState =
{
    isLoading: false,
    // Default:{},
    data: false,
    errorMessage: false
}

const ShippingAddressDefaultReducer = (state = initialState, action) =>
{
    switch(action.type)
    {
        case SHIPPING_ADDRESS_DEFAULT_ATTEMPT:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case SHIPPING_ADDRESS_DEFAULT_SUCCESS:
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
        case SHIPPING_ADDRESS_DEFAULT_FAILED:
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

export default ShippingAddressDefaultReducer