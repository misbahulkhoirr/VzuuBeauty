import React, { useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, View } from 'react-native'
import { ButtonOpacity, Gap, HeaderText, Input } from '../../components'
import { colors, useForm } from '../../utils'
import { SplashImage } from '../../assets'
import { forgotPasswordAction } from '../../redux/actions/v2'
import { useDispatch, useSelector } from 'react-redux'
import { loading as loadingForgotPassword } from '../../redux/actions/v2/auth/forgotPasswordAction'

const ResetPassword = ({ navigation }) => {
    const dispatch = useDispatch()
    const { errorMessage: error } = useSelector(
        state => state.forgotPasswordReducer_v2
    )
    const [form, setForm] = useForm({
        email: ''
    })
    const resetPasswordHandler = () => {
        dispatch(forgotPasswordAction(form, navigation))
    }

    useEffect(() => {
        dispatch(loadingForgotPassword())
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <ScrollView
                    style={styles.scrollView}
                    showsVerticalScrollIndicator={true}>
                    <Gap height={15} />
                    <View style={styles.imageWrapper}>
                        <Image source={SplashImage} style={styles.image} />
                    </View>

                    <HeaderText
                        title="Reset Kata Sandi"
                        desc="Masukkan e-mail terdaftar untuk menerima instruksi reset"
                    />
                    <Gap height={20} />

                    <Input
                        placeholder="E-mail"
                        defaultValue={form.email}
                        onChangeText={value => setForm('email', value)}
                        errorMessage={error.email && error.email.msg.id}
                    />
                    <Gap height={35} />

                    <ButtonOpacity
                        title="Submit"
                        onPress={resetPasswordHandler}
                    />
                    <Gap height={50} />
                </ScrollView>
            </View>
        </View>
    )
}

export default ResetPassword

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    content: { flex: 1 },
    scrollView: { paddingHorizontal: 45 },
    imageWrapper: { alignItems: 'center' },
    image: {
        resizeMode: 'contain',
        width: 185,
        height: 185
    }
})
