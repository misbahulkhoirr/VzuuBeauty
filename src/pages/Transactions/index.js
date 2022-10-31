import React, { useCallback, useState, useEffect } from 'react'
import {
    StyleSheet,
    View,
    ScrollView,
    RefreshControl,
    FlatList
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {
    Gap,
    TopbarHeader,
    TopTabNavigator,
    TransactionList
} from '../../components'
import {
    cekResiAction,
    countCartAction,
    profileAction,
    transactionsAction
} from '../../redux/actions/v2'
import { colors } from '../../utils'

const Transactions = ({ navigation, route }) => {
    const data = useSelector(state => state.profileReducer.data)
    const transactionsReducer = useSelector(
        state => state.transactionsReducer.data
    )
    console.log('transactionsReducer', transactionsReducer)
    const cartCountReducer = useSelector(state => state.countCartReducer.data)

    const user_id = data.id

    const [label, setLabel] = useState()
    const dispatch = useDispatch()
    const [tabList, setTabList] = useState([
        { id: 5, label: 'Belum Bayar' },
        { id: 6, label: 'Dikemas' },
        { id: 7, label: 'Dikirim' },
        { id: 8, label: 'Selesai' },
        { id: 9, label: 'Dibatalkan' }
    ])

    const [tabName, setTabName] = useState({
        label: 'Belum Bayar'
    })

    const [initialName, setInitialName] = useState(false)

    const [refreshing, setRefreshing] = useState(false)

    const wait = timeout => {
        return new Promise(resolve => setTimeout(resolve, timeout))
    }

    const onRefresh = useCallback(() => {
        wait(1000).then(() => setRefreshing(false))
        getLiveData(5, user_id)
        setInitialName(true)
        setTabName({ label: 'Belum Bayar' })
    }, [])

    const getLiveData = (id, user_id) => {
        dispatch(transactionsAction(id, user_id))

        if (id === 5) {
            setTabName({ label: 'Belum Bayar' })
            setInitialName(false)
        } else if (id === 6) {
            setTabName({ label: 'Dikemas' })
            setInitialName(false)
        } else if (id === 7) {
            setTabName({ label: 'Dikirim' })
            setInitialName(false)
        } else if (id === 8) {
            setTabName({ label: 'Selesai' })
            setInitialName(false)
        } else if (id === 9) {
            setTabName({ label: 'Dibatalkan' })
            setInitialName(false)
        }
    }

    useEffect(() => {
        dispatch(profileAction())
        dispatch(countCartAction())
        getLiveData(5, user_id)

        if (route.params && route.params.From === 'transaksi') {
            // getLiveData(5, user_id)
            setInitialName(true)
            setTabName({ label: 'Belum Bayar' })
        }
    }, [route])

    const handlePayment = url => {
        navigation.navigate('PaymentMethod', { url })
    }

    const handleTracking = data => {
        dispatch(cekResiAction(data, navigation))
    }
    // console.log('transactionsReducer', transactionsReducer)
    return (
        <View style={styles.container}>
            <TopbarHeader
                title="Transaksi"
                useLogo={true}
                cart={{ onPress: () => navigation.navigate('CartPage') }}
                cartCount={cartCountReducer.total}
            />
            <FlatList
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                ListHeaderComponent={
                    <TopTabNavigator
                        setLabel={setLabel}
                        tabNavigator={{
                            setLabel: setLabel,
                            tabList: tabList,
                            initialTabName: tabName.label,
                            onTabItemPress: currTabId =>
                                getLiveData(currTabId, user_id),
                            initialName: initialName
                        }}
                    />
                }
                data={transactionsReducer}
                keyExtractor={({ id }, index) => id}
                renderItem={({ item, index }) => (
                    <View style={styles.content}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <Gap height={10} />
                            <TransactionList
                                data={item}
                                navigation={navigation}
                                handleButtonPayment={url => handlePayment(url)}
                                handleButtonTracking={data =>
                                    handleTracking(data)
                                }
                                handleButtonBeliLagi={id =>
                                    navigation.navigate('ProductDetail', id)
                                }
                            />
                            <Gap height={40} />
                        </ScrollView>
                    </View>
                )}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

export default Transactions

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    content: {
        paddingHorizontal: 15,
        flex: 1,
        marginBottom: -50
    }
})
