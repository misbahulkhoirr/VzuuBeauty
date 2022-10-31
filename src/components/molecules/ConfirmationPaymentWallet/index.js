import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal'
import { colors, fonts } from '../../../utils'
import { Gap, Text, Input } from '../../atoms'

const ConfirmationPaymentWallet = forwardRef(
    (
        {
            title,
            text,
            onCancel,
            onForgotPin,
            onSubmit,
            onChangeText,
            secureTextEntry,
            placeholder,
            errorMessage
        },
        ref
    ) => {
        const [isVisible, setIsVisible] = useState(false)

        useImperativeHandle(ref, () => {
            return {
                show: () => setIsVisible(true),
                hide: () => setIsVisible(false),
                isVisible
            }
        })

        return (
            // <Modal
            //     isVisible={isVisible}
            //     style={styles.modal}
            // >
            <View style={styles.container}>
                <Text style={styles.title}>{title}</Text>
                <Gap height={10} />
                <Input
                    onChangeText={onChangeText}
                    label={text}
                    secureTextEntry={secureTextEntry}
                    placeholder={placeholder}
                    errorMessage={errorMessage}
                />
                <Gap height={15} />
                <Text style={styles.link} onPress={onForgotPin}>
                    Lupa pin ?
                </Text>
                <Gap height={10} />
                <View style={styles.buttonWrapper}>
                    <TouchableOpacity
                        style={styles.button('outline')}
                        onPress={onCancel}>
                        <Text style={styles.textButton('outline')}>
                            Kembali
                        </Text>
                    </TouchableOpacity>
                    <Gap width={5} />
                    <TouchableOpacity
                        style={styles.button()}
                        onPress={onSubmit}>
                        <Text style={styles.textButton()}>Simpan</Text>
                    </TouchableOpacity>
                </View>
            </View>
            // </Modal>
        )
    }
)

export default ConfirmationPaymentWallet

const styles = StyleSheet.create({
    modal: {
        margin: 15
    },
    container: {
        // flex: 1,
        backgroundColor: colors.white,
        padding: 15,
        borderRadius: 10
    },
    title: {
        fontFamily: fonts.primary[500],
        fontSize: 14,
        lineHeight: 21,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        paddingBottom: 10
    },
    text: {
        fontFamily: fonts.primary[400],
        fontSize: 14,
        lineHeight: 21
    },
    buttonWrapper: {
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
    }),
    link: {
        color: '#999999',
        fontFamily: fonts.primary[400],
        fontSize: 12,
        textDecorationLine: 'underline',
        alignSelf: 'flex-start'
    }
})
