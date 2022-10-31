import React from 'react'
import CurrencyFormat from 'react-currency-format'
import { StyleSheet } from 'react-native'
import { fonts } from '../../../utils'
import Text from '../Text'

const PriceLabel = ({ value, textType, textStrikeThrough, style }) =>
{
    return (
        <CurrencyFormat
            value={value}
            displayType={'text'}
            thousandSeparator={'.'}
            decimalSeparator={','}
            prefix={'Rp '}
            renderText={value => <Text style={[styles.price(textType, textStrikeThrough), style]}>{value}</Text>}
        />
    )
}

export default PriceLabel

const styles = StyleSheet.create({
    price: (textType, textStrikeThrough) => ({
        fontFamily:
            textType === 'light' ? fonts.primary[300] : fonts.primary[600],
        fontSize: 12,
        textDecorationLine: textStrikeThrough && 'line-through',
        textDecorationStyle: 'solid'
    })
})
