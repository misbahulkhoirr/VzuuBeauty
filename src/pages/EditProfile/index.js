import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { colors, showError, showSuccess } from '../../utils'
import { profileAction, updateProfileAction } from '../../redux/actions/v2'
import { ButtonOpacity, Gap, Input, TopbarHeader } from '../../components'
import { loading as loadingProfile } from '../../redux/actions/v2/account/updateProfileAction'

const EditProfile = ({ navigation }) => {
    const dispatch = useDispatch()
    const userData = useSelector(state => state.profileReducer.data)
    const validation = useSelector(
        state => state.updateProfileReducer.errorMessage.data
    )

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const form = {
        name,
        phone
    }

    const setDataUser = () => {
        setName(userData.name)
        setPhone(userData.phone_number)
    }

    const success = () => {
        navigation.navigate('Setting')
        showSuccess('Berhasil memperbarui data.')
    }

    const failed = () => {
        navigation.navigate('Setting')
        showError('Gagal memperbarui data.')
    }

    const updateHandler = () => {
        dispatch(updateProfileAction(form, { success, failed }))
    }

    useEffect(() => {
        dispatch(profileAction())
        setDataUser()
        dispatch(loadingProfile())
    }, [])
    console.log(validation, 'validation')
    return (
        <View style={styles.container}>
            <TopbarHeader
                title="Perbarui Data Diri"
                goBack={() => navigation.goBack()}
            />
            <View style={styles.content}>
                <ScrollView
                    style={styles.scrollView}
                    showsVerticalScrollIndicator={false}>
                    <Gap height={15} />
                    <Input
                        label="Nama"
                        placeholder="Masukkan nama"
                        defaultValue={userData.name}
                        onChangeText={value => setName(value)}
                        errorMessage={
                            validation &&
                            validation.errors.name &&
                            validation.errors.name.msg &&
                            validation.errors.name.msg.id
                        }
                    />
                    <Gap height={15} />
                    <Input
                        label="Nomor Ponsel"
                        placeholder="Contoh: 81234567891"
                        defaultValue={
                            userData.phone_number
                                ? '' + userData.phone_number
                                : ''
                        }
                        onChangeText={value => setPhone(value)}
                        keyboardType={'numeric'}
                        errorMessage={
                            validation &&
                            validation.errors.phone &&
                            validation.errors.phone.msg &&
                            validation.errors.phone.msg.id
                        }
                    />
                    <Gap height={15} />

                    <ButtonOpacity title="Simpan" onPress={updateHandler} />
                    <Gap height={50} />
                </ScrollView>
            </View>
        </View>
    )
}

export default EditProfile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    content: { flex: 1 },
    scrollView: { paddingHorizontal: 45 }
})
