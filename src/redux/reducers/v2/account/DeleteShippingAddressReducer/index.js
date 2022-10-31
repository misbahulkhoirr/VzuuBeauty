import { DELETE_SHIPPING_ADDRESS_ATTEMPT, DELETE_SHIPPING_ADDRESS_FAILED, DELETE_SHIPPING_ADDRESS_SUCCESS } from '../../../../actions/v2/account/DeleteShippingAddressAction'

const initialState =
{
    isLoading: false,
    data: false,
    errorMessage: false
}

const DeleteShippingAddressReducer = (state = initialState, action) =>
{
    switch(action.type)
    {
        case DELETE_SHIPPING_ADDRESS_ATTEMPT:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case DELETE_SHIPPING_ADDRESS_SUCCESS:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case DELETE_SHIPPING_ADDRESS_FAILED:
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

export default DeleteShippingAddressReducer