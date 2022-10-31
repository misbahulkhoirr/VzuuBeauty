import React, { useEffect } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { NewPasswordImage } from '../../assets'
import { ButtonOpacity, Gap, HeaderText, Input } from '../../components'
import { resetPasswordAction } from '../../redux/actions/v2'
import { colors, showError, showSuccess, useForm } from '../../utils'
import { loading as loadingResetPassword } from '../../redux/actions/v2/auth/resetPasswordAction'

const CreateNewPassword = ({ route, navigation }) => {
    const { params = 'Empty params ResetPassword' } = route
    const { email, otp } = params

    const [form, setForm] = useForm({
        email,
        otp,
        new_password: '',
        password_confirmation: ''
    })
    console.log('route', route)
    const dispatch = useDispatch()

    const { errorMessage: error } = useSelector(
        state => state.resetPasswordReducer_v2
    )

    const success = () => showSuccess('Reset Password Berhasil')

    const handleOnSubmit = () => {
        dispatch(resetPasswordAction(form, navigation, { success }))
    }

    useEffect(() => {
        dispatch(loadingResetPassword())
    }, [])

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    {/* Illustration Image */}
                    <View style={styles.image}>
                        <NewPasswordImage width={155} height={155} />
                    </View>

                    {/* Input Form */}
                    <View style={styles.input}>
                        <HeaderText
                            title="Buat Kata Sandi Baru"
                            desc="Kata sandi harus berbeda dari yang sebelumnya"
                        />
                        <Gap height={20} />

                        <Input
                            placeholder="Kata Sandi Baru"
                            value={form.new_password}
                            secureTextEntry={true}
                            onChangeText={value =>
                                setForm('new_password', value)
                            }
                            errorMessage={
                                error?.errors
                                    ? error?.errors?.password?.msg.id
                                    : error?.message?.id
                            }
                        />
                        <Gap height={15} />

                        <Input
                            placeholder="Konfirmasi Kata Sandi Baru"
                            value={form.password_confirmation}
                            secureTextEntry={true}
                            onChangeText={value =>
                                setForm('password_confirmation', value)
                            }
                            errorMessage={
                                error?.errors
                                    ? error?.errors?.password_confirmation?.msg
                                          .id
                                    : error?.message?.id
                            }
                        />
                        <Gap height={35} />
                    </View>

                    {/* Create New Password Button */}
                    <View style={styles.buttonWrapper}>
                        <ButtonOpacity title="Buat" onPress={handleOnSubmit} />
                        <Gap height={15} />
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default CreateNewPassword

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    content: { flex: 1 },
    image: {
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 25
    },
    input: { paddingHorizontal: 25 },
    buttonWrapper: { paddingHorizontal: 55 }
})
