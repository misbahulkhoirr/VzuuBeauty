import React, { useEffect } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SplashImage } from '../../assets'

const Splash = ({ navigation }) => {
    useEffect(() => {
        const checkToken = async () => {
            const access_token = await AsyncStorage.getItem('access_token')

            if (access_token) {
                setTimeout(() => {
                    navigation.replace('MainApp')
                }, 1500)
            } else {
                setTimeout(() => {
                    navigation.replace('Login')
                }, 1500)
            }
        }

        checkToken()
    }, [])

    return (
        <View style={styles.page}>
            {/* <Text style={styles.title}>Splash Screen</Text> */}
            <Image source={SplashImage} style={{ width: 300, height: 300 }} />
        </View>
    )
}

export default Splash

const styles = StyleSheet.create({
    page: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 20
    }
})
