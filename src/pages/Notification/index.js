import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Gap, TopbarHeader, Text } from '../../components'
import { colors } from '../../utils'

const Notification = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <TopbarHeader
                title="Notifikasi"
                goBack={() => navigation.goBack()}
            />
            <View style={styles.content}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Gap height={10} />
                    <Text>Notifikasi</Text>
                    <Gap height={75} />
                </ScrollView>
            </View>
        </View>
    )
}

export default Notification

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
