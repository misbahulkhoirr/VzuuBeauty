import React, { useEffect, useRef, useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {
    TopbarHeader,
    TopupListItem,
    Gap,
    Wallet,
    WalletItem
} from '../../components'
import { colors, fonts } from '../../utils'
import { topuplistAction } from '../../redux/actions/v2'
import RBSheet from "react-native-raw-bottom-sheet";

const PointList = ({navigation}) => {
    // const dispatch = useDispatch()
    // useEffect(() => {
    //     dispatch(topuplistAction())
    // },[])
    // const [item, setItem] = useState()
    // // console.log('topuplistReducer',topuplistReducer)
    // const topuplistReducer = useSelector(state => state.topuplistReducer.data)
    // const cartCountReducer = useSelector(state => state.countCartReducer.data)
    // const refRBSheet = useRef();
    return (
        <>
        {/* <View style={styles.container}>
            <TopbarHeader
                title="Riwayat Point"
                goBack={() => navigation.goBack()}
                cart={{ onPress: () => navigation.navigate('CartPage') }}
                cartCount={cartCountReducer.total}
            />
            <Gap height={10}/>
            <Wallet 
                onPress={() => navigation.navigate('Topup')} 
                saldo={topuplistReducer.balance} 
                title="Loyalty"
            />
            <Gap height={10} />
            <FlatList
                data={topuplistReducer && topuplistReducer.wallet}
                keyExtractor={({ id }, index) => id}
                renderItem={({ item, index }) => (
                    <TouchableOpacity onPress={ () => { setItem(item);  refRBSheet.current.open(); }}>
                        <TopupListItem data={item} />
                    </TouchableOpacity>
                )}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            />
        </View>
        <RBSheet
        ref={refRBSheet}
        height={200}
        openDuration={150}
        customStyles={{
        container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 20
        }
        }}
        >
            <TopupListItem BottomSheet={true} data={item} />
        </RBSheet> */}
        <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
            <Text style={{fontFamily:fonts.primary[700], fontSize:20, color: colors.text.primary}}>Cooming Soon...</Text>
        </View>
        </>
    )
}

export default PointList 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    balance: {
        fontFamily: fonts.primary[700],
        fontSize: 20,
        textAlign:"center",
        color: colors.text.primary
    }
})