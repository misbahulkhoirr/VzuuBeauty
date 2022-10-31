import React, { useEffect, useRef, useState } from 'react'
import {
    Animated,
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
    Switch
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import CurrencyFormat from 'react-currency-format'
import {
    CardInfo,
    CourierList,
    CourierTypeList,
    Gap,
    IconChevronForward,
    IconMoney,
    ProductSummary,
    Text,
    TopbarHeader,
    TotalPaySummary,
    ConfirmationPaymentWallet
} from '../../components'
import { Car } from '../../assets'
import { BUCKET_URL, colors, fonts } from '../../utils'
import {
    checkoutAction,
    couriesAction,
    shippingCostAction,
    ShippingAddressDefaultAction,
    paymentAction,
    paymentwalletAction,
    profileAction
} from '../../redux/actions/v2'
import { loading as LoadingPayment } from '../../redux/actions/v2/payment/paymentAction'
import { loading as LoadingPaymentWallet } from '../../redux/actions/v2/payment/paymentwalletAction'
import RBSheet from 'react-native-raw-bottom-sheet'

const Shipment = ({ route, navigation }) => {
    // console.log('router', route)
    const dispatch = useDispatch()
    const { data: cartItems } = useSelector(state => state.cartReducer_v2)
    const { data: defaultAddress } = useSelector(
        state => state.ShippingAddressDefaultReducer
    )
    const { data: courierList } = useSelector(state => state.couriesReducer)
    const { data: checkout } = useSelector(state => state.checkoutReducer_v2)
    const { data: shippingCost } = useSelector(
        state => state.shippingCostReducer
    )
    const { errorMessage } = useSelector(state => state.paymentReducer_V2)
    const errorMessageWallet = useSelector(
        state => state.paymentwalletReducer.errorMessage
    )
    const dataUser = useSelector(state => state.profileReducer.data)

    const changeAddress = route.params && route.params.changeDefaultForm
    const [totalHarga, setTotalHarga] = useState(route.params.subTotal)
    const courierRef = useRef()
    const costRef = useRef()
    const [courier, setCourier] = useState({
        code: '',
        serviceProvider: '',
        image: ''
    })

    const [shipping, setShipping] = useState({
        serviceType: '',
        cost: 0,
        estimation: ''
    })

    const [pin, setPin] = useState('')
    const [messageError, setMessageError] = useState('')

    const [animation, setAnimation] = useState(new Animated.Value(100))

    const paymentForm = {
        id: changeAddress ? changeAddress.id : defaultAddress[0]?.id,
        codeCourier: courier.code,
        costs: shipping.serviceType,
        pin: pin
    }
    // console.log('paymentForm',paymentForm)
    console.log('errorMessageWallet', errorMessageWallet)
    // console.log('costRef.current',costRef.current)
    const pickCourier = courier => {
        setCourier({
            code: courier.code,
            serviceProvider: courier.name,
            image: courier.image
        })

        courierRef.current.close()
        costRef.current.open()
        dispatch(
            shippingCostAction(
                courier.code,
                changeAddress
                    ? changeAddress.city_id
                    : defaultAddress[0]?.city_id
            )
        )
    }
    // console.log('checkout', checkout)
    const pickCourierType = courierType => {
        setShipping({
            serviceType: courierType.service,
            cost: courierType.cost[0].value,
            estimation: courierType.cost[0].etd
        })

        costRef.current.close()
        if (shipping.cost === '') {
            setShipping('cost', '')
        }
    }

    const ValidationPayment = () => {
        console.log('pay', paymentForm)
        // if (pin !== '') {
        dispatch(paymentwalletAction(paymentForm, navigation))
        //     confirmPaymentWallet.current.close()
        // } else {
        //     setMessageError('Password Tidak Boleh Kosong')
        // }
    }

    const onCheckout = () => {
        Animated.spring(animation, {
            toValue: 0,
            duration: 5000,
            friction: 1,
            tension: 20,
            useNativeDriver: true
        }).start()
        if (isEnabled === true) {
            console.log('dataUser', dataUser.pin)
            if (dataUser.pin == true) {
                confirmPaymentWallet.current.open()
            } else {
                navigation.navigate('ChangePin')
            }
        } else {
            dispatch(paymentAction(paymentForm, navigation))
        }
    }

    const hideConfirmationWallet = () => {
        confirmPaymentWallet.current.close()
    }

    useEffect(() => {
        dispatch(LoadingPayment())
        dispatch(LoadingPaymentWallet())
        dispatch(checkoutAction())
        dispatch(couriesAction())
        dispatch(ShippingAddressDefaultAction())
        dispatch(profileAction())
        if (changeAddress) {
            setCourier({
                code: '',
                serviceProvider: '',
                image: ''
            })
            setShipping({
                serviceType: '',
                cost: 0,
                estimation: ''
            })
        }
    }, [changeAddress])
    const [isEnabled, setIsEnabled] = useState(false)
    // console.log('isEnabled',checkout)
    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState)
    }
    const confirmPaymentWallet = useRef()
    return (
        <View style={styles.container}>
            <TopbarHeader
                title="Pengiriman"
                goBack={() => navigation.goBack()}
            />

            <View style={styles.content}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Gap height={15} />
                    <Animated.View
                        style={
                            errorMessageWallet.data &&
                            errorMessageWallet.data.message &&
                            errorMessageWallet.data.message.id
                                ? [
                                      styles.setShipmentWrapper,
                                      styles.error(animation)
                                  ]
                                : styles.setShipmentWrapper
                        }>
                        <View style={styles.wrapperSwitch}>
                            <View style={styles.WrapperIconMoney}>
                                <IconMoney style={styles.IconMoney} filled />
                            </View>
                            <View style={styles.wrapperWallets}>
                                <View>
                                    <Text style={styles.textWallets}>
                                        Wallets
                                    </Text>
                                    <Gap height={3} />
                                    <CurrencyFormat
                                        value={checkout?.datas?.balance}
                                        displayType={'text'}
                                        thousandSeparator={'.'}
                                        decimalSeparator={','}
                                        prefix={'Rp. '}
                                        renderText={value => (
                                            <Text style={styles.nominalWallets}>
                                                {value}
                                            </Text>
                                        )}
                                    />
                                </View>
                                <Switch
                                    trackColor={{
                                        false: '#767577',
                                        true: colors.primary
                                    }}
                                    thumbColor={
                                        isEnabled ? colors.primary : '#f4f3f4'
                                    }
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={toggleSwitch}
                                    value={isEnabled}
                                />
                            </View>
                        </View>
                    </Animated.View>
                    <Gap height={15} />
                    <Animated.View
                        style={
                            errorMessage.data &&
                            errorMessage.data.errors &&
                            errorMessage.data.errors.customer_address_id
                                ? [
                                      styles.setShipmentWrapper,
                                      styles.error(animation)
                                  ]
                                : errorMessage.data &&
                                  errorMessage.data.errors &&
                                  errorMessage.data.errors.customer_address_id
                                ? [
                                      styles.setShipmentWrapper,
                                      styles.error(animation)
                                  ]
                                : null
                            // : styles.setShipmentWrapper
                        }>
                        <CardInfo
                            title={'Alamat Pengiriman'}
                            action={{
                                name: 'Pilih Alamat Lain',
                                onPress: () =>
                                    navigation.navigate('Address', {
                                        fromPage: 'Shipment'
                                    })
                            }}
                            data={{
                                label: changeAddress
                                    ? changeAddress.type
                                    : defaultAddress[0]?.type,
                                textRow1: changeAddress
                                    ? `${changeAddress.name} (${changeAddress.phone})`
                                    : `${defaultAddress[0]?.name} (${defaultAddress[0]?.phone_number})`,
                                textRow2: changeAddress
                                    ? changeAddress.address
                                    : defaultAddress[0]?.address
                            }}
                        />
                    </Animated.View>
                    <Gap height={15} />

                    <ProductSummary
                        title={'Daftar Pembelian'}
                        data={cartItems}
                    />
                    <Gap height={15} />

                    <Animated.View
                        style={
                            errorMessage.data &&
                            errorMessage.data.errors &&
                            errorMessage.data.errors.delivery_courier
                                ? [
                                      styles.setShipmentWrapper,
                                      styles.error(animation)
                                  ]
                                : errorMessage.data &&
                                  errorMessage.data.errors &&
                                  errorMessage.data.errors.delivery_service
                                ? [
                                      styles.setShipmentWrapper,
                                      styles.error(animation)
                                  ]
                                : styles.setShipmentWrapper
                        }>
                        <TouchableOpacity
                            style={styles.setShipmentTouchable}
                            onPress={() => courierRef.current.open()}>
                            {courier && courier.serviceProvider ? (
                                <View style={styles.setShipmentTextWrapper}>
                                    <Image
                                        style={styles.setShipmentCourierImage}
                                        source={{
                                            uri: `${BUCKET_URL}/${courier.image}`
                                        }}
                                    />
                                    <Text style={styles.setShipmentText}>
                                        {courier.serviceProvider}
                                    </Text>
                                </View>
                            ) : (
                                <View style={styles.setShipmentTextWrapper}>
                                    <Image
                                        style={styles.setShipmentImage}
                                        source={Car}
                                    />
                                    <Text style={styles.setShipmentText}>
                                        Pilih Pengiriman
                                    </Text>
                                </View>
                            )}
                            <IconChevronForward size={18} />
                        </TouchableOpacity>

                        {shipping.serviceType && shipping.serviceType ? (
                            <TouchableOpacity
                                style={[
                                    styles.setShipmentTouchable,
                                    styles.borderTop
                                ]}
                                onPress={() => costRef.current.open()}>
                                <View>
                                    <View style={styles.setShipmentTextWrapper}>
                                        <Text style={styles.setShipmentText}>
                                            {shipping.serviceType}
                                        </Text>
                                        <Gap width={5} />
                                        <CurrencyFormat
                                            value={shipping.cost}
                                            displayType={'text'}
                                            thousandSeparator={'.'}
                                            decimalSeparator={','}
                                            prefix={'Rp '}
                                            renderText={value => (
                                                <Text
                                                    style={
                                                        styles.setShipmentText
                                                    }>
                                                    ({value})
                                                </Text>
                                            )}
                                        />
                                    </View>
                                    <Gap height={3} />
                                    <Text style={styles.setShipmentTextLabel}>
                                        Estimasi tiba{' '}
                                        {shipping.estimation === '1-1'
                                            ? 1
                                            : shipping.estimation}{' '}
                                        hari
                                    </Text>
                                </View>
                                <IconChevronForward size={18} />
                            </TouchableOpacity>
                        ) : null}
                    </Animated.View>
                    <Gap height={15} />

                    <TotalPaySummary
                        title={'Ringkasan Belanja'}
                        totalPrice={totalHarga}
                        totalItems={checkout?.datas?.product?.length}
                        shippingCost={shipping.cost ? shipping.cost : '-'}
                        totalBill={
                            shipping.cost ? totalHarga + shipping.cost : '-'
                        }
                        onPress={onCheckout}
                    />
                    <Gap height={15} />

                    <CourierList
                        ref={courierRef}
                        title={'Pilih Kurir'}
                        data={courierList}
                        itemOnPress={courier => pickCourier(courier)}
                    />

                    <CourierTypeList
                        ref={costRef}
                        title={'Pilih Tipe Pengiriman'}
                        data={shippingCost}
                        itemOnPress={courierType =>
                            pickCourierType(courierType)
                        }
                    />
                </ScrollView>
            </View>
            <RBSheet
                ref={confirmPaymentWallet}
                height={300}
                openDuration={150}
                customStyles={{
                    container: {
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        padding: 20
                    }
                }}>
                <ConfirmationPaymentWallet
                    title={'Masukan Pin'}
                    text={`Konfirmasi Pin Anda`}
                    secureTextEntry={true}
                    placeholder={'Masukan Pin'}
                    errorMessage={
                        errorMessageWallet?.data?.errors?.pin?.msg?.id ||
                        errorMessageWallet?.data?.message?.id
                    }
                    onChangeText={value => setPin(value)}
                    onCancel={hideConfirmationWallet}
                    onForgotPin={() => navigation.navigate('CreateNewPin')}
                    onSubmit={ValidationPayment}
                />
            </RBSheet>
        </View>
    )
}

export default Shipment

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.background
    },
    content: { paddingHorizontal: 15, flex: 1 },
    setShipmentWrapper: {
        backgroundColor: colors.white,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.white
    },
    setShipmentTouchable: {
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    setShipmentTextWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    setShipmentText: {
        color: colors.text.label,
        fontFamily: fonts.primary[500],
        fontSize: 12
    },
    setShipmentTextLabel: {
        color: colors.text.label,
        fontFamily: fonts.primary[400],
        fontSize: 12
    },
    setShipmentImage: {
        width: 30,
        height: 30,
        marginRight: 15
    },
    setShipmentCourierImage: {
        width: 80,
        height: 20,
        marginRight: 15
    },
    borderTop: {
        borderTopWidth: 1,
        borderTopColor: colors.border
    },
    error: animation => ({
        borderColor: colors.error,
        transform: [{ translateX: animation }]
    }),
    wrapperSwitch: {
        flexDirection: 'row',
        backgroundColor: colors.white,
        padding: 10,
        borderRadius: 10
    },
    textWallets: {
        fontFamily: fonts.primary[600],
        fontSize: 14
    },
    nominalWallets: {
        fontFamily: fonts.primary[400],
        fontSize: 12
    },
    WrapperIconMoney: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    IconMoney: {
        width: 30,
        height: 30
    },
    wrapperWallets: {
        flex: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})
