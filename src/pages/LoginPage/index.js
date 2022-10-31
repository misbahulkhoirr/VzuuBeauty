import React, { useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ButtonOpacity, Gap, HeaderText, Input, Text } from '../../components'
import { colors, fonts, useForm } from '../../utils'
import { SplashImage } from '../../assets'
import { loading as loadingLogin } from '../../redux/actions/v2/auth/loginAction'
import { loading as loadingRegister } from '../../redux/actions/v2/auth/registerAction'
import {
    loginAction,
    loginGoogleAction,
    resendOTPRegistAction
} from '../../redux/actions/v2'
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes
} from '@react-native-google-signin/google-signin'

const LoginPage = ({ navigation }) => {
    const dispatch = useDispatch()
    const { errorMessage: error } = useSelector(state => state.loginReducer_v2)
    const [form, setForm] = useForm({
        email: '',
        password: ''
    })
    console.log('error', error)
    const loginHandler = () => {
        dispatch(loginAction(form, navigation))
    }

    const goToForgotPassword = () => {
        navigation.navigate('ResetPassword')
        dispatch(loadingLogin())
    }

    const goToRegister = () => {
        navigation.navigate('Register')
        dispatch(loadingRegister())
        dispatch(loadingLogin())
    }
    const aktivasiAkun = () => {
        dispatch(resendOTPRegistAction(form, navigation))
    }

    const [isLoginScreenPresented, setIsLoginScreenPresented] = useState()

    const getCurrentUser = async () => {
        const currentUser = await GoogleSignin.getCurrentUser()

        if (currentUser && currentUser.user) {
            signOut()
        }
        console.log('currentUser', currentUser)
    }

    const isSignedIn = async () => {
        const isSignedIn = await GoogleSignin.isSignedIn()
        setIsLoginScreenPresented(!isSignedIn)
    }

    const signOut = async () => {
        try {
            await GoogleSignin.revokeAccess()
            await GoogleSignin.signOut()
        } catch (error) {
            console.error(error)
        }
    }

    const signInWithGoogle = async () => {
        try {
            await GoogleSignin.hasPlayServices()
            const userInfo = await GoogleSignin.signIn()
            console.log('userInfo', userInfo)
            await dispatch(loginGoogleAction(userInfo.user, navigation))
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log('User cancelled the login flow.')
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log('Operation (e.g. sign in) is in progress already.')
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log('Play services not available or outdated.')
            } else {
                console.log('Error:', error)
                console.log('Some other error happened.')
            }
        }
    }

    useEffect(() => {
        AsyncStorage.getItem('token').then(res => {
            console.log('Access Token:', res)
        })

        https: GoogleSignin.configure({
            scopes: [
                'https://www.googleapis.com/auth/userinfo.profile',
                'https://www.googleapis.com/auth/userinfo.email'
            ], // what API you want to access on behalf of the user, default is email and profile
            ClientId:
                // '714410799131-2897bpgqa85am9au4bngue5sd6uuoep0.apps.googleusercontent.com' //Production
                // '714410799131-sqpnoijc7sfkk4k18t3ioibvdfdcitmo.apps.googleusercontent.com' //Develop
                '627217694009-sdc82j8d6a2qqvlqtfhej74rbh3qsgbr.apps.googleusercontent.com'
        })

        isSignedIn()
        getCurrentUser()
    }, [])
    console.log('error', error)
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
                        title="Login"
                        desc="Pesan dan dapatkan harga reseller"
                    />
                    <Gap height={20} />

                    <Input
                        placeholder="E-mail"
                        defaultValue={form.email}
                        onChangeText={value => setForm('email', value)}
                        errorMessage={
                            error &&
                            error.email &&
                            error.email.msg &&
                            error.email.msg.id
                        }
                        aktivasi={() => aktivasiAkun()}
                    />

                    <Gap height={15} />

                    <Input
                        placeholder="Kata Sandi"
                        defaultValue={form.password}
                        onChangeText={value => setForm('password', value)}
                        secureTextEntry={true}
                        errorMessage={
                            error &&
                            error.password &&
                            error.password.msg &&
                            error.password.msg.id
                        }
                    />
                    <Gap height={10} />
                    <Text style={styles.link} onPress={goToForgotPassword}>
                        Lupa kata sandi
                    </Text>
                    <Gap height={35} />

                    <ButtonOpacity title="Login" onPress={loginHandler} />
                    <Gap height={15} />

                    <GoogleSigninButton
                        style={styles.googleButton}
                        size={GoogleSigninButton.Size.Wide}
                        color={GoogleSigninButton.Color.Dark}
                        onPress={signInWithGoogle}
                    />
                    <Gap height={35} />

                    <View style={styles.linkWrapper}>
                        <Text style={styles.label}>Belum punya akun? </Text>
                        <Text style={styles.link} onPress={goToRegister}>
                            Daftar
                        </Text>
                    </View>
                    <Gap height={50} />
                </ScrollView>
            </View>
        </View>
    )
}

export default LoginPage

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
    },
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
    },
    googleButton: { width: '100%' }
})
