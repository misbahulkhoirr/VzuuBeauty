import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Gap from '../Gap'
import { fonts } from '../../../utils'

const WalletItem = ({title, saldo}) => {
    
    const Convert = wallets => {
        var rupiah = '';		
        var angkarev = wallets.toString().split('').reverse().join('');
        for(var i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';
        return rupiah.split('',rupiah.length-1).reverse().join('');
    }
    return(
        <View style={styles.wrapperWallet}>
            <Text style={styles.titleMoney}>{title}</Text>
            <Gap height={5} />
            <Text style={styles.subtitleMoney}>{title === "Saldo" ? `Rp.`  + Convert(saldo + "") : "" + Convert(saldo + "")}</Text>
        </View>
    )
}

export default WalletItem

const styles = StyleSheet.create({
    wrapperWallet: {
        flex: 1,
        alignItems:'center',
        justifyContent:'center'
    },
    titleMoney: {
        color: '#2C3E50',
        fontFamily: fonts.primary[500],
        fontSize: 16,
        marginBottom: 2
    },
    subtitleMoney: {
        color: '#3b3c3d',
        fontFamily: fonts.primary[400],
        fontSize: 12
    },
})