import React, { useEffect } from 'react'
import { Image, ScrollView, StyleSheet, View } from 'react-native'
import { ButtonOpacity, Gap, TopbarHeader, Text } from '../../components'
import { ImagePlaceholder } from '../../assets'
import { colors, fonts, BUCKET_URL, truncate } from '../../utils'
import {
    confirmationReceivedAction,
    OrderDetailAction,
    profileAction,
    transactionsAction
} from '../../redux/actions/v2'
import { useDispatch, useSelector } from 'react-redux'
import CurrencyFormat from 'react-currency-format'
import moment from 'moment'

const TransactionDetail = ({ route, navigation }) => {
    const data = useSelector(state => state.profileReducer.data)
    const cartCountReducer = useSelector(state => state.countCartReducer.data)
    const id = route.params.id

    const dispatch = useDispatch()
    const OrderDetail = useSelector(state => state.OrderDetailReducer.data)

    useEffect(() => {
        dispatch(OrderDetailAction(id))
        dispatch(profileAction())
    }, [])

    const handleSelesai = async order_id => {
        await dispatch(confirmationReceivedAction(order_id))
        await dispatch(transactionsAction(7))
        navigation.goBack()
    }

    const handleUlasan = async (product_id) => {
        await navigation.navigate('CreateProductReview', product_id)
    }
    console.log('item',OrderDetail)
    return (
        <View style={styles.container}>
            <TopbarHeader
                title="Detail Transaksi"
                goBack={() => navigation.goBack()}
                cart={{ onPress: () => navigation.navigate('CartPage') }}
                cartCount={cartCountReducer.total}
            />
            <View style={styles.content}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Gap height={15} />
                    <View style={styles.wrapper}>
                        <Text style={styles.title}>
                            {OrderDetail && OrderDetail.status_id == 5
                                ? 'Belom Bayar'
                                : OrderDetail && OrderDetail.status_id == 6
                                ? 'Dikemas'
                                : OrderDetail && OrderDetail.status_id == 7
                                ? 'Dikirim'
                                : OrderDetail && OrderDetail.status_id == 8
                                ? 'Selesai'
                                : OrderDetail && OrderDetail.status_id == 9
                                ? 'Dibatalkan'
                                : ''}
                        </Text>
                        <Gap height={10} />
                        <Text style={styles.label()}>
                            {OrderDetail.invoice_number}
                        </Text>
                        <View style={styles.dataWrapper}>
                            <Text style={styles.label()}>
                                Tanggal Pembelian
                            </Text>
                            <Text style={styles.desc()}>
                                {moment(OrderDetail.created_at).format(
                                    'DD MMMM YYYY'
                                )}
                            </Text>
                        </View>
                    </View>
                    <Gap height={10} />

                    <View style={styles.wrapper}>
                        <Text style={styles.titleUpper}>Detail Produk</Text>
                        {OrderDetail.note === "TOPUP" ? 
                                <View style={{flexDirection:"row", justifyContent:'space-between'}}>
                                    <Text style={styles.courierLabel}>{OrderDetail.note}</Text>
                                    <CurrencyFormat
                                        value={OrderDetail.grand_total}
                                        displayType={'text'}
                                        thousandSeparator={'.'}
                                        decimalSeparator={','}
                                        prefix={'Rp '}
                                        renderText={value => (
                                            <Text style={styles.courierDesc}>
                                                {value}
                                            </Text>
                                        )}
                                    />
                                </View>
                        : 
                        OrderDetail &&
                            OrderDetail.order_items.map((item, index) => (
                                <View style={styles.metaContainer} key={index}>
                                    <View style={styles.product} key={index}>
                                        <View style={styles.productDetail}>
                                            <Image
                                                style={styles.productImage}
                                                source={
                                                    item.image
                                                        ? {
                                                              uri: `${BUCKET_URL}/${item.image}`
                                                          }
                                                        : ImagePlaceholder
                                                }
                                            />

                                            <View>
                                                <Text
                                                    style={styles.productName}>
                                                    {truncate(
                                                        item.product_name,
                                                        35
                                                    )}
                                                </Text>
                                                <CurrencyFormat
                                                    value={item.price}
                                                    displayType={'text'}
                                                    thousandSeparator={'.'}
                                                    decimalSeparator={','}
                                                    prefix={'Rp '}
                                                    renderText={value => (
                                                        <Text>
                                                            {value} X {item.qty}
                                                        </Text>
                                                    )}
                                                />
                                            </View>
                                        </View>
                                        <View style={styles.priceWrapper}>
                                            <View>
                                                <Text style={styles.priceLabel}>
                                                    Total harga
                                                </Text>
                                                <CurrencyFormat
                                                    value={item.price * item.qty}
                                                    displayType={'text'}
                                                    thousandSeparator={'.'}
                                                    decimalSeparator={','}
                                                    prefix={'Rp '}
                                                    renderText={value => (
                                                        <Text
                                                            style={{
                                                                fontWeight: 'bold'
                                                            }}>
                                                            {value}
                                                        </Text>
                                                    )}
                                                />
                                            </View>
                                            {OrderDetail.status_id === 8 && item.is_review === 0 ? (
                                                <View
                                                    style={{
                                                        flexDirection: 'row',
                                                        justifyContent: 'flex-end',
                                                        marginTop: 10
                                                    }}>
                                                    <ButtonOpacity
                                                        title="Ulasan"
                                                        size="small"
                                                        onPress={() =>
                                                            handleUlasan(
                                                                item
                                                            )
                                                        }
                                                    />
                                                </View>
                                            ) : null}
                                            </View>
                                        </View>
                                </View>
                            ))}
                    </View>
                    <Gap height={10} />
                    
                    {OrderDetail.note != "TOPUP" ? 
                    <>
                        <View style={styles.wrapper}>
                            <Text style={styles.titleUpper}>Info Pengiriman</Text>

                            <View style={styles.courierWrapper}>
                                <Text style={styles.courierLabel}>Kurir</Text>
                                <Text style={styles.courierDesc}>
                                    {OrderDetail && OrderDetail.order_shipping && 
                                        OrderDetail.order_shipping.delivery_courier ? OrderDetail.order_shipping.delivery_courier : null}
                                </Text>
                            </View>
                            {(OrderDetail && OrderDetail.status_id == 7) ||
                            (OrderDetail && OrderDetail.status_id == 8) ? (
                                <View style={styles.courierWrapper}>
                                    <Text style={styles.courierLabel}>
                                        No. Resi
                                    </Text>
                                    <Text style={styles.courierDesc}>
                                        {OrderDetail && OrderDetail.order_shipping &&
                                            OrderDetail.order_shipping.awb ? OrderDetail.order_shipping.awb : null}
                                    </Text>
                                </View>
                            ) : null}

                            <View style={styles.courierWrapper}>
                                <Text style={styles.courierLabel}>Alamat</Text>
                                <Text style={styles.courierDesc}>
                                    <Text style={styles.receiverName}>
                                        {OrderDetail && OrderDetail.order_shipping && 
                                            OrderDetail.order_shipping.name ? OrderDetail.order_shipping.name : null}
                                    </Text>
                                    {'\n'}
                                    {OrderDetail && OrderDetail.order_shipping &&
                                        OrderDetail.order_shipping.phone_number ? OrderDetail.order_shipping.phone_number : null}
                                    {'\n'}
                                    {OrderDetail && OrderDetail.order_shipping &&
                                        OrderDetail.order_shipping.address ? OrderDetail.order_shipping.address : null}
                                </Text>
                            </View>
                        </View>
                        <Gap height={10} />
                    </>
                    : null}

                    <View style={styles.wrapper}>
                        <Text style={styles.titleUpper}>
                            Rincian Pembayaran
                        </Text>
                        <View style={styles.dataWrapper}>
                            <Text style={styles.label()}>
                                Metode Pembayaran
                            </Text>
                            <Text style={styles.desc()}>
                                {OrderDetail.payment_method}
                            </Text>
                        </View>
                        {OrderDetail.note === "TOPUP" ? 
                            <View style={styles.dataWrapper}>
                                <Text style={styles.label()}>
                                Bank
                                </Text>
                                <Text style={styles.desc()}>
                                    {OrderDetail.payment_channel}
                                </Text>
                            </View>
                        : 
                        <>
                            <View style={styles.dataWrapper}>
                                <Text style={styles.label()}>
                                    Total Harga (3 barang)
                                </Text>
                                <CurrencyFormat
                                    value={OrderDetail.total_price}
                                    displayType={'text'}
                                    thousandSeparator={'.'}
                                    decimalSeparator={','}
                                    prefix={'Rp '}
                                    renderText={value => <Text>{value}</Text>}
                                />
                            </View>

                            <View style={styles.dataWrapper}>
                                <Text style={styles.label()}>
                                    Total Ongkos Kirim
                                </Text>

                                <CurrencyFormat
                                    value={OrderDetail.shipping_fee}
                                    displayType={'text'}
                                    thousandSeparator={'.'}
                                    decimalSeparator={','}
                                    prefix={'Rp '}
                                    renderText={value => <Text>{value}</Text>}
                                />
                            </View>
                        </>
                        }
                        
                        
                        <View style={styles.wrapperWithTopBorder}>
                            <View style={styles.dataWrapper}>
                                <Text style={styles.label('bold')}>
                                    Total Belanja
                                </Text>
                                <CurrencyFormat
                                    value={
                                        OrderDetail.grand_total ? 
                                            OrderDetail.grand_total 
                                        :
                                            OrderDetail.total_price +
                                            OrderDetail.shipping_fee
                                    }
                                    displayType={'text'}
                                    thousandSeparator={'.'}
                                    decimalSeparator={','}
                                    prefix={'Rp '}
                                    renderText={value => (
                                        <Text
                                            style={{
                                                fontWeight: 'bold'
                                            }}>
                                            {value}
                                        </Text>
                                    )}
                                />
                            </View>
                            {OrderDetail.status_id == 7 ? (
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'flex-end',
                                        marginTop: 10
                                    }}>
                                    <ButtonOpacity
                                        title="Selesai"
                                        size="small"
                                        onPress={() =>
                                            handleSelesai({
                                                order_id: OrderDetail.id
                                            })
                                        }
                                    />
                                </View>
                            ) : null}
                        </View>
                    </View>
                    <Gap height={15} />
                </ScrollView>
            </View>
        </View>
    )
}

export default TransactionDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    content: { flex: 1 },
    wrapper: {
        backgroundColor: colors.white,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginHorizontal: 15,
        borderRadius: 8
    },
    dataWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    wrapperWithTopBorder: {
        borderTopWidth: 1,
        borderTopColor: colors.border,
        paddingTop: 10
    },
    courierWrapper: { flexDirection: 'row' },
    title: {
        fontFamily: fonts.primary[500],
        fontSize: 14,
        paddingTop: 5,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.border
    },
    titleUpper: {
        color: '#cccccc',
        fontFamily: fonts.primary[500],
        fontSize: 12,
        paddingTop: 5,
        paddingBottom: 15,
        borderBottomColor: colors.border,
        textTransform: 'uppercase'
    },
    label: style => ({
        color: '#999999',
        fontFamily: style === 'bold' ? fonts.primary[500] : fonts.primary[400],
        fontSize: 12,
        paddingBottom: 10
    }),
    desc: style => ({
        fontFamily: style === 'bold' ? fonts.primary[500] : fonts.primary[400],
        fontSize: 12,
        paddingBottom: 10
    }),
    courierLabel: {
        minWidth: 85,
        color: '#999999',
        fontFamily: fonts.primary[400],
        fontSize: 12,
        paddingBottom: 10
    },
    courierDesc: {
        fontFamily: fonts.primary[400],
        fontSize: 12,
        paddingBottom: 10,
        flexShrink: 1,
        lineHeight: 19
    },
    receiverName: {
        fontFamily: fonts.primary[500],
        paddingBottom: 5
    },
    product: {
        padding: 10,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 5,
        marginBottom: 10
    },
    productDetail: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        paddingBottom: 10,
        marginBottom: 8
    },
    productImage: {
        width: 45,
        height: 45,
        borderRadius: 3,
        marginRight: 10
    },
    productName: {
        fontFamily: fonts.primary[500],
        fontSize: 12,
        marginBottom: 5
    },
    quantity: {
        color: colors.text.secondary,
        fontFamily: fonts.primary[400],
        fontSize: 11
    },
    priceLabel: {
        color: colors.text.secondary,
        fontFamily: fonts.primary[400],
        fontSize: 11,
        marginBottom: 2
    },
    price: {
        color: colors.text.secondary,
        fontFamily: fonts.primary[500],
        fontSize: 11
    },
    priceWrapper: {
        flexDirection:'row', 
        justifyContent:'space-between'
    }
})
