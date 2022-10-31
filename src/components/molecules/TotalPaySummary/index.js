import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from '../../atoms'
import CurrencyFormat from 'react-currency-format'
import { ButtonOpacity, Gap } from '../../atoms'
import { colors, fonts } from '../../../utils'

const TotalPaySummary = ({
    title,
    totalPrice,
    totalItems,
    shippingCost,
    totalBill,
    isEnabled,
    onPress
}) => {
    // console.log('totalPrice', totalPrice)
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.row}>
                <Text style={styles.label}>
                    Total Harga ({totalItems} barang)
                </Text>
                <CurrencyFormat
                    value={totalPrice}
                    displayType={'text'}
                    thousandSeparator={'.'}
                    decimalSeparator={','}
                    prefix={'Rp '}
                    renderText={value => (
                        <Text style={styles.label}>{value}</Text>
                    )}
                />
            </View>
            <Gap height={5} />

            <View style={styles.row}>
                <Text style={styles.label}>Total Ongkos Kirim</Text>
                <CurrencyFormat
                    value={shippingCost}
                    displayType={'text'}
                    thousandSeparator={'.'}
                    decimalSeparator={','}
                    prefix={'Rp '}
                    renderText={value => (
                        <Text style={styles.label}>{value}</Text>
                    )}
                />
            </View>
            <Gap height={10} />

            <View style={styles.totalPrice}>
                <View>
                    <Text style={styles.totalPriceLabel}>Total Tagihan</Text>
                    <CurrencyFormat
                        value={totalBill}
                        displayType={'text'}
                        thousandSeparator={'.'}
                        decimalSeparator={','}
                        prefix={'Rp '}
                        renderText={value => (
                            <Text style={styles.totalPriceValue}>{value}</Text>
                        )}
                    />
                </View>

                <View style={{ width: 100 }}>
                    <ButtonOpacity title={'Bayar'} onPress={onPress} />
                </View>
            </View>
        </View>
    )
}

export default TotalPaySummary

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
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    label: {
        color: colors.text.label,
        fontFamily: fonts.primary[400],
        fontSize: 12,
        lineHeight: 17
    },
    totalPrice: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: colors.border,
        paddingTop: 10
    },
    totalPriceLabel: {
        color: colors.text.label,
        fontFamily: fonts.primary[500],
        fontSize: 12,
        lineHeight: 17
    },
    totalPriceValue: {
        color: colors.primary,
        fontFamily: fonts.primary[500],
        fontSize: 12,
        lineHeight: 17
    }
})
