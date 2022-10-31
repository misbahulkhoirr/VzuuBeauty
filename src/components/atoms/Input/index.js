import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { colors, fonts } from '../../../utils'

const Input = ({
    label,
    placeholder,
    secureTextEntry,
    defaultValue,
    editable,
    errorMessage,
    aktivasi,
    ...rest
}) => {
    return (
        <View>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput
                style={styles.input(editable)}
                placeholder={placeholder}
                placeholderTextColor={colors.text.placeholder}
                secureTextEntry={secureTextEntry}
                defaultValue={defaultValue}
                editable={editable}
                {...rest}
            />
            {errorMessage === 'Akun belum aktif.'
                ? errorMessage && (
                      <View style={styles.errorwrap}>
                          <Text style={styles.error}>{errorMessage}</Text>
                          <Text style={styles.link} onPress={() => aktivasi()}>
                              Aktivasi Sekarang
                          </Text>
                      </View>
                  )
                : errorMessage && (
                      <Text style={styles.error}>{errorMessage}</Text>
                  )}
        </View>
    )
}

export default Input

const styles = StyleSheet.create({
    label: {
        color: colors.text.secondary,
        fontFamily: fonts.primary[400],
        marginBottom: 5,
        marginLeft: 5
    },
    input: editable => ({
        color:
            editable === false
                ? colors.textInput.disable.text
                : colors.textInput.enable.text,
        fontFamily: fonts.primary[400],
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 15,
        backgroundColor:
            editable === false
                ? colors.textInput.disable.background
                : colors.textInput.enable.background
    }),
    error: {
        color: colors.error,
        fontFamily: fonts.primary[400],
        marginTop: 5,
        marginLeft: 5
    },
    errorwrap: {
        flexDirection: 'row'
    },
    link: {
        color: '#999999',
        fontFamily: fonts.primary[400],
        textDecorationLine: 'underline',
        marginTop: 5,
        marginLeft: 15
    }
})
