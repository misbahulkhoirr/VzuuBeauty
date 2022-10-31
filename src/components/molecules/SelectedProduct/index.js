import React from 'react'
import CurrencyFormat from 'react-currency-format'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { ImagePlaceholder } from '../../../assets'
import { Gap, IconTrashBin, Text } from '../../atoms'
import { BUCKET_URL, colors, fonts, truncate } from '../../../utils'

const SelectedProduct = ({ data, removeOnPress, padding, plusProducts, minusProducts, checkout }) =>
{
    return (
        <>
            {data && data.length > 0
                ? data &&
                    data.map((item, index) => (
                        <View
                            style={styles.container(data.length, index+1, padding)}
                            key={index}
                        >
                            <Image
                                style={styles.image}
                                source={
                                    item.product && item.product.product_image
                                        ? { uri: `${BUCKET_URL}/${item.product.product_image.image}` }
                                        : ImagePlaceholder
                                }
                            />

                            <View style={styles.wrapper}>
                                <View style={styles.textWrapper}>
                                    <Text style={styles.productName}>
                                        {truncate(item.product.name, 35)}
                                    </Text>
                                    <CurrencyFormat
                                        value={item.price}
                                        displayType={'text'}
                                        thousandSeparator={'.'}
                                        decimalSeparator={','}
                                        prefix={'Rp '}
                                        renderText={value => (
                                            <Text style={styles.price}>
                                                {value} X {item.qty}
                                            </Text>
                                        )}
                                    />

                                    {item.discount ? (
                                        <CurrencyFormat
                                            value={item.subtotal}
                                            displayType={'text'}
                                            thousandSeparator={'.'}
                                            decimalSeparator={','}
                                            prefix={'Rp '}
                                            renderText={value => (
                                                <Text
                                                    style={{
                                                        textDecorationLine:
                                                            'line-through',
                                                        textDecorationStyle:
                                                            'solid'
                                                    }}>
                                                    {value}
                                                </Text>
                                            )}
                                        />
                                    ) : null}
                                    <CurrencyFormat
                                        value={item.total}
                                        displayType={'text'}
                                        thousandSeparator={'.'}
                                        decimalSeparator={','}
                                        prefix={'Rp '}
                                        renderText={value => (
                                            <Text style={styles.subtotal}>
                                                {value}
                                            </Text>
                                        )}
                                    />
                                    <Gap height={5} />
                                    {!checkout ? (
                                        <Text style={styles.stock}>
                                            Stok tersisa:{' '}
                                            {item.product.stock - item.qty}
                                        </Text>
                                    ) : null}
                                </View>

                                {!checkout ? (
                                    <View style={styles.actionWrapper}>
                                        <TouchableOpacity
                                            onPress={() => removeOnPress(item.id, item)}
                                        >
                                            <IconTrashBin
                                                filled
                                                size={20}
                                                color={
                                                    colors.button.tertiary.text
                                                }
                                            />
                                        </TouchableOpacity>
                                        <Gap width={20} />

                                        {item.qty === 1 ? (
                                            <View
                                                style={styles.quantityActionButton(
                                                    'minus',
                                                    item.qty
                                                )}>
                                                <Text
                                                    style={
                                                        styles.quantityActionText
                                                    }>
                                                    -
                                                </Text>
                                            </View>
                                        ) : (
                                            <TouchableOpacity
                                                style={styles.quantityActionButton(
                                                    'minus',
                                                    item.qty
                                                )}
                                                onPress={() =>
                                                    minusProducts(item.product_id)
                                                }>
                                                <Text
                                                    style={
                                                        styles.quantityActionText
                                                    }>
                                                    -
                                                </Text>
                                            </TouchableOpacity>
                                        )}

                                        <View style={styles.itemCountWrapper}>
                                            <Text style={styles.itemCount}>
                                                {item.qty}
                                            </Text>
                                        </View>

                                        <TouchableOpacity
                                            style={styles.quantityActionButton(
                                                'plus',
                                                item.qty,
                                                item.product.stock
                                            )}
                                            onPress={() =>
                                                plusProducts(item.product_id)
                                            }>
                                            <Text
                                                style={styles.quantityActionText}>
                                                +
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                ) : null}
                            </View>
                        </View>
                    ))
                : null}
        </>
    )
}

export default SelectedProduct

const styles = StyleSheet.create({
    container: (total, currItem, padding) => ({
        backgroundColor: colors.white,
        borderRadius: 8,
        padding: padding === false ? 0 : 10,
        marginBottom: currItem === total ? 0 : padding === false ? 15 : 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }),
    actionWrapper:
    {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    image:
    {
        width: 85,
        height: 85,
        borderRadius: 5
    },
    wrapper: { flex: 1 },
    textWrapper:
    {
        flex: 1,
        paddingLeft: 10
    },
    productName:
    {
        fontFamily: fonts.primary[400],
        fontSize: 14,
        marginBottom: 5
    },
    subtotal:
    {
        fontFamily: fonts.primary[600],
        fontSize: 14
    },
    quantityActionButton: (btnType, qty, stock) => ({
        width: 20,
        height: 20,
        backgroundColor:
            btnType === 'minus' && qty == 1
                ? colors.button.disable.background
                : btnType === 'plus' && qty == stock
                ? colors.button.disable.background
                : colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20 / 2
    }),
    quantityActionText:
    {
        color: colors.white,
        fontFamily: fonts.primary[600],
        fontSize: 18
    },
    itemCountWrapper:
    {
        width: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 3
    },
    itemCount:
    {
        fontFamily: fonts.primary[400],
        fontSize: 12
    },
    stock:
    {
        color: colors.primary,
        fontSize: 12
    }
})
