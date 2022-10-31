import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {
    ButtonOpacity,
    Gap,
    SelectedProduct,
    TopbarHeader,
    Text
} from '../../components'
import { ILEmptyCart } from '../../assets'
import { colors, fonts, API_URL_V2, showError } from '../../utils'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { loading as loadingPayment } from '../../redux/actions/v2/payment/paymentAction'
import {
    cartAction,
    cartAddAction,
    cartRemoveAction,
    countCartAction
} from '../../redux/actions/v2'
import axios from 'axios'

const CartPage = ({ navigation }) => {
    const dispatch = useDispatch()
    const cartData = useSelector(state => state.cartReducer_v2.data)
    const cartCountReducer = useSelector(state => state.countCartReducer.data)
    const ValidationAddCart = useSelector(state => state.cartAddReducer_v2)

    const [data, setData] = useState('')
    const [cart, setCart] = useState(false)
    const [status, setStatus] = useState('')
    const [count, setCount] = useState(cartCountReducer.total)

    const removeCartAll = async () => {
        const form = { delete_type: 'all' }
        await dispatch(cartRemoveAction(form))

        const FilterData = data.filter(data => data != data)
        setData(FilterData)
        setCount(0)
    }

    const removeCart = async (id, dataremove) => {
        const form = {
            id: id,
            delete_type: 'one'
        }

        await dispatch(cartRemoveAction(form))
        setCount('')
        setStatus('')

        const FilterData = data.filter(data => data.id != id)
        setData(FilterData)
        setCount(count - dataremove.qty)
    }

    const addProduct = async id => {
        const form = { product_id: id }

        await dispatch(cartAddAction(form))
        await dispatch(cartAction())
        setCart(true)
        setData(cartData)
        setStatus('Inc')
    }
    const minProduct = async id => {
        const form = {
            product_id: id,
            count_type: 'subtract_qty'
        }

        await dispatch(cartAddAction(form))
        await dispatch(cartAction())
        setCart(true)
        setData(cartData)
        setStatus('Dec')
    }

    const CallAPI = async () => {
        const accessToken = await AsyncStorage.getItem('access_token')

        axios({
            method: 'GET',
            url: `${API_URL_V2}/cart`,
            headers: { Authorization: 'Bearer ' + JSON.parse(accessToken) }
        })
            .then(response => setData(response.data))
            .catch(error => {})
    }

    const on_Checkout = () => {
        dispatch(loadingPayment())

        let subTotal = 0
        data && data.map(item => (subTotal += item.total))

        navigation.navigate('Shipment', { subTotal })
    }

    useEffect(() => {
        CallAPI()

        dispatch(countCartAction())
        if (cart === true) {
            setCart(false)
        }
        if (status === 'Inc' && count !== 0) {
            if (cartCountReducer.total - count > 0) {
                setCount(count + 1)
                setStatus('')
            }
            if (
                ValidationAddCart.errorMessage ===
                'Request failed with status code 422'
            ) {
                dispatch({ type: 'CARD_ADD_ATTEMPT' })
            }

            if (
                ValidationAddCart.errorMessage ===
                'Request failed with status code 422'
            ) {
                showError('Stok Telah Habis')
            }
        } else if (status === 'Dec') {
            setCount(count - 1)
            setStatus('')
        }

        return () => {
            dispatch({ type: 'CARD_ADD_ATTEMPT' })
        }
    }, [
        cart === true ? data : null,
        status,
        count,
        ValidationAddCart.data ? cartCountReducer.total : null,
        ValidationAddCart.errorMessage
    ])

    return (
        <View style={styles.container}>
            <TopbarHeader
                title="Keranjang"
                goBack={() => navigation.goBack()}
                cart={{}}
                cartCount={cartCountReducer.total}
            />

            <View style={styles.content}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Gap height={15} />
                    {data.length > 0 ? (
                        <SelectedProduct
                            data={data}
                            removeOnPress={(id, dataremove) =>
                                removeCart(id, dataremove)
                            }
                            plusProducts={id => addProduct(id)}
                            minusProducts={id => minProduct(id)}
                        />
                    ) : (
                        <View style={styles.emptyCartWrapper}>
                            <ILEmptyCart width={150} height={150} />
                            <Text style={styles.emptyCartText}>
                                Keranjang masih kosong.
                            </Text>
                        </View>
                    )}
                </ScrollView>
            </View>

            {data.length > 0 && (
                <View style={styles.buttonWrapper}>
                    <ButtonOpacity
                        title="Hapus Semua"
                        onPress={removeCartAll}
                        type="secondary"
                    />
                    <Gap height={15} />
                    <ButtonOpacity title="Beli" onPress={on_Checkout} />
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.background
    },
    content: { paddingHorizontal: 15, flex: 1 },
    buttonWrapper:
    {
        padding: 15,
        backgroundColor: colors.white
    },
    emptyCartWrapper: { alignItems: 'center', paddingTop: 50 },
    emptyCartText: {
        color: colors.text.secondary,
        fontFamily: fonts.primary[400],
        fontSize: 16,
        marginTop: 10
    }
})

export default CartPage
