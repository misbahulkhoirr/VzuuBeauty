import React, { useEffect } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { ButtonOpacity, Gap, Input, TopbarHeader } from '../../components'
import { changePasswordAction } from '../../redux/actions/v2'
import { colors, showSuccess, useForm } from '../../utils'
import { loading as loadingChangePassword } from '../../redux/actions/v2/account/changePasswordAction'

const ChangeProfilePassword = ({ navigation }) => {
    const dispatch = useDispatch()
    const { errorMessage: error } = useSelector(
        state => state.changePasswordReducer
    )
    const dataUser = useSelector(state => state.profileReducer.data)

    const [form, setForm] = useForm({
        old_password: '',
        new_password: '',
        password_confirmation: ''
    })

    const goBack = () => {
        navigation.goBack()
    }

    const success = () => showSuccess('Pengubahan kata sandi berhasil.')

    const changePasswordHandler = () => {
        dispatch(changePasswordAction(form, navigation, { success, setForm }))
    }
    useEffect(() => {
        dispatch(loadingChangePassword())
    }, [])

    return (
        <View style={styles.container}>
            <TopbarHeader title="Ubah Kata Sandi" goBack={goBack} />
            <View style={styles.content}>
                <ScrollView
                    style={styles.scrollView}
                    showsVerticalScrollIndicator={false}>
                    <Gap height={15} />
                    {dataUser.is_password == 'true' ? (
                        <Input
                            placeholder="Kata Sandi Lama"
                            defaultValue={form.old_password}
                            onChangeText={value =>
                                setForm('old_password', value)
                            }
                            secureTextEntry={true}
                            errorMessage={
                                (error.data &&
                                    error.data.errors &&
                                    error.data.errors.old_password &&
                                    error.data.errors.old_password.msg &&
                                    error.data.errors.old_password.msg.id) ||
                                (error.data &&
                                    error.data.message ===
                                        'The old password is incorrect' &&
                                    error.data.message)
                            }
                        />
                    ) : null}

                    <Gap height={15} />

                    <Input
                        placeholder="Kata Sandi Baru"
                        defaultValue={form.new_password}
                        onChangeText={value => setForm('new_password', value)}
                        secureTextEntry={true}
                        errorMessage={
                            error.data &&
                            error.data.errors &&
                            error.data.errors.new_password &&
                            error.data.errors.new_password.msg &&
                            error.data.errors.new_password.msg.id
                        }
                    />
                    <Gap height={15} />

                    <Input
                        placeholder="Konfirmasi Kata Sandi Baru"
                        defaultValue={form.password_confirmation}
                        onChangeText={value =>
                            setForm('password_confirmation', value)
                        }
                        secureTextEntry={true}
                        errorMessage={
                            (error.data &&
                                error.data.errors &&
                                error.data.errors.password_confirmation &&
                                error.data.errors.password_confirmation.msg &&
                                error.data.errors.password_confirmation.msg
                                    .id) ||
                            (error.data &&
                                error.data.message ===
                                    'Password confirmation does not match' &&
                                error.data.message)
                        }
                    />
                    <Gap height={35} />

                    <ButtonOpacity
                        title="Ubah"
                        onPress={changePasswordHandler}
                    />
                    <Gap height={50} />
                </ScrollView>
            </View>
        </View>
    )
}

export default ChangeProfilePassword

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    content: { flex: 1 },
    scrollView: { paddingHorizontal: 45 }
})
