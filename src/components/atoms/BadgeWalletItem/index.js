import React from 'react'
import CurrencyFormat from 'react-currency-format'
import { View, StyleSheet, Text, Pressable } from 'react-native' 
import { IconMoney, IconCoin, Gap } from '../../atoms'
import { colors, fonts } from '../../../utils'

const BadgeWalletItem = ({title, saldo, onPress, Points}) => {
    return(
        <Pressable style={styles.container} onPress={onPress}>
            {Points ? <IconCoin size={35} filled /> : <IconMoney filled /> }
            <Gap width={Points ? 0 : 6} />
            <View>
                <Text style={styles.title}>{title}</Text>
                <CurrencyFormat
                    value={saldo}
                    displayType={'text'}
                    thousandSeparator={'.'}
                    decimalSeparator={','}
                    prefix={Points ? null : 'Rp '}
                    renderText={value => (
                        <Text style={styles.subtitle}>{value}</Text>
                    )}
                />
            </View>
        </Pressable>
    )
}

export default BadgeWalletItem

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        flexDirection: 'row',
        alignItems:"center", 
        paddingLeft: 15
    },
    title: {
        fontFamily:fonts.primary[400],
        fontSize: 12,
        color: colors.text.primary
    },
    subtitle: {
        fontFamily:fonts.primary[300], 
        fontSize: 10, 
        color: colors.text.primary
    }
})