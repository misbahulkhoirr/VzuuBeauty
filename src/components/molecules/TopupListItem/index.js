import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Gap, IconMoney, ButtonOpacity } from '../../../components'
import { colors, fonts, truncate } from '../../../utils'
import CurrencyFormat from 'react-currency-format'
import moment from 'moment'

const TopupListItem = ({ data, BottomSheet, isiUlang }) => {
    if (BottomSheet === true) {
        return (
            <>
                <View
                    style={styles.badge(data && data.status_name, BottomSheet)}>
                    <Text style={styles.textBadge(data && data.status_name)}>
                        {data && data.status_name}
                    </Text>
                </View>
                <Gap height={20} />
                <View style={styles.wrapperSubContent}>
                    <View style={styles.wrapperHeaderSubContent}>
                        <Text style={styles.title}>
                            {data && data.description}
                        </Text>
                        <CurrencyFormat
                            value={data && data.amount}
                            displayType={'text'}
                            thousandSeparator={'.'}
                            decimalSeparator={','}
                            prefix={'Rp '}
                            renderText={value => (
                                <Text style={styles.nominal(data.description)}>
                                    {value}
                                </Text>
                            )}
                        />
                    </View>
                    <Gap height={10} />
                    <View style={styles.wrapperHeaderSubContent}>
                        <Text style={styles.timer}>
                            {moment(data && data.created_at).format(
                                'DD MMMM YYYY, h:mm'
                            )}
                        </Text>
                    </View>
                </View>
                {data && data.status_name === 'Pending' ? (
                    <View>
                        <Gap height={20} />
                        <ButtonOpacity
                            title="Isi Ulang"
                            onPress={() => isiUlang(data.invoice_url)}
                        />
                    </View>
                ) : null}
            </>
        )
    }
    return (
        <View style={styles.wrapperContent}>
            <Gap height={10} />
            <View style={styles.wrapperCard}>
                <View style={styles.wrapperIcon}>
                    <IconMoney filled />
                </View>
                <View style={styles.wrapperSubContent}>
                    <View style={styles.wrapperHeaderSubContent}>
                        <Text style={styles.title}>
                            {truncate(data.description, 16)}
                        </Text>
                        <CurrencyFormat
                            value={data.amount}
                            displayType={'text'}
                            thousandSeparator={'.'}
                            decimalSeparator={','}
                            prefix={'Rp '}
                            renderText={value => (
                                <Text style={styles.nominal(data.description)}>
                                    {value}
                                </Text>
                            )}
                        />
                    </View>
                    <Gap height={10} />
                    <View style={styles.wrapperHeaderSubContent}>
                        <View style={styles.badge(data.status_name)}>
                            <Text style={styles.textBadge(data.status_name)}>
                                {data.status_name}
                            </Text>
                        </View>
                        <Text style={styles.timer}>
                            {moment(data.created_at).format(
                                'DD MMMM YYYY, h:mm'
                            )}{' '}
                            WIB
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default TopupListItem

const styles = StyleSheet.create({
    badge: (status, BottomSheet) => ({
        width: BottomSheet === true ? 55 : null,
        padding: 4,
        borderRadius: 5,
        backgroundColor:
            status === 'Success'
                ? '#4CAF50'
                : status === 'Pending'
                ? '#FFECB3'
                : status === 'Cancel'
                ? colors.error
                : colors.background
    }),
    textBadge: status => ({
        fontFamily: fonts.primary[500],
        fontSize: 10,
        color:
            status === 'Success'
                ? colors.white
                : status === 'Pending'
                ? '#FF7043'
                : status === 'Cancel'
                ? colors.white
                : colors.text.primary
    }),
    wrapperContent: {
        marginHorizontal: 20,
        marginBottom: 10
    },
    wrapperCard: {
        minHeight: 60,
        // width: "100%",
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 10,
        padding: 10,
        flexDirection: 'row'
    },
    wrapperIcon: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    wrapperSubContent: {
        flex: 4
    },
    wrapperHeaderSubContent: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        fontFamily: fonts.primary[400],
        fontSize: 14,
        color: colors.text.primary
    },
    desc: {
        fontFamily: fonts.primary[400],
        fontSize: 12,
        color: colors.text.primary
    },
    nominal: status => ({
        fontFamily: fonts.primary[400],
        fontSize: 12,
        color: status != 'TOPUP' ? colors.error : colors.text.primary
    }),
    timer: {
        fontFamily: fonts.primary[400],
        fontSize: 12,
        textAlign: 'right',
        color: colors.text.primary
    }
})
