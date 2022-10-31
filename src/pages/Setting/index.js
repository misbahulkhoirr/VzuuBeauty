import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Gap, SectionMenu, TopbarHeader } from '../../components'
import { colors } from '../../utils'

const Setting = ({ navigation }) => {
    const menuList = [
        {
            id: 1,
            icon: 'pencil',
            label: 'Perbarui Data Diri',
            onPress: () => navigation.navigate('EditProfile')
        },
        {
            id: 2,
            icon: 'key',
            label: 'Ubah Kata Sandi',
            onPress: () => navigation.navigate('ChangeProfilePassword')
        },
        {
            id: 3,
            icon: 'store-front',
            label: 'Daftar Alamat',
            onPress: () => navigation.navigate('Address')
        },
        {
            id: 4,
            icon: 'key',
            label: 'PIN',
            onPress: () => navigation.navigate('ChangePin')
        }
    ]

    return (
        <View style={styles.container}>
            <TopbarHeader
                title="Pengaturan"
                goBack={() => navigation.goBack()}
            />
            <View style={styles.content}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Gap height={15} />
                    <SectionMenu data={menuList} navigation={navigation} />
                </ScrollView>
            </View>
        </View>
    )
}

export default Setting

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    content: {
        paddingHorizontal: 15,
        flex: 1,
        marginBottom: -50
    }
})
