import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import CurrencyInput from 'react-native-currency-input';
import { colors, fonts } from '../../../utils'

const InputCurrency = ({label, errorMessage, value, onChangeValue, onChangeText}) => {
    return(
        <View>
            {label && <Text style={styles.label}>{label}</Text>}
            <CurrencyInput
                style={styles.input}
                value={value}
                onChangeValue={onChangeValue}
                prefix="Rp."
                delimiter=","
                separator="."
                precision={0}
                onChangeText={onChangeText}
            />
            {errorMessage && (
                <Text style={styles.error}>{errorMessage}</Text>
            )}
        </View>
    )
}

export default InputCurrency

const styles = StyleSheet.create({
    input: {
        color: colors.textInput.enable.text,
        fontFamily: fonts.primary[400],
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 15,
        backgroundColor: colors.textInput.enable.background
    },
    label: {
        color: colors.text.secondary,
        fontFamily: fonts.primary[400],
        marginBottom: 5,
        marginLeft: 5
    },
    error: {
        color: colors.error,
        fontFamily: fonts.primary[400],
        marginTop: 5,
        marginLeft: 5
    },
})