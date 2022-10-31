import { TRANSACTIONS_ATTEMPT, TRANSACTIONS_SUCCESS, TRANSACTIONS_FAILED } from '../../../../actions/v2/transaction/transactionsAction'

const initialState =
{
    isLoading: false,
    data: false,
    errorMessage: false
}

const transactionsReducer = (state = initialState, action) =>
{
    switch(action.type)
    {
        case TRANSACTIONS_ATTEMPT:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case TRANSACTIONS_SUCCESS:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case TRANSACTIONS_FAILED:
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

export default transactionsReducer