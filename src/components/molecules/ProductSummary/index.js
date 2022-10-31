import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import CurrencyFormat from 'react-currency-format'
import { ImagePlaceholder } from '../../../assets'
import { BUCKET_URL, colors, fonts, truncate } from '../../../utils'
import { Gap, Text } from '../../atoms'

const ProductSummary = ({ title, data }) =>
{
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            {data &&
                data.map((item, index) => (
                    <View
                        style={styles.productItem(data.length, index + 1)}
                        key={index}>
                        <Image
                            style={styles.image}
                            source={
                                item.product && item.product.product_image
                                    ? {
                                          uri: `${BUCKET_URL}/${item.product.product_image.image}`
                                      }
                                    : ImagePlaceholder
                            }
                        />
                        <View>
                            <Text style={styles.productName}>
                                {truncate(item.product.name, 35)}
                            </Text>
                            <Gap height={3} />

                            <Text style={styles.quantity}>
                                {item.qty} Barang ({item.total_weight} gr)
                            </Text>
                            <Gap height={3} />

                            <View style={styles.priceWrapper}>
                                {item.discount ? (
                                    <CurrencyFormat
                                        value={item.subtotal}
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
                                ) : null}
                                <Gap width={5} />
                                <CurrencyFormat
                                    value={item.total}
                                    displayType={'text'}
                                    thousandSeparator={'.'}
                                    decimalSeparator={','}
                                    prefix={'Rp '}
                                    renderText={value => (
                                        <Text style={styles.currPrice}>
                                            {value}
                                        </Text>
                                    )}
                                />
                            </View>
                        </View>
                    </View>
                ))}
        </View>
    )
}

export default ProductSummary

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8
    },
    title: {
        color: '#cccccc',
        fontFamily: fonts.primary[500],
        fontSize: 12,
        paddingTop: 5,
        paddingBottom: 15,
        borderBottomColor: colors.border,
        textTransform: 'uppercase'
    },
    productItem: (totalData, curr) => ({
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: totalData !== curr ? 10 : 0
    }),
    image: {
        width: 55,
        height: 55,
        borderRadius: 5,
        marginRight: 10
    },
    productName: {
        fontFamily: fonts.primary[500],
        fontSize: 12
    },
    quantity: {
        color: colors.text.secondary,
        fontFamily: fonts.primary[400],
        fontSize: 12
    },
    priceWrapper: { flexDirection: 'row' },
    price: {
        color: colors.text.secondary,
        fontFamily: fonts.primary[400],
        fontSize: 12,
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid'
    },
    currPrice: {
        color: colors.text.secondary,
        fontFamily: fonts.primary[500],
        fontSize: 12
    }
})
