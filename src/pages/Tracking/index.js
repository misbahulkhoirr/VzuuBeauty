import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { CardInfo, Gap, TopbarHeader, Text } from '../../components'
import { colors, fonts } from '../../utils'

const Tracking = ({ navigation }) =>
{
    const dataTracking = useSelector(state => state.cekResiReducer.data)

    return (
        <View style={styles.container}>
            <TopbarHeader
                title="Lacak Pesanan"
                goBack={() => navigation.goBack()}
            />

            <View style={styles.content}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Gap height={15} />
                    <CardInfo
                        title={'Nomor Resi'}
                        desc={
                            dataTracking.summary &&
                            dataTracking.summary.waybill_number
                        }
                        gridData={[
                            {
                                label: 'Tanggal Pengiriman',
                                textData: moment(
                                    dataTracking.summary &&
                                        dataTracking.summary.waybill_date
                                ).format('DD MMMM YYYY')
                            },
                            {
                                label: 'Kode Layanan Pengiriman',
                                textData:
                                    (dataTracking.summary &&
                                        dataTracking.summary.courier_name) +
                                    ' - ' +
                                    (dataTracking.summary &&
                                        dataTracking.summary.service_code)
                            },
                            {
                                label: 'Penjual',
                                textData:
                                    dataTracking.summary &&
                                    dataTracking.summary.shipper_name
                            },
                            {
                                label: 'Pembeli',
                                textData:
                                    dataTracking.summary &&
                                    dataTracking.summary.receiver_name
                            }
                        ]}
                    />
                    <Gap height={15} />

                    <View style={styles.shippingStatusCard}>
                        <Text style={styles.statusText}>Status</Text>
                        <Text style={styles.descText}>
                            {dataTracking?.delivery_status?.status}
                        </Text>
                        <Gap height={10} />

                        {dataTracking &&
                            dataTracking.manifest &&
                            dataTracking.manifest.map((item, index) => (
                                <View
                                    style={styles.shippingItemWrapper}
                                    key={index}>
                                    <View style={styles.bullet} />
                                    <View style={styles.shippingItem}>
                                        <Text style={styles.shippingLabel}>
                                            {moment(item.manifest_date).format(
                                                'DD MMMM YYYY'
                                            )}{' '}
                                            - {item.manifest_time}
                                        </Text>
                                        <Text style={styles.shippingText}>
                                            {item.manifest_description}
                                        </Text>
                                    </View>
                                </View>
                            ))}
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

export default Tracking

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.background
    },
    content: { paddingHorizontal: 15, flex: 1 },
    setShipmentWrapper: {
        backgroundColor: colors.white,
        borderRadius: 8,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: colors.white
    },
    setShipmentTouchable: {
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    setShipmentTextWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    setShipmentText: {
        color: colors.text.label,
        fontFamily: fonts.primary[500],
        fontSize: 12
    },
    setShipmentTextLabel: {
        color: colors.text.label,
        fontFamily: fonts.primary[400],
        fontSize: 12
    },
    setShipmentImage: {
        width: 30,
        height: 30,
        marginRight: 15
    },
    setShipmentCourierImage: {
        width: 80,
        height: 20,
        marginRight: 15
    },
    borderTop: {
        borderTopWidth: 1,
        borderTopColor: colors.border
    },
    error: animation => ({
        borderColor: colors.error,
        transform: [{ translateX: animation }]
    }),
    shippingStatusCard: {
        backgroundColor: colors.white,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8
    },
    shippingItemWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10
    },
    bullet: {
        width: 10,
        height: 10,
        borderRadius: 10 / 2,
        backgroundColor: colors.primary,
        position: 'absolute',
        marginLeft: 11
    },
    shippingItem: {
        borderLeftWidth: 1,
        borderLeftColor: colors.primary,
        marginLeft: 5,
        paddingLeft: 20,
        paddingVertical: 8
    },
    shippingLabel: {
        color: colors.primary,
        fontFamily: fonts.primary[400],
        fontWeight: '400',
        fontSize: 12,
        marginBottom: 5
    },
    shippingText: {
        color: '#999999',
        fontFamily: fonts.primary[400],
        fontSize: 12
    },
    statusText: { fontFamily: fonts.primary[400] },
    descText: {
        fontFamily: fonts.primary[400],
        fontSize: 12
    }
})
