import React, { useEffect, useRef } from 'react'
import { ActivityIndicator, BackHandler } from 'react-native'
import { WebView } from 'react-native-webview'
import { useIsFocused } from '@react-navigation/native'
import Orientation from 'react-native-orientation'
import { TopbarHeader } from '../../components'
import { useDispatch } from 'react-redux'
import { topuplistAction, transactionsAction } from '../../redux/actions/v2'

const PaymentMethod = ({ navigation, route }) => {
    const uRL = route.params.url
    const webViewRef = useRef(null)
    const isFocused = useIsFocused()
    const dispatch = useDispatch()
    useEffect(() => {
        Orientation.lockToPortrait()
    }, [])
    useEffect(() => {
        if (!isFocused) Orientation.lockToPortrait()
        function handleBackButton() {
            if (route.params && route.params.prevPage === 'Topup') {
                dispatch(topuplistAction())
                navigation.navigate('TopupList')
            } else {
                dispatch(transactionsAction(5))
                navigation.navigate('Transaksi', { From: 'transaksi' })
            }
            return true
        }

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            handleBackButton
        )

        return () => backHandler.remove()
    }, [isFocused])

    const injectJS = `document.getElementById('unity-canvas').style.width = "100vw"
                      document.getElementById('unity-canvas').style.height = "100vh"
                      document.body.style.margin = 0
                      true`
    const onBrowserMessage = event => {
        console.log(event.nativeEvent.data)
    }
    console.log('topup', route.params && route.params.prevPage)
    const back = () => {
        if (route.params && route.params.prevPage === 'Topup') {
            dispatch(topuplistAction())
            navigation.navigate('TopupList')
        } else {
            dispatch(transactionsAction(5))
            navigation.navigate('Transaksi', { From: 'transaksi' })
        }
    }
    return (
        <>
            <TopbarHeader title="Kembali" goBack={back} />
            <WebView
                source={{ uri: uRL }}
                style={{ margin: -5 }}
                originWhitelist={['*']}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                scrollEnabled={false}
                startInLoadingState={true}
                renderLoading={() => <ActivityIndicator />}
                ref={webViewRef}
                injectedJavaScript={injectJS}
                onMessage={onBrowserMessage}
            />
        </>
    )
}

export default PaymentMethod
