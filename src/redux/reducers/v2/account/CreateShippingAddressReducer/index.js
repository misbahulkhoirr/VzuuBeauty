import { CREATE_SHIPPING_ADDRESS_ATTEMPT, CREATE_SHIPPING_ADDRESS_FAILED, CREATE_SHIPPING_ADDRESS_SUCCESS } from '../../../../actions/v2/account/CreateShippingAddressAction'

const initialState =
{
    isLoading: false,
    data: false,
    errorMessage: false
}

const CreateShippingAddressReducer = (state = initialState, action) =>
{
    switch(action.type)
    {
        case CREATE_SHIPPING_ADDRESS_ATTEMPT:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case CREATE_SHIPPING_ADDRESS_SUCCESS:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case CREATE_SHIPPING_ADDRESS_FAILED:
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

export default CreateShippingAddressReducer