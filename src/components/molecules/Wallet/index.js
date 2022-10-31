import React from 'react'
import { View, Pressable, StyleSheet, Text } from 'react-native' 
import { IconMoney, WalletItem, BadgeWalletItem } from '../../atoms'
import { colors, fonts } from '../../../utils'

const Wallet = ({ onPress, saldo, BadgeWallet, title }) => {
    if(BadgeWallet)
    {
        return (
            <View style={styles.wrapperSaldo}>
                <BadgeWalletItem onPress={onPress.saldo} title={title.titleWallet} saldo={saldo.saldoWallet} />
                <BadgeWalletItem onPress={onPress.point} title={title.titlePoint} Points saldo={saldo.saldoPoints} />
            </View>
        )
    }
    return(
        <View style={styles.contentMoney(title)}>
            {/* <Pressable style={styles.wrapperIconMoney} onPress={onPress}>
                <IconMoney size={40} color={'#2C3E50'} />
                <Text style={styles.textTopup}>Topup</Text>
            </Pressable> */}
            <View style={styles.wrapperMoney}>
                <WalletItem title={title} saldo={saldo} />
                {/* <WalletItem title={"Total Points"} saldo={saldoPoints} /> */}
                {title === "Saldo" &&  
                    <Pressable style={styles.wrapperIconMoney} onPress={onPress}>
                        <IconMoney size={30} color={'#2C3E50'} />
                        <Text style={styles.textTopup}>Topup</Text>
                    </Pressable>
                }
                
            </View>
        </View>
    )
}

export default Wallet

const styles = StyleSheet.create({
    contentMoney: title => ({
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 10,
        paddingVertical: title === "Loyalty" ? 10 : 0,
        paddingHorizontal: 10,
        marginHorizontal:20,
    }),
    wrapperIconMoney: {
        flex: 1,
        marginVertical:5,
        paddingVertical:5,
        alignItems:'center',
    },
    wrapperMoney: {
        flexDirection:'row',
    },
    textTopup: {
        textAlign:'center',
        fontFamily: fonts.primary[500],
        fontSize: 14,
        color: colors.text.primary
    },
    wrapperSaldo: {
        width:"100%",
        height:50,
        flexDirection:'row',
        backgroundColor: colors.white,
        borderWidth:1,
        borderColor: colors.border,
        borderRadius: 10
    }
})