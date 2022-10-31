import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors, fonts } from '../../../utils'

const ButtonOpacity = ({ title, onPress, type, maxContent, disable, size }) =>
{
    if(maxContent)
    {
        return (
            <TouchableOpacity
                style={styles.containerMaxContent}
                onPress={onPress}
            >
                <Text style={styles.text}>
                    {title}
                </Text>
            </TouchableOpacity>
        )
    }

    if(disable)
    {
        return (
            <View
                style={styles.container(type, disable, size)}
                onPress={onPress}
            >
                <Text style={styles.text(type, disable, size)}>
                    {title}
                </Text>
            </View>
        )
    }
    
    return (
        <TouchableOpacity
            style={styles.container(type, disable, size)}
            onPress={onPress}
        >
            <Text style={styles.text(type, disable, size)}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

export default ButtonOpacity

const styles = StyleSheet.create({
    container: (type, disable, size) => ({
        backgroundColor: type === 'secondary' ? 'transparent' : disable === true ? colors.disable : colors.primary,
        borderWidth: 1,
        borderColor: disable === true ? colors.disable : colors.primary,
        paddingVertical: size && size === 'small' ? 5 : 12,
        paddingHorizontal: size && size === 'small' ? 15 : 12,
        borderRadius: size && size === 'small' ? 5 : 10
    }),
    text: (type, disable, size) => ({
        color: type === 'secondary' ? colors.primary : disable === true ? colors.textInput.disable.text : '#786260',
        fontFamily: fonts.primary[500],
        fontSize: size && size === 'small' ? 12 : 14,
        textAlign: 'center'
    }),
    containerMaxContent:
    {
        backgroundColor: colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 5,
        alignSelf: 'flex-end'
    }
})