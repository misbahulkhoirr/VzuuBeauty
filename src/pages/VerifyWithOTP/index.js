import React, { useEffect } from 'react'
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { VerifyEmailImage } from '../../assets'
import {
    ButtonOpacity,
    Gap,
    HeaderText,
    OTPInput,
    ValidationTextError
} from '../../components'
import {
    activasiAccountAction,
    forgotPasswordAction,
    resendOTPRegistAction,
    verifyOTPAction
} from '../../redux/actions/v2'
import { colors, fonts, showSuccess, storeData, useForm } from '../../utils'
import { loading as loadingVerifyOTP } from '../../redux/actions/v2/auth/verifyOTPAction'
import { loading as loadingActivasiAccountOTP } from '../../redux/actions/v2/auth/activasiAccountAction'
import { loading as loadingLogin } from '../../redux/actions/v2/auth/loginAction'

const VerifyWithOTP = ({ route, navigation }) => {
    const { params = 'Empty params VerifyEmail' } = route
    const { email, fromPage } = params
    const [form, setForm] = useForm({
        otp: '',
        email
    })

    const dispatch = useDispatch()
    const Validation = useSelector(state =>
        fromPage === 'RegisterPage'
            ? state.activasiAccountReducer_v2.errorMessage
            : state.verifyOTPReducer_v2.errorMessage
    )
    const OTPSuccess = useSelector(state =>
        fromPage === 'RegisterPage'
            ? state.activasiAccountReducer_v2.data
            : state.verifyOTPReducer_v2.data
    )
    const success = () => showSuccess('Akun anda telah aktif.')

    const handleSubmit = () => {
        if (fromPage === 'RegisterPage')
            dispatch(activasiAccountAction(form, navigation, { success }))
        dispatch(loadingLogin())
        if (fromPage === 'ForgotPassword')
            dispatch(verifyOTPAction(form, navigation))
    }

    const handleResendOTP = () => {
        if (fromPage === 'RegisterPage')
            dispatch(resendOTPRegistAction(form, navigation))
        if (fromPage === 'ForgotPassword')
            dispatch(forgotPasswordAction(form, navigation))
    }

    useEffect(() => {
        dispatch(loadingVerifyOTP())
        dispatch(loadingActivasiAccountOTP())
    }, [])
    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    {/* Illustration Image */}
                    <View style={styles.image}>
                        <VerifyEmailImage width={155} height={155} />
                    </View>

                    {/* Input Form */}
                    <View style={styles.input}>
                        <HeaderText
                            title="Verifikasi Akunmu"
                            // desc={`Silakan masukkan 6 digit kode yang dikirimkan ke ${itemEmail}`}
                            desc="Silakan masukkan 6 digit kode yang dikirimkan ke akun@email.com"
                        />
                        <Gap height={20} />

                        <OTPInput
                            onLastInputFilled={value => setForm('otp', value)}
                        />
                        {Validation && (
                            <ValidationTextError
                                message={
                                    Validation?.errors
                                        ? Validation?.errors?.otp?.msg.id
                                        : Validation?.message.id
                                }
                            />
                        )}
                        <Gap height={35} />
                    </View>

                    {/* Send Button */}
                    <View style={styles.buttonWrapper}>
                        <ButtonOpacity
                            title="Konfirmasi"
                            onPress={handleSubmit}
                        />
                        <Gap height={15} />
                    </View>

                    {/* Link to Resend OTP */}
                    <View style={styles.linkWrapper}>
                        <Text style={styles.text}>
                            Tidak menerima kodenya?{' '}
                        </Text>
                        <Text style={styles.link} onPress={handleResendOTP}>
                            Kirim ulang
                        </Text>
                        <Gap height={35} />
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default VerifyWithOTP

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
    buttonWrapper: { paddingHorizontal: 55 },
    linkWrapper: {
        justifyContent: 'center',
        flexDirection: 'row'
    },
    link: {
        color: '#999999',
        fontFamily: fonts.primary[400],
        fontSize: 14,
        textDecorationLine: 'underline',
        alignSelf: 'flex-start'
    },
    text: {
        color: colors.text.secondary,
        fontFamily: fonts.primary[400],
        fontSize: 14
    },
    textInputWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textInput: {
        color: colors.text.primary,
        fontFamily: fonts.primary[600],
        fontSize: 16,
        textAlign: 'center',
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 12,
        paddingVertical: 8,
        paddingHorizontal: 20,
        backgroundColor: '#f9f9f9',
        flex: 1
    }
})
