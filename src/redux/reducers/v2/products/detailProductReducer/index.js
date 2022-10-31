import { DETAIL_PRODUCT_ATTEMPT, DETAIL_PRODUCT_FAILED, DETAIL_PRODUCT_SUCCESS } from '../../../../actions/v2/products/DetailProductAction'

const initialState =
{
    isLoading: false,
    data: false,
    errorMessage: false
}

const detailProductReducer = (state = initialState, action) =>
{
    switch(action.type)
    {
        case DETAIL_PRODUCT_ATTEMPT:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case DETAIL_PRODUCT_SUCCESS:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case DETAIL_PRODUCT_FAILED:
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

export default detailProductReducer