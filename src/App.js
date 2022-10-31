import React, { useEffect, useState } from 'react'
import { LogBox } from 'react-native'
import NetInfo from '@react-native-community/netinfo';
import { Provider, useSelector } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import FlashMessage from 'react-native-flash-message'
import { NativeBaseProvider } from 'native-base'
import { Loading } from './components'
import Router from './routes'
import store from './redux/store'
import { showError, showSuccess } from './utils'

const MainApp = () => {
    const globalState = useSelector(state => state.globalReducer)
    LogBox.ignoreLogs(['Require cycle: node_modules\\axios'])
    const [internet, setInternet] = useState()
      
    useEffect(() => {
        const unsubscribe =  NetInfo.addEventListener(state => {
            if(state.isInternetReachable === false)
            {
                setInternet(true)
            }
            else
            {
                setInternet(false)
            }
        });
    },[])

    useEffect(() => {
        if(internet)
        {
            showError('Internet anda mati.')
        }else{
            // showSuccess('Internet Hidup kembali')
            console.log('Internet Jalan')
        }
    },[internet])

    return (
        <>
            <NavigationContainer>
                <NativeBaseProvider>
                    <Router />
                </NativeBaseProvider>
            </NavigationContainer>
            <FlashMessage position="top" />
            {globalState.loading && <Loading />}
        </>
    )
}

const App = () => {
    return (
        <Provider store={store}>
            <MainApp />
        </Provider>
    )
}

export default App
