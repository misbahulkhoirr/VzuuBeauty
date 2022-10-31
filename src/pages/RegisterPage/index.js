import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { ButtonOpacity, Gap, HeaderText, Input, Text } from '../../components'
import { colors, fonts, showSuccess, useForm } from '../../utils'
import { registerAction } from '../../redux/actions/v2/auth'
import { loading as loadingLogin } from '../../redux/actions/v2/auth/loginAction'

const RegisterPage = ({ navigation }) => {
    const dispatch = useDispatch()
    const { errorMessage: error } = useSelector(
        state => state.registerReducer_v2
    )

    const [form, setForm] = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone: ''
    })

    const registerHandler = () => {
        dispatch(registerAction(form, navigation))
    }

    const onLogin = () => {
        navigation.navigate('Login')
        dispatch(loadingLogin())
    }
    console.log('error', error)
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <ScrollView
                    style={styles.scrollView}
                    showsVerticalScrollIndicator={false}>
                    <Gap height={50} />
                    <HeaderText title="Daftar" desc="Buat akun baru" />
                    <Gap height={20} />

                    <Input
                        placeholder="Nama Lengkap"
                        defaultValue={form.name}
                        onChangeText={value => setForm('name', value)}
                        errorMessage={
                            error.data &&
                            error.data.errors &&
                            error.data.errors.name &&
                            error.data.errors.name.msg &&
                            error.data.errors.name.msg.id
                        }
                    />
                    <Gap height={15} />

                    <Input
                        placeholder="E-mail"
                        defaultValue={form.email}
                        onChangeText={value => setForm('email', value)}
                        errorMessage={
                            (error.data &&
                                error.data.errors &&
                                error.data.errors.email &&
                                error.data.errors.email.msg &&
                                error.data.errors.email.msg.id) ||
                            (error.data &&
                                error.data.message ===
                                    'The E-mail already in use' &&
                                error.data.message)
                        }
                    />
                    <Gap height={15} />

                    <Input
                        placeholder="Kata Sandi"
                        defaultValue={form.password}
                        onChangeText={value => setForm('password', value)}
                        secureTextEntry={true}
                        errorMessage={
                            error.data &&
                            error.data.errors &&
                            error.data.errors.password &&
                            error.data.errors.password.msg &&
                            error.data.errors.password.msg.id
                        }
                    />
                    <Gap height={15} />

                    <Input
                        placeholder="Konfirmasi Kata Sandi"
                        defaultValue={form.password_confirmation}
                        onChangeText={value =>
                            setForm('password_confirmation', value)
                        }
                        secureTextEntry={true}
                        errorMessage={
                            error.data &&
                            error.data.errors &&
                            error.data.errors.password_confirmation &&
                            error.data.errors.password_confirmation.msg &&
                            error.data.errors.password_confirmation.msg.id
                        }
                    />
                    <Gap height={15} />

                    <Input
                        placeholder="Nomor Ponsel / Telepon"
                        defaultValue={form.phone}
                        onChangeText={value => setForm('phone', value)}
                        keyboardType={'numeric'}
                        errorMessage={
                            error.data &&
                            error.data.errors &&
                            error.data.errors.phone &&
                            error.data.errors.phone.msg &&
                            error.data.errors.phone.msg.id
                        }
                    />
                    <Gap height={15} />

                    {/* <Select
                        placeholder="Pilih Provinsi"
                        data={provinces}
                        onChange={id => pickData('province', id)}
                        defaultValue={'' + form.province_id}
                        renderItems={(item, index) => (
                            <Select.Item
                                label={item.province}
                                value={item.province_id}
                                key={index}
                            />
                        )}
                    />
                    <Gap height={15} />
                    
                    {form.province_id !== '' &&
                        <>
                            <Select
                                placeholder="Pilih Kota"
                                data={cities}
                                onChange={id => pickData('city', id)}
                                defaultValue={'' + form.city_id}
                                renderItems={(item, index) => (
                                    <Select.Item
                                        label={item.city_name}
                                        value={item.city_id}
                                        key={index}
                                    />
                                )}
                            />
                            <Gap height={15} />
                        </>
                    }

                    {form.city_id !== '' &&
                        <>
                            <Select
                                placeholder="Pilih Kecamatan"
                                data={subDistricts}
                                onChange={id => pickData('subdistrict', id)}
                                defaultValue={'' + form.subdistrict_id}
                                renderItems={(item, index) => (
                                    <Select.Item
                                        label={item.subdistrict_name}
                                        value={item.subdistrict_id}
                                        key={index}
                                    />
                                )}
                            />
                            <Gap height={15} />
                        </>
                    }

                    <TextArea
                        placeholder="Masukkan alamat detail (nama jalan, blok rumah, dan sebagainya.)"
                        defaultValue={form.address}
                        onChangeText={value => setForm('address', value)}
                        errorMessage={error.data && error.data.message === 'Please complete the address form'
                            && error.data.message}
                    />
                    <Gap height={35} /> */}

                    <ButtonOpacity title="Daftar" onPress={registerHandler} />
                    <Gap height={15} />

                    <View style={styles.linkWrapper}>
                        <Text style={styles.label}>Sudah punya akun? </Text>
                        <Text style={styles.link} onPress={onLogin}>
                            Login
                        </Text>
                    </View>
                    <Gap height={50} />
                </ScrollView>
            </View>
        </View>
    )
}

export default RegisterPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    content: { flex: 1 },
    scrollView: { paddingHorizontal: 45 },
    label: {
        fontFamily: fonts.primary[400],
        fontSize: 12
    },
    linkWrapper: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    link: {
        color: '#999999',
        fontFamily: fonts.primary[400],
        fontSize: 12,
        textDecorationLine: 'underline',
        alignSelf: 'flex-start'
    }
})
