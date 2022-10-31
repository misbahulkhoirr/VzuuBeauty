import React, { useEffect } from 'react'
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Gap, Text, TopbarHeader, IconTime } from '../../components'
import { colors, useForm, storeData } from '../../utils'

const SearchPage = ({ navigation }) => {
    const [form, setForm] = useForm({
        search: '',
        search_id: '',
        search_histories: null
    })

    const submitSearch = () => {
        AsyncStorage.getItem('SearchHistories', (err, result) => {
            const k = []
            const a = JSON.parse(result)

            if (result !== null) {
                a.push({ keyword: form.search })
                storeData('SearchHistories', a)
                setForm('search_histories', a)
            } else {
                k.push({ keyword: form.search })
                storeData('SearchHistories', k)
                setForm('search_histories', k)
            }
        })

        navigation.navigate('ProductList', { FromSearch: form.search, fromPage: "Search" })
    }

    const removeHistory = async name => {
        try {
            let usersJSON = await form.search_histories
            let usersArray = usersJSON
            const alteredUsers = usersArray.filter(e => e.keyword !== name)

            AsyncStorage.setItem(
                'SearchHistories',
                JSON.stringify(alteredUsers)
            )
            setForm('search_histories', alteredUsers)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        AsyncStorage.getItem('SearchHistories').then(contacts =>
            setForm('search_histories', JSON.parse(contacts))
        )
    }, [])

    return (
        <View style={styles.container}>
            <TopbarHeader
                title="Search"
                goBack={() => navigation.goBack()}
                useSearch={{
                    placeholder: 'Telusuri ...',
                    onChangeText: value => setForm('search', value),
                    onPress: submitSearch,
                    isValueExist: form.search
                }}
            />
            <ScrollView
                style={styles.searchHistoryListWrapper}
                showsVerticalScrollIndicator={false}>
                <Gap height={15} />
                {form.search_histories &&
                    form.search_histories.map((item, idx) => (
                        <View style={styles.searchHistoryList} key={idx}>
                            <View style={styles.textWrapper}>
                                <IconTime size={18} />
                                <Gap width={8} />
                                <TouchableOpacity
                                    onPress={() =>
                                        navigation.navigate('ProductList', {
                                            FromSearch: item.keyword,
                                            fromPage: "Search"
                                        })
                                    }>
                                    <Text style={styles.texthistory}>
                                        {item.keyword}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                                style={styles.removeButton}
                                onPress={() => removeHistory(item.keyword)}>
                                <Text style={styles.texthistory}>x</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                <Gap height={10} />
            </ScrollView>
        </View>
    )
}

export default SearchPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    searchHistoryListWrapper: { paddingHorizontal: 15 },
    searchHistoryList: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5,
        marginBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: colors.border
    },
    texthistory: { fontSize: 12 },
    removeButton: {
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textWrapper: {
        borderwidth: 1,
        flexDirection: 'row',
        alignItems: 'center'
    }
})
