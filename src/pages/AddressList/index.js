import React, { useEffect, useRef, useState } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import {
    AddressCardList,
    ButtonOpacity,
    ConfirmationDialog,
    Gap,
    IconPlus,
    TopbarHeader
} from '../../components'
import {
    DeleteShippingAddressAction,
    EditShippingAddressAction,
    ShippingAddressAction,
    ShippingAddressDefaultAction
} from '../../redux/actions/v2'
import { colors, showSuccess } from '../../utils'

const AddressList = ({ navigation, route }) =>
{
    const dispatch = useDispatch()
    const { data: addresses } = useSelector(state => state.ShippingAddressReducer)
    const { data: defaultAddress } = useSelector(state => state.ShippingAddressDefaultReducer)
    const isFocused = useIsFocused()
    const confirmDialog = useRef()
    const prevPage = route.params?.fromPage

    const [ changeDefaultForm, setChangeDefaultForm ] = useState(null)
    const [ deleteForm, setDeleteForm ] = useState({ id: '', name: '' })
    const [ isUpdated, setIsUpdated ] = useState(false)

    const showDeleteConfirmation = (id, name) =>
    {
        confirmDialog.current.show()
        setDeleteForm({ id, name })
    }

    const hideDeleteConfirmation = () =>
    {
        confirmDialog.current.hide()
        setDeleteForm({ id: '', name: '' })
    }

    const changeDefaultHandler = () =>
    {
        prevPage === 'Shipment' ?
            navigation.navigate('Shipment', {changeDefaultForm})
        :
            dispatch(EditShippingAddressAction(changeDefaultForm, navigation, {
                success: () =>
                {
                    showSuccess('Alamat utama berhasil diubah.')
                    setIsUpdated(!isUpdated)
                    setChangeDefaultForm(null)
                },
                failed: () => showError('Gagal mengubah alamat utama.')
            }))
    }

    const changeAddressShipment = () => 
    {
        console.log('ChangeDataShipment',data)
    }

    const deleteHandler = () =>
    {
        confirmDialog.current.hide()
        
        dispatch(DeleteShippingAddressAction(deleteForm.id, {
            success: () =>
            {
                showSuccess('Berhasil menghapus data alamat.')
                dispatch(ShippingAddressAction())
            },
            failed: () => showError('Gagal menghapus data alamat.')
        }))
    }

    useEffect(() =>
    {
        dispatch(ShippingAddressAction())
        dispatch(ShippingAddressDefaultAction())
    }, [isFocused, isUpdated])
    return (
        <View style={styles.container}>
            <TopbarHeader
                title="Daftar Alamat"
                goBack={() => navigation.goBack()}
            />
            <View style={styles.content}>
                <ScrollView
                    style={styles.scrollView}
                    showsVerticalScrollIndicator={false}>
                    <Gap height={15} />

                    <AddressCardList
                        defaultAddressId={defaultAddress[0]?.id}
                        data={addresses}
                        onPress={value =>
                        {
                            if(!prevPage === 'Shipment') {
                                if(value.id === defaultAddress[0]?.id) return setChangeDefaultForm(null)
                            }
                            return setChangeDefaultForm({
                                id: value.id,
                                type: value.type,
                                name: value.name,
                                phone: value.phone_number,
                                province_id: value.province_id,
                                city_id: value.city_id,
                                subdistrict_id: value.subdistrict_id,
                                address: value.address,
                                main_address: 'true'
                            })
                        }}
                        renderItems={address => (
                            <AddressCardList.Item
                                addressType={address.type}
                                isMain={address.default === 'true'}
                                recipient={address.name}
                                phone={address.phone_number}
                                addressDetail={address.address}
                                editOnPress={() => navigation.navigate('EditAddress', { address })}
                                deleteOnPress={() => showDeleteConfirmation(address.id, address.name)}
                            />
                        )}
                    />
                    <Gap height={50} />
                </ScrollView>
            </View>
            <View style={styles.buttonWrapper}>
                <TouchableOpacity
                    style={styles.addAddress}
                    onPress={() => navigation.navigate('CreateNewAddress')}>
                    <IconPlus color={colors.white} />
                </TouchableOpacity>
                <ButtonOpacity
                    title={
                        prevPage === 'Shipment'
                            ? 'Pilih Alamat'
                            : 'Set Alamat Utama'
                    }
                    onPress={changeDefaultHandler}
                    disable={changeDefaultForm === null}
                />
            </View>
            <ConfirmationDialog
                ref={confirmDialog}
                title={'Hapus Alamat?'}
                text={`Apa Anda yakin ingin menghapus data alamat ${deleteForm.name}?`}
                onCancel={hideDeleteConfirmation}
                onSubmit={deleteHandler}
            />
        </View>
    )
}

export default AddressList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    content: { flex: 1 },
    scrollView: { paddingHorizontal: 15 },
    buttonWrapper: {
        padding: 15,
        backgroundColor: colors.white
    },
    addAddress: {
        width: 45,
        height: 45,
        borderRadius: 45 / 2,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: -55,
        right: 15
    }
})
