import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { colors, fonts } from '../../utils'
import { topupAction } from '../../redux/actions/v2'
import {
    TopbarHeader,
    Gap,
    ButtonOpacity,
    InputCurrency
} from '../../components'

const Topup = ({navigation}) => {
    const dispatch = useDispatch()
    const cartCountReducer = useSelector(state => state.countCartReducer.data)
    const [ amount, setAmount ] = useState()
    const [ messageSaldo, setMessageSaldo ] = useState("")
    const TopUpSubmit = () => {
        if(amount < 10000)
        {
            setMessageSaldo("Masukan Saldo Topup Minimal Rp.10.000")
        } 
        else 
        {
            dispatch(topupAction(amount, navigation))
        }
    }
    const TopupResponse = useSelector(state => state.topupReducer.data)
    const error = useSelector(state => state.topupReducer.errorMessage
        && state.topupReducer.errorMessage.data.errors)

    // console.log('error',error)
    return(
        <View style={styles.container}>
            <TopbarHeader
                title="Isi Ulang"
                goBack={() => navigation.goBack()}
                cart={{ onPress: () => navigation.navigate('CartPage') }}
                cartCount={cartCountReducer.total}
            />
            <View style={styles.wrapperTopUp}>
                <InputCurrency 
                    label={"Isi Ulang"}
                    value={amount}
                    onChangeValue={setAmount}
                    onChangeText={(formattedValue) => {
                        console.log('formattedValue',formattedValue); 
                    }}
                    errorMessage={messageSaldo ? messageSaldo : error && error.amount.msg.id}
                />
                <Gap height={20} />
                <Text style={styles.noted}>Nb: Minimal Saldo Topup Rp.10.000</Text>
                <Gap height={20} />
                <ButtonOpacity onPress={TopUpSubmit} title="Isi Ulang" />
            </View>
        </View>
    )
}

export default Topup

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    wrapperTopUp: {
        marginHorizontal: 20,
        marginVertical: 10,
    },
    noted: {
        fontFamily: fonts.primary[400],
        fontSize: 12,
        color: colors.text.primary
    }
})