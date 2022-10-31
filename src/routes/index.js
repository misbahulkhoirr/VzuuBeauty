import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { BottomNavigator } from '../components'
import {
    AddressList,
    CartPage,
    ChangeProfilePassword,
    CreateNewAddress,
    CreateNewPassword,
    CreateProductReview,
    EditAddress,
    EditProfile,
    Home,
    LoginGoogle,
    LoginPage,
    Notification,
    PaymentMethod,
    ProductDetail,
    ProductList,
    ProductReview,
    ProfileAccount,
    PointList,
    RegisterPage,
    ResetPassword,
    SearchPage,
    Setting,
    Shipment,
    Splash,
    Topup,
    TopupList,
    Tracking,
    TransactionDetail,
    Transactions,
    VerifyWithOTP,
    Wishlist,
    ChangePin,
    CreateNewPin
} from '../pages'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const MainApp = () => {
    return (
        <Tab.Navigator
            tabBar={props => <BottomNavigator {...props} />}
            screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Beranda" component={Home} />
            <Tab.Screen name="Produk" component={ProductList} />
            <Tab.Screen name="Transaksi" component={Transactions} />
            <Tab.Screen name="Akun" component={ProfileAccount} />
        </Tab.Navigator>
    )
}

const Router = () => {
    return (
        <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ProfileAccount" component={ProfileAccount} />
            <Stack.Screen name="Address" component={AddressList} />
            <Stack.Screen name="CartPage" component={CartPage} />
            <Stack.Screen
                name="ChangeProfilePassword"
                component={ChangeProfilePassword}
            />
            <Stack.Screen
                name="CreateNewAddress"
                component={CreateNewAddress}
            />
            <Stack.Screen
                name="CreateNewPassword"
                component={CreateNewPassword}
            />
            <Stack.Screen
                name="CreateProductReview"
                component={CreateProductReview}
            />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="EditAddress" component={EditAddress} />
            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen name="LoginGoogle" component={LoginGoogle} />
            <Stack.Screen name="MainApp" component={MainApp} />
            <Stack.Screen name="Notification" component={Notification} />
            <Stack.Screen name="ProductDetail" component={ProductDetail} />
            <Stack.Screen name="ProductList" component={ProductList} />
            <Stack.Screen name="ProductReview" component={ProductReview} />
            <Stack.Screen name="Akun" component={ProfileAccount} />
            <Stack.Screen name="PointList" component={PointList} />
            <Stack.Screen name="Register" component={RegisterPage} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
            <Stack.Screen name="Search" component={SearchPage} />
            <Stack.Screen name="Setting" component={Setting} />
            <Stack.Screen name="Shipment" component={Shipment} />
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Topup" component={Topup} />
            <Stack.Screen name="TopupList" component={TopupList} />
            <Stack.Screen name="Tracking" component={Tracking} />
            <Stack.Screen
                name="TransactionDetail"
                component={TransactionDetail}
            />
            <Stack.Screen name="PaymentMethod" component={PaymentMethod} />
            <Stack.Screen name="VerifyWithOTP" component={VerifyWithOTP} />
            <Stack.Screen name="Wishlist" component={Wishlist} />
            <Stack.Screen name="ChangePin" component={ChangePin} />
            <Stack.Screen name="CreateNewPin" component={CreateNewPin} />
        </Stack.Navigator>
    )
}

export default Router
