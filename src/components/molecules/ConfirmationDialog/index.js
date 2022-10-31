import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal'
import { colors, fonts } from '../../../utils'
import { Gap, Text } from '../../atoms'

const ConfirmationDialog = forwardRef(({ title, text, onCancel, onSubmit }, ref) =>
{
    const [ isVisible, setIsVisible ] = useState(false)

    useImperativeHandle(ref, () =>
    {
        return {
            show: () => setIsVisible(true),
            hide: () => setIsVisible(false),
            isVisible
        }
    })

    return (
        <Modal
            isVisible={isVisible}
            style={styles.modal}
        >
            <View style={styles.container}>
                <Text style={styles.title}>{title}</Text>
                <Gap height={10} />
                <Text style={styles.text}>{text}</Text>
                <Gap height={10} />
                <View style={styles.buttonWrapper}>
                    <TouchableOpacity
                        style={styles.button('outline')}
                        onPress={onCancel}
                    >
                        <Text style={styles.textButton('outline')}>Tidak</Text>
                    </TouchableOpacity>
                    <Gap width={5} />
                    <TouchableOpacity
                        style={styles.button()}
                        onPress={onSubmit}
                    >
                        <Text style={styles.textButton()}>Ya</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
})

export default ConfirmationDialog

const styles = StyleSheet.create({
    modal:
    {
        margin: 15
    },
    container:
    {
        // flex: 1,
        backgroundColor: colors.white,
        padding: 15,
        borderRadius: 10
    },
    title:
    {
        fontFamily: fonts.primary[500],
        fontSize: 14,
        lineHeight: 21,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        paddingBottom: 10
    },
    text:
    {
        fontFamily: fonts.primary[400],
        fontSize: 14,
        lineHeight: 21
    },
    buttonWrapper:
    {
        flexDirection: 'row',
        paddingTop: 10,
        justifyContent: 'center'
    },
    button: type => ({
        width: 75,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.primary,
        backgroundColor: type === 'outline' ? 'transparent' : colors.primary
    }),
    textButton: type => ({
        color: type === 'outline' ? colors.primary : colors.white,
        fontFamily: fonts.primary[500],
        fontSize: 12,
        lineHeight: 19,
        textAlign: 'center'
    })
})