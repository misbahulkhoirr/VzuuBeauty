import React, { useEffect } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { ButtonOpacity, Gap, Input, TopbarHeader } from '../../components'
import { forgotPinAction } from '../../redux/actions/v2'
import { loading as loadingForgotPin } from '../../redux/actions/v2/account/forgotPinAction'
import { colors, showSuccess, useForm } from '../../utils'

const CreateNewPin = ({ navigation }) => {
    const dispatch = useDispatch()
    const { errorMessage: error } = useSelector(state => state.forgotPinReducer)
    const [form, setForm] = useForm({
        new_pin: '',
        pin_confirmation: ''
    })

    const goBack = () => {
        navigation.goBack()
    }

    const success = () => showSuccess('Berhasil.')

    const onSubmit = () => {
        dispatch(forgotPinAction(form, navigation, { success, setForm }))
    }
    useEffect(() => {
        dispatch(loadingForgotPin())
    }, [])

    return (
        <View style={styles.container}>
            <TopbarHeader title="PIN" goBack={goBack} />
            <View style={styles.content}>
                <ScrollView
                    style={styles.scrollView}
                    showsVerticalScrollIndicator={false}>
                    <Gap height={15} />

                    <Input
                        placeholder="Pin Baru"
                        defaultValue={form.new_pin}
                        onChangeText={value => setForm('new_pin', value)}
                        secureTextEntry={true}
                        errorMessage={
                            error.data &&
                            error.data.errors &&
                            error.data.errors.new_pin &&
                            error.data.errors.new_pin.msg &&
                            error.data.errors.new_pin.msg.id
                        }
                    />
                    <Gap height={15} />

                    <Input
                        placeholder="Konfirmasi Pin Baru"
                        defaultValue={form.pin_confirmation}
                        onChangeText={value =>
                            setForm('pin_confirmation', value)
                        }
                        secureTextEntry={true}
                        errorMessage={
                            (error.data &&
                                error.data.errors &&
                                error.data.errors.pin_confirmation &&
                                error.data.errors.pin_confirmation.msg &&
                                error.data.errors.pin_confirmation.msg.id) ||
                            (error.data &&
                                error.data.message ===
                                    'Password confirmation does not match' &&
                                error.data.message)
                        }
                    />
                    <Gap height={35} />

                    <ButtonOpacity title="Buat" onPress={onSubmit} />
                    <Gap height={50} />
                </ScrollView>
            </View>
        </View>
    )
}

export default CreateNewPin

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    content: { flex: 1 },
    scrollView: { paddingHorizontal: 45 }
})
