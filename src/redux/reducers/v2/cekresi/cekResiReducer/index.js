import {
    CEK_RESI_SUCCESS,
    CEK_RESI_FAILED
} from '../../../../actions/v2/cekresi/cekResiAction'

const initialState = {
    isLoading: false,
    data: false,
    errorMessage: false
}

const cekResiReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CEK_RESI_ATTEMPT':
            return {
                ...state,
                isLoading: true,
                data: false,
                errorMessage: false
            }
            break
        case CEK_RESI_SUCCESS:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                data: action.payload.data,
                errorMessage: action.payload.errorMessage
            }
            break
        case CEK_RESI_FAILED:
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

export default cekResiReducer
