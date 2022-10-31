const initialState =
{
    CartCount: 0,
}

const cartGlobalReducer = (state = initialState, action) =>
{
    // console.log('action.payload',action.payload)
    switch(action.type)
    {
        case "CART_COUNT":
            return {
                ...state,
                CartCount: action.payload,
            }
            break
        default:
            return state
    }
}

export default cartGlobalReducer