import { combineReducers } from 'redux'

// v2
import {
    loginReducer as loginReducer_v2,
    registerReducer as registerReducer_v2,
    logoutReducer as logoutReducer_v2,
    loginGoogleReducer as loginGoogleReducer_v2,
    resetPasswordReducer as resetPasswordReducer_v2,
    forgotPasswordReducer as forgotPasswordReducer_v2,
    verifyOTPReducer as verifyOTPReducer_v2,
    activasiAccountReducer as activasiAccountReducer_v2,
    resendOTPRegistReducer as resendOTPRegistReducer_v2
} from './v2/auth'
import {
    provinceReducer as provinceReducer_v2,
    cityReducer as cityReducer_v2,
    subdistrictReducer as subdistrictReducer_v2
} from './v2/address'
import { homeReducer } from './v2/home'
import {
    detailProductReducer,
    ProductReducer,
    reviewProductReducer
} from './v2/products'
import {
    addWishlistReducer,
    wishlistReducer,
    removeWishlistReducer
} from './v2/wishlist'
import {
    ShippingAddressReducer,
    ShippingAddressDefaultReducer,
    CreateShippingAddressReducer,
    DeleteShippingAddressReducer,
    EditShippingAddressReducer,
    profileReducer,
    updateProfileReducer,
    changePasswordReducer,
    changePinReducer,
    forgotPinReducer
} from './v2/account'
import {
    transactionsReducer,
    OrderDetailReducer,
    confirmationReceivedReducer
} from './v2/transaction'
import {
    cartReducer as cartReducer_v2,
    cartAddReducer as cartAddReducer_v2,
    cartRemoveReducer as cartRemoveReducer_v2,
    countCartReducer,
    checkoutReducer as checkoutReducer_v2,
    cartGlobalReducer
} from './v2/cart'
import { couriesReducer, shippingCostReducer } from './v2/shipping'
import {
    paymentReducer as paymentReducer_V2,
    topupReducer,
    topuplistReducer,
    paymentwalletReducer
} from './v2/payment'
import { cekResiReducer } from './v2/cekresi'
import { reviewReducer, createreviewReducer } from './v2/review'
import globalReducer from './v2/globalReducer'

const reducers = combineReducers({
    // v2
    detailProductReducer,
    addWishlistReducer,
    wishlistReducer,
    removeWishlistReducer,
    homeReducer,
    loginReducer_v2,
    registerReducer_v2,
    logoutReducer_v2,
    loginGoogleReducer_v2,
    forgotPasswordReducer_v2,
    resetPasswordReducer_v2,
    verifyOTPReducer_v2,
    activasiAccountReducer_v2,
    resendOTPRegistReducer_v2,
    profileReducer,
    updateProfileReducer,
    changePasswordReducer,
    changePinReducer,
    forgotPinReducer,
    ProductReducer,
    reviewProductReducer,
    ShippingAddressReducer,
    ShippingAddressDefaultReducer,
    CreateShippingAddressReducer,
    DeleteShippingAddressReducer,
    EditShippingAddressReducer,
    transactionsReducer,
    OrderDetailReducer,
    confirmationReceivedReducer,
    provinceReducer_v2,
    cityReducer_v2,
    subdistrictReducer_v2,
    cartReducer_v2,
    countCartReducer,
    cartAddReducer_v2,
    cartRemoveReducer_v2,
    couriesReducer,
    shippingCostReducer,
    checkoutReducer_v2,
    cartGlobalReducer,
    paymentReducer_V2,
    cekResiReducer,
    reviewReducer,
    createreviewReducer,
    topupReducer,
    topuplistReducer,
    paymentwalletReducer,
    globalReducer
})

export default reducers
