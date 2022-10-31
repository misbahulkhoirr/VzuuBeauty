import React, { useEffect, useRef, useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { TopbarHeader, TopupListItem, Gap, Wallet } from '../../components'
import { colors, fonts } from '../../utils'
import { topuplistAction } from '../../redux/actions/v2'
import RBSheet from 'react-native-raw-bottom-sheet'

const TopupList = ({ navigation }) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(topuplistAction())
    }, [])
    const [item, setItem] = useState()
    // console.log('topuplistReducer',topuplistReducer)
    const topuplistReducer = useSelector(state => state.topuplistReducer.data)
    const cartCountReducer = useSelector(state => state.countCartReducer.data)
    const refRBSheet = useRef()

    console.log('topuplistReducer', topuplistReducer)
    const handleIsiUlang = url => {
        navigation.navigate('PaymentMethod', { url: url, prevPage: 'Topup' })
    }

    return (
        <>
            <View style={styles.container}>
                <TopbarHeader
                    title="Riwayat Saldo"
                    goBack={() => navigation.goBack()}
                    cart={{ onPress: () => navigation.navigate('CartPage') }}
                    cartCount={cartCountReducer.total}
                />
                <Gap height={10} />
                <Wallet
                    onPress={() => navigation.navigate('Topup')}
                    saldo={topuplistReducer.balance}
                    title="Saldo"
                />
                <Gap height={10} />
                <FlatList
                    data={topuplistReducer && topuplistReducer.wallet}
                    keyExtractor={({ id }, index) => id}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            onPress={() => {
                                setItem(item)
                                refRBSheet.current.open()
                            }}>
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
                }}>
                <TopupListItem
                    BottomSheet={true}
                    data={item}
                    isiUlang={url => handleIsiUlang(url)}
                />
            </RBSheet>
        </>
    )
}

export default TopupList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    balance: {
        fontFamily: fonts.primary[700],
        fontSize: 20,
        textAlign: 'center',
        color: colors.text.primary
    }
})
