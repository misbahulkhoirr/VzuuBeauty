import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from '../../atoms'
import { SectionMenuItem } from '../../atoms'
import { colors, fonts } from '../../../utils'

const SectionMenu = ({ title, data }) => {
    return (
        <View>
            {title && <Text style={styles.title}>{title}</Text>}
            <View style={styles.content}>
                {data.map((item, index) => (
                    <SectionMenuItem
                        icon={item.icon}
                        label={item.label}
                        totalItem={data.length}
                        index={index}
                        onPress={item.onPress}
                        key={item.id}
                    />
                ))}
            </View>
        </View>
    )
}

export default SectionMenu

const styles = StyleSheet.create({
    title: {
        color: colors.text.placeholder,
        fontFamily: fonts.primary[500],
        fontSize: 14,
        textTransform: 'uppercase',
        marginBottom: 10
    },
    content: {
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 10,
        paddingHorizontal: 10
    }
})
