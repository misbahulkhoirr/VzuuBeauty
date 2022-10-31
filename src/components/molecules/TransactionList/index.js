import React from 'react'
import { Image, Pressable, StyleSheet, View } from 'react-native'
import CurrencyFormat from 'react-currency-format'
import { ImagePlaceholder } from '../../../assets'
import { BUCKET_URL, colors, fonts, truncate } from '../../../utils'
import { ButtonOpacity, Gap, IconMoney, Text } from '../../atoms'

const TransactionList = ({
    data,
    index,
    navigation,
    handleButtonPayment,
    handleButtonTracking,
    handleButtonBeliLagi
}) => {
    return (
        <Pressable
            style={styles.container(data.length, index + 1)}
            onPress={() =>
                navigation.navigate('TransactionDetail', { id: data.id })
            }
            key={index}>
            <View style={styles.product}>
                {data.order_item && data.order_item.image ? 
                    <Image
                        style={styles.productImage}
                        source={
                            data.order_item.image
                                ? { uri: `${BUCKET_URL}/${data.order_item.image}` }
                                : ImagePlaceholder
                        }
                    />
                : 
                    <IconMoney  filled />
                }
                
                <View>
                    <Text style={styles.productName(data.note)}>
                        { data.order_item && data.order_item.product_name ? truncate( data.order_item.product_name, 35) : data.note}
                    </Text>
                    {
                        data.note != "TOPUP" ?
                        <Text style={styles.quantity}>{data.total_qty} Barang</Text>
                    : 
                        null
                    }
                </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    <Text style={styles.label}>Total belanja:</Text>
                    <CurrencyFormat
                        value={data.total_price ? data.total_price : data.grand_total}
                        displayType={'text'}
                        thousandSeparator={'.'}
                        decimalSeparator={','}
                        prefix={'Rp '}
                        renderText={value => (
                            <Text style={styles.price}>{value}</Text>
                        )}
                    />
                </View>
                <View style={{ flexDirection: 'column' }}>
                    <Gap height={10} />
                    {data.status_id == 5 && (
                        <ButtonOpacity
                            title="Bayar"
                            size="small"
                            onPress={() =>
                                handleButtonPayment(data.invoice_url)
                            }
                        />
                    )}
                    {data.status_id == 7 && (
                        <ButtonOpacity
                            title="Lacak"
                            size="small"
                            onPress={() =>
                                handleButtonTracking({
                                    courier:
                                        data.order_shipping.delivery_courier,
                                    waybill: data.order_shipping.awb
                                })
                            }
                        />
                    )}

                    {data.status_id == 8 && (
                        <ButtonOpacity
                            title="Beli Lagi"
                            size="small"
                            onPress={() =>
                                handleButtonBeliLagi({
                                    id: data.order_item.product_id
                                })
                            }
                        />
                    )}
                </View>
            </View>
        </Pressable>
    )
}

export default TransactionList

const styles = StyleSheet.create({
    container: (totalItem, currentItem) => ({
        backgroundColor: colors.white,
        padding: 10,
        borderRadius: 8,
        marginBottom: currentItem === totalItem ? 0 : 15
    }),
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.border
    },
    category: { flexDirection: 'row' },
    categoryImage: {
        width: 30,
        height: 30,
        marginRight: 10
    },
    categoryName: {
        fontFamily: fonts.primary[500],
        fontSize: 14,
        marginBottom: 2
    },
    date: {
        fontFamily: fonts.primary[400],
        fontSize: 10
    },
    status: status => ({
        height: 20,
        fontFamily: fonts.primary[500],
        fontSize: 10,
        textAlignVertical: 'center',
        paddingHorizontal: 10,
        borderRadius: 3,
        color:
            status === 'Success'
                ? colors.white
                : status === 'Pending'
                ? '#FF7043'
                : status === 'Cancel'
                ? colors.white
                : colors.text.primary,
        backgroundColor:
            status === 'Success'
                ? '#4CAF50'
                : status === 'Pending'
                ? '#FFECB3'
                : status === 'Cancel'
                ? colors.error
                : colors.background
    }),
    product: {
        flexDirection: 'row',
        paddingVertical: 15,
    },
    productImage: {
        width: 45,
        height: 45,
        borderRadius: 3,
        marginRight: 10
    },
    productName: note => ({
        fontSize: 14,
        marginBottom: 5,
        marginLeft: note === "TOPUP" ? 10 : 0
    }),
    quantity: {
        color: colors.text.secondary,
        fontFamily: fonts.primary[400],
        fontSize: 11,
    },
    label: {
        fontFamily: fonts.primary[400],
        fontSize: 12,
        marginBottom: 3
    },
    price: {
        fontFamily: fonts.primary[500],
        fontSize: 14
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 2,
        backgroundColor: colors.primary,
        borderRadius: 5,
        height: 28
    },
})
