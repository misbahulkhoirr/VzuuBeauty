import React, { useEffect, useState } from 'react'
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Gap, IconMoney, SectionMenu, Text, Wallet } from '../../components'
import { DefaultAvatar } from '../../assets'
import { colors, fonts } from '../../utils'
import { profileAction, logoutAction } from '../../redux/actions/v2'

const ProfileAccount = ({ navigation }) => {
    const menuListGeneral = [
        {
            id: 1,
            icon: 'setting',
            label: 'Pengaturan',
            onPress: () => navigation.navigate('Setting')
        },
        {
            id: 2,
            icon: 'love',
            label: 'Daftar Keinginan',
            onPress: () => navigation.navigate('Wishlist')
        },
        {
            id: 3,
            icon: 'history',
            label: 'Riwayat Pesanan',
            onPress: () => navigation.navigate('Transaksi')
        },
        {
            id: 4,
            icon: 'money',
            label: 'Saldo',
            onPress: () => navigation.navigate('TopupList')
        },
        {
            id: 5,
            icon: 'coin',
            label: 'Loyalty Point',
            onPress: () => navigation.navigate('PointList')
        }
    ]

    const menuListPersonal = [
        {
            id: 1,
            icon: 'help-circle',
            label: 'FAQ',
            onPress: () => alert('Ok')
        },
        {
            id: 2,
            icon: 'help-buoy',
            label: 'Bantuan',
            onPress: () => alert('Ok')
        }
    ]

    const menuListOther = [
        {
            id: 1,
            icon: 'logout',
            label: 'Keluar',
            onPress: () => onLogout()
        }
    ]

    const dispatch = useDispatch()
    // const userData = useSelector(state => state.userReducer.data)
    const userData = useSelector(state => state.profileReducer.data)

    const onLogout = async () => {
        await dispatch(logoutAction({ navigation }))
        await GoogleSignin.revokeAccess()
        await GoogleSignin.signOut()
    }

    useEffect(() => {
        dispatch(profileAction())
    }, [])

    return (
        <>
            <View style={styles.container}>
                <View style={styles.content}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Gap height={15} />
                        <View style={styles.profileHeader}>
                            <Image
                                source={DefaultAvatar}
                                style={styles.image}
                            />
                            <Gap width={15} />
                            <View>
                                <Text style={styles.profileName}>
                                    {userData.name}
                                </Text>
                                <Text style={styles.profileEmail}>
                                    {userData.email}
                                </Text>
                            </View>
                        </View>

                        <Gap height={25} />

                        {/* <Wallet 
                        onPress={() => navigation.navigate('Topup')} 
                        saldoWallet={userData.wallets} 
                        saldoPoints={userData.points} 
                    /> */}

                        {/* <View style={styles.contentMoney}>
                            <Pressable
                                style={styles.wrapperIconMoney}
                                onPress={() => navigation.navigate('Topup')}>
                                <IconMoney size={40} color={'#2C3E50'} />
                            </Pressable>
                            <View style={styles.wrapperMoney}>
                                <View style={styles.wrapperWallet}>
                                    <Text style={styles.titleMoney}>
                                        Total Wallet
                                    </Text>
                                    <Gap height={5} />
                                    <Text style={styles.subtitleMoney}>
                                        {`Rp.` + Convert(userData.wallets + '')}
                                    </Text>
                                </View>
                                <View style={styles.wrapperPoint}>
                                    <Text style={styles.titleMoney}>
                                        Total Points
                                    </Text>
                                    <Gap height={5} />
                                    <Text style={styles.subtitleMoney}>
                                        {Convert(userData.points + '')}
                                    </Text>
                                </View>
                            </View>
                        </View> */}

                        <Gap height={25} />
                        <SectionMenu
                            title="Umum"
                            data={menuListGeneral}
                            navigation={navigation}
                        />
                        <Gap height={25} />

                        {/* <SectionMenu
                        title="Personal"
                        data={menuListPersonal}
                        navigation={navigation}
                    />
                    <Gap height={35} /> */}

                        <SectionMenu
                            data={menuListOther}
                            navigation={navigation}
                        />
                        <Gap height={75} />
                    </ScrollView>
                </View>
            </View>
        </>
    )
}

export default ProfileAccount

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    content: {
        paddingHorizontal: 15,
        flex: 1,
        marginBottom: -50
    },
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#F3E1E1',
        shadowColor: colors.primary,
        borderRadius: 10,
        shadowOffset: { width: 0, height: 11 },
        shadowOpacity: 0.55,
        shadowRadius: 14.78,
        elevation: 22
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2
    },
    profileName: {
        color: '#2C3E50',
        fontFamily: fonts.primary[500],
        fontSize: 16,
        marginBottom: 2
    },
    profileEmail: {
        color: '#3b3c3d',
        fontFamily: fonts.primary[400],
        fontSize: 12
    }
})
