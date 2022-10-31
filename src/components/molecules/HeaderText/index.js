import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from '../../atoms'
import { colors, fonts } from '../../../utils'

const HeaderText = ({ title, desc }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.desc}>{desc}</Text>
        </View>
    )
}

export default HeaderText

const styles = StyleSheet.create({
    container: { paddingLeft: 5 },
    title: {
        color: colors.text.secondary,
        fontFamily: fonts.primary[500],
        fontSize: 25,
        lineHeight: 32
    },
    desc: {
        color: colors.text.label,
        fontFamily: fonts.primary[400],
        fontSize: 14,
        lineHeight: 21
    }
})
