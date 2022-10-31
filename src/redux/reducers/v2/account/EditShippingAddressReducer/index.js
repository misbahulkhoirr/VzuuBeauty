import { EDIT_SHIPPING_ADDRESS_ATTEMPT, EDIT_SHIPPING_ADDRESS_SUCCESS, EDIT_SHIPPING_ADDRESS_FAILED } from '../../../../actions/v2/account/EditShippingAddressAction'

const initialState =
{
    isLoading: false,
    data: false,
    errorMessage: false
}

const EditShippingAddressReducer = (state = initialState, action) =>
{
    switch(action.type)
    {
        case EDIT_SHIPPING_ADDRESS_ATTEMPT:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case EDIT_SHIPPING_ADDRESS_SUCCESS:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case EDIT_SHIPPING_ADDRESS_FAILED:
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

export default EditShippingAddressReducer