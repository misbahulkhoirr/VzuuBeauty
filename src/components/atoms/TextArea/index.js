import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { colors, fonts } from '../../../utils'

const TextArea = ({ label, placeholder, secureTextEntry, defaultValue, editable, errorMessage, ...rest }) =>
{
    return (
        <View>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput
                style={styles.textArea(editable)}
                placeholder={placeholder}
                placeholderTextColor={colors.text.placeholder}
                multiline={true}
                numberOfLines={5}
                editable={editable}
                defaultValue={defaultValue}
                {...rest}
            />
            {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
        </View>
    )
}

export default TextArea

const styles = StyleSheet.create({
    label:
    {
        color: colors.text.secondary,
        fontFamily: fonts.primary[400],
        marginBottom: 5,
        marginLeft: 5
    },
    textArea: editable => ({
        color: editable === false ? colors.textInput.disable.text : colors.textInput.enable.text,
        fontFamily: fonts.primary[400],
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 15,
        backgroundColor: editable === false ? colors.textInput.disable.background : colors.textInput.enable.background
    }),
    error:
    {
        color: colors.error,
        fontFamily: fonts.primary[400],
        marginTop: 5,
        marginLeft: 5
    }
})
