import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { colors, fonts } from '../../../utils'

const SectionTitle = ({ text, size }) =>
{
    return <Text style={styles.text(size)}>{text}</Text>
}

export default SectionTitle

const styles = StyleSheet.create({
    text: size => ({
        color: colors.text.secondary,
        fontFamily: fonts.primary[500],
        fontSize: size ? size : 16
    })
})