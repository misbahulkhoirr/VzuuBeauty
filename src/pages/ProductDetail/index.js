import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CurrencyFormat from 'react-currency-format'
import { ILEmptyProduct } from '../../assets'
import {
    colors,
    fonts,
    useForm,
    showError,
    API_URL_V2,
    BUCKET_URL,
    showSuccess
} from '../../utils'
import {
    ScrollView,
    StyleSheet,
    View,
    TouchableOpacity
} from 'react-native'
import Share from 'react-native-share'
import {
    ButtonOpacity,
    Gap,
    ImageSlider,
    Text,
    TopbarHeader,
    IconShare,
    IconLove,
    AdditionalProductInfo
} from '../../components'
import {
    reviewProductAction,
    detailProductAction,
    cartAddAction,
    countCartAction,
    addWishlistAction,
    wishlistAction,
    removeWishlistAction
} from '../../redux/actions/v2'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const ProductDetail = ({ navigation, route }) => {
    const dispatch = useDispatch()
    const cartCountReducer = useSelector(state => state.countCartReducer.data)
    const ValidationAddCart = useSelector(state => state.cartAddReducer_v2)
    const productDetail = useSelector(state => state.detailProductReducer)
    const { data: dataWishlist } = useSelector(state => state.wishlistReducer)
    const productId = route.params.id
    const [loveRed, setLoveRed] = useState(status == true ? '#E06379' : '')
    const [status, setStatus] = useState()
    const [wishlistId, setWishlistId] = useState()

    const [form, setForm] = useForm({
        product_id: productId
    })

    const [visible, setVisible] = useState(false)
    const [image, setImage] = useState()

    const [product, setProduct] = useState(productDetail && productDetail.data)
    const [stock, setStock] = useState(null)
    const addCart = async () => {
        await dispatch(cartAddAction(form))
        await dispatch(countCartAction())
    }

    useEffect(() => {
        async function CallAPI() {
            const accessToken = await AsyncStorage.getItem('access_token')
            axios({
                method: 'GET',
                url: `${API_URL_V2}/product/detail?id=${productId}`,
                headers: {
                    Authorization: 'Bearer ' + JSON.parse(accessToken)
                }
            })
                .then(response => {
                    console.log("response",response)
                    setProduct(response.data)
                    setStock(response.data.stock)
                    setImage(response.data.product_images)
                })
                .catch(error => {
                    console.log(error)
                })
        }
        CallAPI()
        dispatch(wishlistAction())

        // dispatch(detailProductAction(productId))
        dispatch(countCartAction())
        // dispatch(reviewProductAction(productId))
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

        return () => {
            dispatch({ type: 'CARD_ADD_ATTEMPT' })
        }
    }, [
        ValidationAddCart.data ? cartCountReducer.total : null,
        ValidationAddCart.errorMessage ? ValidationAddCart.errorMessage : null
    ])
    
    useEffect(() => {
        dataWishlist &&
            dataWishlist.map(item => {
                if (item.product_id === productId) {
                    setStatus(true)
                    setWishlistId(item.id)
                }
            })
    }, [])
   
    const onClickImage = item => {
        const image = []
        item &&
            item.map(imageitem => {
                image.push({ url: `${BUCKET_URL}/${imageitem.image}` })
            })
        setImage(image)
        setVisible(true)
    }

    const onSwipeDown = () => {
        setVisible(false)
    }
    
    const Convert = price => {
        const numb = price
        const format = numb.toString().split('').reverse().join('')
        const convert = format.match(/\d{1,3}/g)
        return 'Rp ' + convert.join('.').split('').reverse().join('')
    }

    const onSharePress = product => {
        const price = product.price
        let shareImage = {
            title: product.name,
            message: `${product.name} dapatkan dengan harga ${Convert(
                price
            )} .dapatkan segera dengan mengklik link berikut https://vzuubeauty.com/produk/${
                product.slug
            }`
        }
        Share.open(shareImage)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                err && console.log(err)
            })
    }
    
    const success = () => showSuccess('Produk berhasil ditambahkan ke wishlist')

    // SALAH ID HAPUS
    const addToWhistlist = id => {
        if (status) {
            setStatus(false)
            dispatch(removeWishlistAction(wishlistId))
            console.log('1')
            dispatch(wishlistAction())
        } else {
            setStatus(true)
            dispatch(addWishlistAction(id, { success }))
            console.log('2')
            dispatch(wishlistAction())
        }
    }

    return (
        <>
            <View style={styles.container}>
                <TopbarHeader
                    title="Detail Produk"
                    goBack={() => navigation.goBack()}
                    cart={{ onPress: () => navigation.navigate('CartPage') }}
                    cartCount={cartCountReducer.total}
                />
                {product.id === null ? (
                    <View style={styles.emptyProductWrapper}>
                        <ILEmptyProduct width={150} height={150} />
                        <Text style={styles.emptyProduct}>
                            Produk sudah tidak dijual.
                        </Text>
                    </View>
                ) : (
                    <View style={styles.content}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <ImageSlider
                                data={product && product.product_images}
                                withoutItemKeyName
                                visible={visible}
                                onClickImage={item => {
                                    onClickImage(item)
                                }}
                                onSwipeDown={onSwipeDown}
                                image={image}
                            />

                            <View style={styles.wrapper}>
                                <Text style={styles.productName}>
                                    {product && product.name}
                                </Text>
                                <CurrencyFormat
                                    value={product.price}
                                    displayType={'text'}
                                    thousandSeparator={'.'}
                                    decimalSeparator={','}
                                    prefix={'Rp '}
                                    renderText={value => (
                                        <Text style={styles.price}>
                                            {value}
                                        </Text>
                                    )}
                                />
                                <Text style={styles.stockQuantity}>
                                    Stok tersisa: {product.stock}
                                </Text>
                                <Gap height={5} />
                                
                                <AdditionalProductInfo
                                    productSold={product.total_sold}
                                    rating={{ 
                                        point: 4.8,
                                        total: 555,
                                        onPress:() => navigation.navigate('ProductReview', product.id)
                                    }}
                                />
                            </View>

                            {product &&
                            product.product_prices &&
                            product.product_prices.length > 0 ? (
                                <View style={styles.wrapper}>
                                    <Text style={styles.title}>
                                        Diskon Produk
                                    </Text>
                                    <View style={styles.discountPriceWrapper}>
                                        {product &&
                                            product.product_prices &&
                                            product.product_prices.map(
                                                (item, index) => (
                                                    <View
                                                        key={index}
                                                        style={
                                                            styles.discountPriceItem
                                                        }>
                                                        {item &&
                                                        item.qty_max ? (
                                                            <Text
                                                                style={
                                                                    styles.qtyRange
                                                                }>
                                                                {item &&
                                                                item.qty_min
                                                                    ? item.qty_min
                                                                    : null}{' '}
                                                                -{' '}
                                                                {item &&
                                                                item.qty_max
                                                                    ? item.qty_max
                                                                    : null}
                                                            </Text>
                                                        ) : (
                                                            <Text
                                                                style={
                                                                    styles.qtyRange
                                                                }>
                                                                {`>= ${
                                                                    item &&
                                                                    item.qty_min
                                                                        ? item.qty_min
                                                                        : null
                                                                }`}
                                                            </Text>
                                                        )}
                                                        <CurrencyFormat
                                                            value={
                                                                item &&
                                                                item.price
                                                                    ? item.price
                                                                    : null
                                                            }
                                                            displayType={'text'}
                                                            thousandSeparator={
                                                                '.'
                                                            }
                                                            decimalSeparator={
                                                                ','
                                                            }
                                                            prefix={'Rp '}
                                                            renderText={value => (
                                                                <Text
                                                                    style={
                                                                        styles.pricePerItem
                                                                    }>
                                                                    {value}
                                                                </Text>
                                                            )}
                                                        />
                                                    </View>
                                                )
                                            )}
                                    </View>
                                </View>
                            ) : null}
                            <View style={styles.wrapper}>
                                <Text style={styles.title}>
                                    Deskripsi Produk
                                </Text>
                                <Text style={styles.desc}>
                                    {product.description}
                                </Text>
                            </View>
                            <Gap height={35} />
                        </ScrollView>

                        <View style={styles.bottomSection}>
                            <TouchableOpacity
                                onPress={() => onSharePress(product)}
                                style={styles.loveButton}>
                                <IconShare />
                            </TouchableOpacity>
                            <View style={styles.buttonWrapper}>
                                <ButtonOpacity
                                    title={
                                        !product.stock == 0
                                            ? '+ Keranjang'
                                            : 'Stok Habis'
                                    }
                                    onPress={addCart}
                                    disable={!product.stock == 0 ? false : true}
                                />
                            </View>

                            <TouchableOpacity
                                style={styles.loveButton}
                                onPress={() => addToWhistlist(product.id)}>
                                <IconLove
                                    filled={status}
                                    actualColor={loveRed}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </View>
        </>
    )
}

export default ProductDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    content: { flex: 1 },
    wrapper: {
        backgroundColor: colors.white,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginHorizontal: 10,
        marginTop: 10
    },
    title: {
        fontFamily: fonts.primary[500],
        color: colors.text.secondary,
        fontSize: 14,
        paddingTop: 5,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.border
    },
    Popover: {
        fontFamily: fonts.primary[400],
        fontSize: 14,
        paddingVertical: 10,
        color: colors.white
    },
    desc: {
        fontFamily: fonts.primary[400],
        color: colors.text.secondary,
        fontSize: 14,
        paddingVertical: 10
    },
    productName: {
        fontFamily: fonts.primary[500],
        color: colors.text.secondary,
        fontSize: 18,
        marginBottom: 5
    },
    price:
    {
        fontFamily: fonts.primary[400],
        color: colors.text.secondary,
        fontSize: 16,
        lineHeight: 23
    },
    bottomSection: {
        flexDirection: 'row',
        backgroundColor: colors.white,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        padding: 15
    },
    loveButton: {
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eaeaea',
        borderRadius: 10
    },
    buttonWrapper: { flex: 1, marginLeft: 10, marginRight: 10 },
    discountPriceWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10
    },
    discountPriceItem: {
        width: 100,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 5,
        padding: 5
    },
    qtyRange: {
        fontFamily: fonts.primary[400],
        fontSize: 12,
        marginBottom: 3,
        color: colors.text.secondary
    },
    pricePerItem: {
        fontFamily: fonts.primary[500],
        fontSize: 12,
        color: colors.text.secondary
    },
    emptyProductWrapper: { alignItems: 'center', paddingTop: 50 },
    emptyProduct: {
        color: colors.text.secondary,
        fontFamily: fonts.primary[400],
        fontSize: 16,
        marginTop: 10
    },
    stockQuantity:
    {
        color: colors.primary,
        fontFamily: fonts.primary[400],
        fontSize: 12
    }
})