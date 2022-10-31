import React, { useEffect } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {
    ButtonOpacity,
    Gap,
    Input,
    Select,
    TextArea,
    TopbarHeader
} from '../../components'
import { colors, showSuccess, useForm } from '../../utils'
import { loading as loadingEditAddress } from '../../redux/actions/v2/account/EditShippingAddressAction'
import {
    cityAction,
    EditShippingAddressAction,
    provinceAction,
    subdistrictAction
} from '../../redux/actions/v2'

const EditAddress = ({ navigation, route }) => {
    const dispatch = useDispatch()
    const { errorMessage: error } = useSelector(
        state => state.EditShippingAddressReducer
    )
    const provinces = useSelector(state => state.provinceReducer_v2.data)
    const cities = useSelector(state => state.cityReducer_v2.data)
    const subDistricts = useSelector(state => state.subdistrictReducer_v2.data)

    const address = route.params.address

    const [form, setForm] = useForm({
        id: address.id,
        type: address.type,
        name: address.name,
        phone: address.phone_number,
        province_id: address.province_id,
        city_id: address.city_id,
        subdistrict_id: address.subdistrict_id,
        address: address.address
    })

    const pickData = (code, id) => {
        if (code === 'province') {
            setForm('province_id', id)
            dispatch(cityAction(id))
        }

        if (code === 'city') {
            setForm('city_id', id)
            dispatch(subdistrictAction(id))
        }

        if (code === 'subdistrict') {
            setForm('subdistrict_id', id)
        }
    }

    const goBack = () => {
        navigation.goBack()
    }

    const success = () => showSuccess('Pembaruan data alamat berhasil.')

    const editAddressHandler = () => {
        dispatch(EditShippingAddressAction(form, navigation, { success }))
    }

    useEffect(() => {
        dispatch(provinceAction())
        dispatch(cityAction(address.province_id))
        dispatch(subdistrictAction(address.city_id))
        dispatch(loadingEditAddress())
    }, [])

    return (
        <View style={styles.container}>
            <TopbarHeader title="Sunting Alamat" goBack={goBack} />
            <View style={styles.content}>
                <ScrollView
                    style={styles.scrollView}
                    showsVerticalScrollIndicator={false}>
                    <Gap height={15} />

                    <Input
                        label="Tipe Alamat"
                        placeholder="Contoh: alamat rumah, kantor, dsb"
                        defaultValue={form.type}
                        onChangeText={value => setForm('type', value)}
                        errorMessage={
                            error.data &&
                            error.data.errors &&
                            error.data.errors.type &&
                            error.data.errors.type.msg &&
                            error.data.errors.type.msg.id
                        }
                    />
                    <Gap height={15} />

                    <Input
                        label="Nama Penerima"
                        placeholder="Masukkan nama penerima pesanan"
                        defaultValue={form.name}
                        onChangeText={value => setForm('name', value)}
                        errorMessage={
                            error.data &&
                            error.data.errors &&
                            error.data.errors.name &&
                            error.data.errors.name.msg &&
                            error.data.errors.name.msg.id
                        }
                    />
                    <Gap height={15} />

                    <Input
                        label="Nomor Ponsel / Telepon"
                        placeholder="Masukkan nomor ponsel / telepon aktif"
                        defaultValue={form.phone}
                        onChangeText={value => setForm('phone', value)}
                        keyboardType={'numeric'}
                        errorMessage={
                            error.data &&
                            error.data.errors &&
                            error.data.errors.phone &&
                            error.data.errors.phone.msg &&
                            error.data.errors.phone.msg.id
                        }
                    />
                    <Gap height={15} />

                    <Select
                        label="Provinsi"
                        placeholder="Pilih Provinsi"
                        data={provinces}
                        onChange={id => pickData('province', id)}
                        defaultValue={form.province_id}
                        renderItems={(province, index) => (
                            <Select.Item
                                label={province.name}
                                value={province.id}
                                key={index}
                            />
                        )}
                        errorMessage={
                            error.data &&
                            error.data.errors &&
                            error.data.errors.province_id &&
                            error.data.errors.province_id.msg &&
                            error.data.errors.province_id.msg.id
                        }
                    />
                    <Gap height={15} />

                    {form.province_id !== '' && (
                        <>
                            <Select
                                label="Kota"
                                placeholder="Pilih Kota"
                                data={cities}
                                onChange={id => pickData('city', id)}
                                defaultValue={form.city_id}
                                renderItems={(city, index) => (
                                    <Select.Item
                                        label={city.name}
                                        value={city.id}
                                        key={index}
                                    />
                                )}
                                errorMessage={
                                    error.data &&
                                    error.data.errors &&
                                    error.data.errors.city_id &&
                                    error.data.errors.city_id.msg &&
                                    error.data.errors.city_id.msg.id
                                }
                            />
                            <Gap height={15} />
                        </>
                    )}

                    {form.city_id !== '' && (
                        <>
                            <Select
                                label="Kecamatan"
                                placeholder="Pilih Kecamatan"
                                data={subDistricts}
                                onChange={id => pickData('subdistrict', id)}
                                defaultValue={form.subdistrict_id}
                                renderItems={(subdistrict, index) => (
                                    <Select.Item
                                        label={subdistrict.name}
                                        value={subdistrict.id}
                                        key={index}
                                    />
                                )}
                                errorMessage={
                                    error.data &&
                                    error.data.errors &&
                                    error.data.errors.subdistrict_id &&
                                    error.data.errors.subdistrict_id.msg &&
                                    error.data.errors.subdistrict_id.msg.id
                                }
                            />
                            <Gap height={15} />
                        </>
                    )}

                    <TextArea
                        label="Alamat Detail"
                        placeholder="Masukkan alamat detail (nama jalan, blok rumah, dan sebagainya.)"
                        defaultValue={form.address}
                        onChangeText={value => setForm('address', value)}
                        errorMessage={
                            error.data &&
                            error.data.errors &&
                            error.data.errors.address &&
                            error.data.errors.address.msg &&
                            error.data.errors.address.msg.id
                        }
                    />
                    <Gap height={35} />

                    <ButtonOpacity
                        title="Simpan"
                        onPress={editAddressHandler}
                    />
                    <Gap height={50} />
                </ScrollView>
            </View>
        </View>
    )
}

export default EditAddress

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    content: { flex: 1 },
    scrollView: { paddingHorizontal: 45 }
})
