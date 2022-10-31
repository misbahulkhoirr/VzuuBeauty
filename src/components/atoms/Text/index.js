import React from 'react'
import { StyleSheet, Text as TextField } from 'react-native'
import { fonts } from '../../../utils'

const Text = ({ style, children, ...rest }) =>
{
    return (
        <TextField
            style={style ? [styles.text, style] : styles.text}
            {...rest}
        >
            {children}
        </TextField>
    )
}

export default Text

const styles = StyleSheet.create({
    text:
    {
        color: '#757575',
        fontFamily: fonts.primary[400]
    }
})