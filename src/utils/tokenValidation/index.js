import AsyncStorage from '@react-native-async-storage/async-storage'
import { showError } from '../showMessage'

export const tokenValidation = (reducer, navigation) =>
{

    if(reducer !== null)
        {
            if(reducer && reducer.status === 401)
            {
                AsyncStorage.removeItem('access_token')
    
                showError('Please login again.')
    
                setTimeout(() =>
                {
                    navigation.navigate('Login')
                }, 2000)
            }
        }
}