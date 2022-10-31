import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { colors, fonts } from '../../../utils'

const ValidationTextError = ({ message }) => {
    console.log('message', message)
    return <Text style={styles.textError}>{message}</Text>
}

export default ValidationTextError

const styles = StyleSheet.create({
    textError: {
        color: colors.error,
        fontFamily: fonts.primary[400],
        fontSize: 12,
        backgroundColor: '#FFEBEE',
        padding: 10,
        borderRadius: 10,
        borderTopLeftRadius: 0,
        marginTop: 5
    }
})
